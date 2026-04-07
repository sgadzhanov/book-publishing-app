"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  CART_COOKIE_KEY,
  CART_STORAGE_KEY,
  type CartItem,
  getCartTotal,
} from "@/lib/commerce"

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isReady: boolean
  addItem: (item: CartItem) => void
  removeItem: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function persistCart(items: CartItem[]) {
  const serialized = JSON.stringify(items)
  window.localStorage.setItem(CART_STORAGE_KEY, serialized)
  document.cookie = `${CART_COOKIE_KEY}=${encodeURIComponent(serialized)}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`
}

function clearPersistedCart() {
  window.localStorage.removeItem(CART_STORAGE_KEY)
  document.cookie = `${CART_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        setItems(parsed)
      }
    } catch {
      clearPersistedCart()
    } finally {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (!isReady) return
    persistCart(items)
  }, [isReady, items])

  const addItem = useCallback((item: CartItem) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.slug === item.slug)
      if (!existing) return [...current, item]

      return current.map((entry) =>
        entry.slug === item.slug
          ? { ...entry, quantity: Math.min(entry.quantity + item.quantity, 99) }
          : entry
      )
    })
  }, [])

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug))
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.slug !== slug))
      return
    }

    setItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, quantity: Math.min(quantity, 99) } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    clearPersistedCart()
    setItems([])
  }, [])

  const value: CartContextValue = {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: getCartTotal(items),
    isReady,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }

  return context
}
