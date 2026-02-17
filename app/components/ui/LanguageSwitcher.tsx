"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { useTransition } from "react"

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: string) => {
    if (locale === newLocale) return
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(loc)}
            disabled={isPending}
            className={`px-2 py-1 rounded transition-colors ${
              locale === loc
                ? "bg-violet-200 text-violet-800"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            } ${isPending ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
          >
            {loc.toUpperCase()}
          </button>
          {index < routing.locales.length - 1 && (
            <span className="text-slate-300 mx-1">|</span>
          )}
        </span>
      ))}
    </div>
  )
}
