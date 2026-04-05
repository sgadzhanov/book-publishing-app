"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"

export default function SignInPage() {
  const t = useTranslations("auth")
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn("resend", { email, redirect: false, callbackUrl: "/" })
    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-fuchsia-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center w-fit mx-auto mb-6">
          <Image
            src="/images/fuschia-logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-xl"
            style={{ width: "auto", height: 80 }}
          />
        </Link>

        <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">
          {t("title")}
        </h1>
        <p className="text-slate-500 text-center text-sm mb-8">
          {t("subtitle")}
        </p>

        {/* Google OAuth */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-lg py-3 px-4 font-medium text-slate-700 hover:bg-slate-50 transition-colors mb-6 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          {t("continueWithGoogle")}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 uppercase tracking-wide">{t("or")}</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Magic link */}
        {sent ? (
          <div className="text-center text-sm text-slate-600 bg-fuchsia-50 rounded-lg p-4 border border-fuchsia-100">
            <p className="font-semibold text-slate-800 mb-1">{t("checkEmailTitle")}</p>
            <p>{t("checkEmail")}</p>
          </div>
        ) : (
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent transition-shadow"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFA273] hover:bg-orange-400 transition-colors py-3 px-8 font-bold rounded-lg shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer"
            >
              {loading ? t("sending") : t("sendMagicLink")}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
