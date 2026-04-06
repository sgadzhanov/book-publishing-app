"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useTranslations, useLocale } from "next-intl"
import { useUploadThing } from "@/lib/uploadthing"
import { Camera, Pencil, Check, X, User, Mail, Shield, Calendar, Upload, Loader2 } from "lucide-react"

type ProfileUser = {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
  createdAt: string
}

type Props = {
  user: ProfileUser
  isGoogleUser: boolean
}

type SaveState = "idle" | "saving" | "success" | "error"

export default function ProfileClient({ user, isGoogleUser }: Props) {
  const t = useTranslations("profile")
  const { update: updateSession } = useSession()

  // ── Avatar state ──────────────────────────────────────────────────
  const [avatarUrl, setAvatarUrl] = useState(user.image)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Name editing state ────────────────────────────────────────────
  const [displayName, setDisplayName] = useState(user.name ?? "")
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(user.name ?? "")
  const [nameSaveState, setNameSaveState] = useState<SaveState>("idle")
  const [nameError, setNameError] = useState<string | null>(null)

  const { startUpload } = useUploadThing("avatarUploader", {
    onClientUploadComplete: async (res) => {
      const url = res[0]?.ufsUrl
      if (!url) return
      // Persist to DB
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: url }),
      })
      // Update session so NavBar avatar refreshes
      await updateSession({ image: url })
      setAvatarUrl(url)
      setUploading(false)
    },
    onUploadError: () => {
      setUploadError(t("avatarUploadError"))
      setUploading(false)
    },
  })

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      setUploadError(null)
      setUploading(true)
      await startUpload([file])
      // Reset input so the same file can be re-selected if needed
      e.target.value = ""
    },
    [startUpload]
  )

  const handleNameSave = async () => {
    const trimmed = nameInput.trim()
    if (trimmed.length < 2) {
      setNameError(t("nameMin"))
      return
    }
    if (trimmed.length > 100) {
      setNameError(t("nameMax"))
      return
    }
    setNameError(null)
    setNameSaveState("saving")
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      })
      if (!res.ok) throw new Error()
      await updateSession({ name: trimmed })
      setDisplayName(trimmed)
      setNameSaveState("success")
      setEditingName(false)
      setTimeout(() => setNameSaveState("idle"), 2000)
    } catch {
      setNameSaveState("error")
      setNameError(t("saveFailed"))
    }
  }

  const handleNameCancel = () => {
    setNameInput(displayName)
    setNameError(null)
    setEditingName(false)
    setNameSaveState("idle")
  }

  const roleLabel: Record<string, string> = {
    USER: t("roleUser"),
    EDITOR: t("roleEditor"),
    ADMIN: t("roleAdmin"),
  }

  const roleBadgeClass: Record<string, string> = {
    USER: "bg-stone-50 text-slate-600",
    EDITOR: "bg-indigo-100 text-indigo-700",
    ADMIN: "bg-orange-100 text-orange-700",
  }

  const locale = useLocale()
  const memberSince = new Date(user.createdAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-min bg-(--background) pb-24">
      {/* ── HERO BANNER ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-linear-to-r from-fuchsia-100 via-purple-50 to-orange-50 sm:h-48">
        {/* decorative blobs */}
        <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute -bottom-10 right-10 w-72 h-72 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute top-6 right-1/4 w-40 h-40 rounded-full bg-purple-200/20 blur-2xl" />
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto mt-6 max-w-3xl px-4 sm:-mt-32">

        {/* ── AVATAR + NAME HEADER CARD ──────────────────────────── */}
        <div className="mb-5 rounded-2xl border border-slate-100 bg-stone-50 p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">

            {/* Avatar upload zone */}
            <div className="relative mx-auto shrink-0 sm:mx-0">
              <div
                className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-full bg-stone-50 shadow-md ring-4 ring-white"
                onClick={() => !uploading && fileInputRef.current?.click()}
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName || t("avatar")}
                    width={112}
                    height={112}
                    sizes="112px"
                    className="h-full w-full rounded-full object-cover transition-opacity group-hover:opacity-80"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-orange-100 to-fuchsia-100 text-[#FFA273] transition-opacity group-hover:opacity-80">
                    <User size={44} strokeWidth={1.5} />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  {uploading ? (
                    <Loader2 size={24} className="text-white animate-spin" />
                  ) : (
                    <Camera size={24} className="text-white" />
                  )}
                </div>
              </div>

              {/* Upload trigger button */}
              <button
                onClick={() => !uploading && fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FFA273] hover:bg-orange-400 transition-colors flex items-center justify-center shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                aria-label={t("changePhoto")}
              >
                {uploading ? (
                  <Loader2 size={14} className="text-white animate-spin" />
                ) : (
                  <Upload size={14} className="text-white" />
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {/* Name + email summary */}
            <div className="flex-1 pb-1 text-center sm:text-left">
              <div className="mb-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Zilla Slab, serif" }}>
                  {displayName || t("unnamed")}
                </h1>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleBadgeClass[user.role] ?? "bg-stone-50 text-slate-600"
                    }`}
                >
                  {roleLabel[user.role] ?? user.role}
                </span>
              </div>
              <p className="text-sm text-slate-400">{user.email}</p>

              {/* Auth provider pill */}
              <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                {isGoogleUser ? (
                  <>
                    <GoogleIcon />
                    {t("signedInWithGoogle")}
                  </>
                ) : (
                  <>
                    <Mail size={12} />
                    {t("signedInWithMagicLink")}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Upload error */}
          {uploadError && (
            <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
              <X size={14} /> {uploadError}
            </p>
          )}

          {/* Upload hint */}
          {!uploadError && (
            <p className="mt-3 text-xs text-slate-400">
              {t("avatarHint")}
            </p>
          )}
        </div>

        {/* ── DETAILS CARDS GRID ─────────────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-2">

          {/* Display name card */}
          <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <User size={16} className="text-[#FFA273]" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">{t("displayName")}</h2>
            </div>

            {editingName ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value)
                    setNameError(null)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNameSave()
                    if (e.key === "Escape") handleNameCancel()
                  }}
                  autoFocus
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent transition-shadow"
                  placeholder={t("namePlaceholder")}
                />
                {nameError && <p className="text-xs text-red-500">{nameError}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handleNameSave}
                    disabled={nameSaveState === "saving"}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#FFA273] hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-semibold py-2 rounded-lg cursor-pointer"
                  >
                    {nameSaveState === "saving" ? (
                      <><Loader2 size={14} className="animate-spin" /> {t("saving")}</>
                    ) : (
                      <><Check size={14} /> {t("save")}</>
                    )}
                  </button>
                  <button
                    onClick={handleNameCancel}
                    className="flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-semibold py-2 px-3 rounded-lg cursor-pointer text-slate-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <p className="text-slate-800 font-medium">
                  {displayName || <span className="text-slate-400 italic">{t("notSet")}</span>}
                </p>
                {nameSaveState === "success" ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <Check size={13} /> {t("saved")}
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setNameInput(displayName)
                      setEditingName(true)
                    }}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#FFA273] transition-colors font-medium cursor-pointer"
                  >
                    <Pencil size={13} /> {t("edit")}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Email card */}
          <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-fuchsia-50 flex items-center justify-center">
                <Mail size={16} className="text-fuchsia-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">{t("email")}</h2>
            </div>
            <p className="text-slate-800 font-medium break-all">{user.email}</p>
            <p className="text-xs text-slate-400 mt-1.5">{t("emailNote")}</p>
          </div>

          {/* Photo card */}
          <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Camera size={16} className="text-purple-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">{t("profilePhoto")}</h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isGoogleUser ? t("photoNoteGoogle") : t("photoNoteMagicLink")}
            </p>
            <button
              onClick={() => !uploading && fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 border border-dashed border-slate-300 hover:border-[#FFA273] hover:bg-orange-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm font-medium py-2.5 rounded-xl cursor-pointer text-slate-600 hover:text-[#FFA273]"
            >
              {uploading ? (
                <><Loader2 size={15} className="animate-spin" /> {t("uploading")}</>
              ) : (
                <><Upload size={15} /> {t("uploadPhoto")}</>
              )}
            </button>
          </div>

          {/* Account info card */}
          <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Shield size={16} className="text-indigo-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-700">{t("accountInfo")}</h2>
            </div>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <dt className="text-slate-400 flex items-center gap-1.5">
                  <Calendar size={13} /> {t("memberSince")}
                </dt>
                <dd className="text-slate-700 font-medium">{memberSince}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-slate-400">{t("accountType")}</dt>
                <dd className="text-slate-700 font-medium">
                  {isGoogleUser ? "Google" : "Magic Link"}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-slate-400">{t("role")}</dt>
                <dd>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleBadgeClass[user.role] ?? "bg-stone-50 text-slate-600"
                      }`}
                  >
                    {roleLabel[user.role] ?? user.role}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  )
}

// Inline Google icon (SVG) — avoids an external image request
function GoogleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
