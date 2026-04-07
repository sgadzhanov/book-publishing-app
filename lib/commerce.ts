export const CART_STORAGE_KEY = "book-publishing-cart"
export const CART_COOKIE_KEY = "book_publishing_cart"
export const ORDER_CURRENCY = "eur"

export type DeliveryMode = "physical" | "digital"

export type CartItem = {
  slug: string
  locale: string
  title: string
  authorName: string
  coverImageUrl?: string
  price: number
  quantity: number
  deliveryMode: DeliveryMode
}

export function toMinorUnits(amount: number) {
  return Math.round(amount * 100)
}

export function formatPrice(amount: number, locale = "en") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: ORDER_CURRENCY.toUpperCase(),
  }).format(amount)
}

export function getCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function isPhysicalDelivery(items: Pick<CartItem, "deliveryMode">[]) {
  return items.some((item) => item.deliveryMode === "physical")
}
