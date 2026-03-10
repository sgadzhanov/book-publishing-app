'use client'

import { useTranslations } from "next-intl"

type BookDetailsMetadataProps = {
  ageGroup?: string
  publishedYear?: number
  price?: number | undefined
}

export default function BookDetailsMetadata({
  ageGroup,
  publishedYear,
  price,
}: BookDetailsMetadataProps) {
  const t = useTranslations("books")

  return (
    <>
      {/* META & PRICE */}
      <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-3">
          {ageGroup && (
            <div className="flex items-center gap-3">
              <span className="text-2xl">👥</span>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">{t("ageGroup")}</p>
                <p className="text-slate-800 font-medium">{ageGroup}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">{t("published")}</p>
              <p className="text-slate-800 font-medium">{publishedYear}</p>
            </div>
          </div>
        </div>

        {price && (
          <div className="px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="block text-sm text-slate-500 uppercase font-semibold tracking-wide mb-1">{t("price")}</span>
            <p
              className="text-3xl font-bold text-slate-900"
            >
              {typeof price === "number" ? '€' + price.toFixed(2) : price}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
