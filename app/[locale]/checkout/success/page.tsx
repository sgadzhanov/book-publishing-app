import { setRequestLocale } from "next-intl/server"
import CheckoutSuccessClient from "@/app/components/cart/CheckoutSuccessClient"

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <CheckoutSuccessClient />
}
