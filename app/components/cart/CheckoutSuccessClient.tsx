"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useCart } from "@/app/components/providers/CartProvider"

export default function CheckoutSuccessClient() {
  const t = useTranslations("cart")
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main className="mx-auto flex min-h-[60vh] w-4/5 max-w-3xl flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900">{t("successTitle")}</h1>
      <p className="mt-4 max-w-xl text-slate-500">{t("successDescription")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/orders"
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          {t("viewOrders")}
        </Link>
        <Link
          href="/books"
          className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          {t("continueShopping")}
        </Link>
      </div>
    </main>
  )
}
