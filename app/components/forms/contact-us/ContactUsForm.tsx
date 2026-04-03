"use client"

import { useTranslations } from "next-intl"
import { useState, useRef, FormEvent, ChangeEvent } from "react"

type Status = "idle" | "submitting" | "success" | "error" | "rate_limit"

type FieldErrors = {
  name?: string
  email?: string
  message?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactUsForm() {
  const t = useTranslations("contactForm")
  const [status, setStatus] = useState<Status>("idle")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const formRef = useRef<HTMLFormElement>(null)

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = (formData.get("name") as string).trim()
    const email = (formData.get("email") as string).trim()
    const message = (formData.get("message") as string).trim()
    const website = formData.get("website") as string // honeypot

    const errors: FieldErrors = {}

    if (name.length < 2) errors.name = t("errorNameMin")
    else if (name.length > 100) errors.name = t("errorNameMax")

    if (!email || !isValidEmail(email)) errors.email = t("errorEmail")

    if (message.length < 10) errors.message = t("errorMessageMin")
    else if (message.length > 2000) errors.message = t("errorMessageMax")

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setStatus("submitting")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      })

      if (res.status === 429) {
        setStatus("rate_limit")
        return
      }

      if (!res.ok) {
        const data = await res.json()
        if (data.error === "validation" && data.errors) {
          setFieldErrors(data.errors)
          setStatus("idle")
          return
        }
        setStatus("error")
        return
      }

      setStatus("success")
      formRef.current?.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot — invisible to humans, bots fill it in */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex gap-4 max-w-xl justify-between">
        <InputField
          label={t("fullName")}
          type="text"
          name="name"
          id="name"
          placeholder={t("yourName")}
          error={fieldErrors.name}
          onChange={() => clearFieldError("name")}
        />
        <InputField
          label={t("emailAddress")}
          type="email"
          name="email"
          id="email"
          placeholder={t("emailPlaceholder")}
          error={fieldErrors.email}
          onChange={() => clearFieldError("email")}
        />
      </div>

      <div className="flex flex-col max-w-xl">
        <InputField
          label={t("message")}
          type="textarea"
          name="message"
          id="message"
          placeholder={t("messagePlaceholder")}
          error={fieldErrors.message}
          onChange={() => clearFieldError("message")}
        />
      </div>

      {status === "success" && (
        <p className="text-green-600 text-sm font-medium">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm">{t("errorGeneric")}</p>
      )}
      {status === "rate_limit" && (
        <p className="text-red-500 text-sm">{t("errorRateLimit")}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || status === "success"}
        className="w-full md:max-w-1/2 text-slate-50 bg-indigo-400 hover:bg-indigo-300 border border-violet-200 hover:shadow-xl cursor-pointer transition p-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? t("sending") : t("sendMessage")}
      </button>
    </form>
  )
}

type InputFieldProps = {
  label: string
  type: string
  id: string
  name: string
  placeholder: string
  error?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const baseInputStyles =
  "w-full px-4 py-3 rounded-md bg-linear-to-b from-slate-100 to-slate-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15),inset_0_-1px_1px_rgba(255,255,255,0.7)] placeholder:text-gray-400 text-gray-700 outline-none transition-colors"

function InputField({ label, type, id, name, placeholder, error, onChange }: InputFieldProps) {
  const borderClass = error
    ? "border-2 border-red-400 focus:border-red-400"
    : "border border-indigo-200 focus:border-indigo-400"

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-slate-500 uppercase text-sm mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          rows={5}
          onChange={onChange}
          className={`${baseInputStyles} ${borderClass} shadow-md`}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className={`${baseInputStyles} ${borderClass} shadow-md`}
        />
      )}
      <div className="min-h-[20px] mt-1">
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
