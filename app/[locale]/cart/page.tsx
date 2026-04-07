import { setRequestLocale } from "next-intl/server"
import CartClient from "@/app/components/cart/CartClient"

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return <CartClient locale={locale} />
}
