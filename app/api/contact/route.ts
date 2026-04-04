import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const EMAIL_API_KEY = process.env.BOOK_PUBLISHING_APP_EMAIL_API_KEY?.trim()
const RECIPIENT_EMAIL = "stoqnh4@gmail.com"
const SENDER_EMAIL = "Contact Form <onboarding@resend.dev>"

function getResend() {
  if (!EMAIL_API_KEY) {
    return null
  }

  return new Resend(EMAIL_API_KEY)
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX = 3
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// In-memory rate limiter (per-process; works well for single-server and dev)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true

  entry.count++
  return false
}

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limit" }, { status: 429 })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }

  const { name, email, message, website } = body

  // Honeypot: bots fill this in, humans never see it
  if (website) {
    // Silently succeed so bots don't know they were detected
    return NextResponse.json({ success: true })
  }

  const errors: Record<string, string> = {}

  const trimmedName = name?.trim() ?? ""
  const trimmedEmail = email?.trim() ?? ""
  const trimmedMessage = message?.trim() ?? ""

  if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters."
  } else if (trimmedName.length > 100) {
    errors.name = "Name must be under 100 characters."
  }

  if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
    errors.email = "Please enter a valid email address."
  }

  if (trimmedMessage.length < 10) {
    errors.message = "Message must be at least 10 characters."
  } else if (trimmedMessage.length > 2000) {
    errors.message = "Message must be under 2000 characters."
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "validation", errors }, { status: 422 })
  }

  const resend = getResend()

  if (!resend) {
    console.error("Contact form email send skipped: BOOK_PUBLISHING_APP_EMAIL_API_KEY is missing.")
    return NextResponse.json(
      { error: "config_missing", errorMessage: "Server email configuration is missing." },
      { status: 500 }
    )
  }

  try {
    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: trimmedEmail,
      subject: `New contact message from ${trimmedName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #475569; width: 100px;">Name</td>
              <td style="padding: 10px 12px;">${escapeHtml(trimmedName)}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 12px; font-weight: 600; color: #475569;">Email</td>
              <td style="padding: 10px 12px;">
                <a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #4f46e5;">
                  ${escapeHtml(trimmedEmail)}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #475569; vertical-align: top;">Message</td>
              <td style="padding: 10px 12px; white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</td>
            </tr>
          </table>
        </div>
      `,
    })

    if (error) {
      console.error("Resend rejected contact form email.", {
        message: error.message,
        name: error.name,
        statusCode: error.statusCode,
      })

      return NextResponse.json(
        {
          error: "send_failed",
          errorMessage: error.message,
          errorName: error.name,
          statusCode: error.statusCode ?? null,
        },
        { status: 500 }
      )
    }

    console.info("Contact form email sent.", { emailId: data?.id ?? null })
  } catch (error) {
    const resendError = error as {
      message?: string
      name?: string
      statusCode?: number
    }

    console.error("Contact form email send threw.", {
      message: resendError.message,
      name: resendError.name,
      statusCode: resendError.statusCode,
    })

    return NextResponse.json(
      {
        error: "send_failed",
        errorMessage: resendError.message ?? "Unknown email send error.",
        errorName: resendError.name ?? "UnknownError",
        statusCode: resendError.statusCode ?? null,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
