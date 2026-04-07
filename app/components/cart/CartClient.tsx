"use client"

import Image from "next/image"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useCart } from "@/app/components/providers/CartProvider"
import { formatPrice } from "@/lib/commerce"

export default function CartClient({ locale }: { locale: string }) {
  const t = useTranslations("cart")
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function startCheckout() {
    setIsCheckingOut(true)
    setError(null)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, items }),
      })

      const data = (await response.json()) as { checkoutUrl?: string; error?: string }
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? t("checkoutError"))
      }

      window.location.href = data.checkoutUrl
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : t("checkoutError"))
      setIsCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[55vh] w-4/5 max-w-3xl flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-4 text-slate-500">{t("empty")}</p>
        <Link
          href="/books"
          className="mt-8 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          {t("continueShopping")}
        </Link>
      </section>
    )
  }

  return (
    <main className="mx-auto grid w-4/5 max-w-6xl gap-10 py-14 lg:grid-cols-[1.65fr_0.9fr]">
      <section>
        <h1 className="text-4xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-3 text-slate-500">{t("subtitle")}</p>

        <div className="mt-8 space-y-4">
          {items.map((item, index) => (
            <article
              key={`${item.slug}-${index}`}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-neutral-50 p-4 shadow-sm sm:grid-cols-[96px_1fr_auto]"
            >
              <div className="relative h-28 overflow-hidden rounded-xl bg-neutral-100">
                {item.coverImageUrl ? (
                  <Image
                    src={item.coverImageUrl}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="text-sm text-slate-500">{item.authorName}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {t("deliveryType", { type: item.deliveryMode === "digital" ? t("digital") : t("physical") })}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <label className="text-sm text-slate-500" htmlFor={`qty-${item.slug}`}>
                    {t("quantity")}
                  </label>
                  <input
                    id={`qty-${item.slug}`}
                    type="number"
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.slug, Number(event.target.value))}
                    className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-3">
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-900">
                    {formatPrice(item.price * item.quantity, locale)}
                  </div>
                  <div className="text-sm text-slate-400">{formatPrice(item.price, locale)} each</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.slug)}
                  className="text-sm font-medium text-rose-600 transition-colors hover:text-rose-700 cursor-pointer"
                >
                  {t("remove")}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="xl:h-full rounded-2xl border border-slate-200 bg-neutral-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{t("summary")}</h2>
        <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
          <span>{t("subtotal")}</span>
          <span className="text-lg font-semibold text-slate-900">{formatPrice(subtotal, locale)}</span>
        </div>
        <p className="mt-3 text-sm text-slate-500">{t("shippingCalculated")}</p>
        {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
        <button
          type="button"
          onClick={startCheckout}
          disabled={isCheckingOut}
          className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isCheckingOut ? t("redirecting") : t("checkout")}
        </button>
        <Link
          href="/books"
          className="mt-4 block text-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          {t("continueShopping")}
        </Link>
      </aside>
    </main>
  )
}
