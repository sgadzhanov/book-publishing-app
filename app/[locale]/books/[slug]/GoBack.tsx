'use client'

import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

export default function GoBack() {
  const router = useRouter()
  const t = useTranslations("common")

  return (
    <p
      className='text-slate-500 w-fit cursor-default text-lg transition-all duration-100 hover:text-slate-700'
      onClick={() => router.back()}
    >
      {t("back")}
    </p>
  )
}
