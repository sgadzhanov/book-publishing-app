"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useCart } from "@/app/components/providers/CartProvider"
import { formatPrice, type DeliveryMode } from "@/lib/commerce"

type PurchaseActionsProps = {
  slug: string
  locale: string
  title: string
  authorName: string
  coverImageUrl?: string
  price?: number
  deliveryMode?: DeliveryMode
}

export default function PurchaseActions({
  slug,
  locale,
  title,
  authorName,
  coverImageUrl,
  price,
  deliveryMode = "physical",
}: PurchaseActionsProps) {
  const t = useTranslations("cart")
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!price) {
    return null
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={() => {
          addItem({
            slug,
            locale,
            title,
            authorName,
            coverImageUrl,
            price,
            quantity: 1,
            deliveryMode,
          })
          setAdded(true)
          window.setTimeout(() => setAdded(false), 2000)
        }}
        className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 cursor-pointer"
      >
        {added ? t("addedToCart") : t("addToCart")}
      </button>
      <div className="text-sm text-slate-500">
        {t("deliveryType", { type: deliveryMode === "digital" ? t("digital") : t("physical") })} · {formatPrice(price, locale)}
      </div>
    </div>
  )
}
