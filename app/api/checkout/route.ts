import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { getStripe } from "@/lib/stripe"
import { getBaseUrl } from "@/lib/site-url"
import {
  ORDER_CURRENCY,
  isPhysicalDelivery,
  toMinorUnits,
  type CartItem,
} from "@/lib/commerce"
import { sanityFetch } from "@/sanity/lib/utils"
import { booksBySlugsQuery } from "@/sanity/lib/queries"
import { BookType } from "@/types"
import { DeliveryMode, FulfillmentStatus } from "@prisma/client"
import { urlFor } from "@/sanity/lib/image"

type CheckoutBody = {
  locale?: string
  items?: CartItem[]
}

export async function POST(request: Request) {
  let body: CheckoutBody

  try {
    body = (await request.json()) as CheckoutBody
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const locale = body.locale
  const cartItems = body.items

  if (!locale || !Array.isArray(cartItems) || cartItems.length === 0) {
    return NextResponse.json({ error: "Cart items are required." }, { status: 400 })
  }

  const normalizedItems = cartItems
    .filter((item) => item.slug && item.quantity > 0)
    .map((item) => ({
      slug: item.slug,
      quantity: Math.min(Math.floor(item.quantity), 99),
    }))

  if (normalizedItems.length === 0) {
    return NextResponse.json({ error: "No valid cart items found." }, { status: 400 })
  }

  const books = await sanityFetch<BookType[]>({
    query: booksBySlugsQuery,
    params: {
      lang: locale,
      slugs: normalizedItems.map((item) => item.slug),
    },
  })

  const booksBySlug = new Map(books.map((book) => [book.slug, book]))
  const validatedItems = normalizedItems.map((item) => {
    const book = booksBySlug.get(item.slug)
    if (!book?.price) {
      return null
    }

    return {
      quantity: item.quantity,
      book,
    }
  })

  if (validatedItems.some((item) => item === null)) {
    return NextResponse.json({ error: "One or more books are unavailable for purchase." }, { status: 400 })
  }

  const session = await auth()
  const purchasedItems = validatedItems.filter(Boolean) as Array<{ quantity: number; book: BookType }>
  const subtotalAmount = purchasedItems.reduce(
    (sum, item) => sum + toMinorUnits(item.book.price ?? 0) * item.quantity,
    0
  )
  const hasPhysicalItem = isPhysicalDelivery(
    purchasedItems.map((item) => ({
      deliveryMode: item.book.deliveryMode === "digital" ? "digital" : "physical",
    }))
  )
  const deliveryMode = hasPhysicalItem ? DeliveryMode.PHYSICAL : DeliveryMode.DIGITAL

  const order = await prisma.order.create({
    data: {
      userId: session?.user?.id ?? null,
      email: session?.user?.email ?? "pending@example.com",
      customerName: session?.user?.name ?? null,
      locale,
      currency: ORDER_CURRENCY,
      subtotalAmount,
      totalAmount: subtotalAmount,
      deliveryMode,
      fulfillmentStatus:
        deliveryMode === DeliveryMode.DIGITAL
          ? FulfillmentStatus.PENDING
          : FulfillmentStatus.PENDING,
      items: {
        create: purchasedItems.map(({ quantity, book }) => ({
          sanityBookId: book.sanityId,
          bookSlug: book.slug,
          bookLocale: locale,
          title: book.title,
          authorName: book.author.name,
          coverImageUrl: book.coverImage ? urlFor(book.coverImage).width(300).url() : null,
          quantity,
          unitAmount: toMinorUnits(book.price ?? 0),
          currency: ORDER_CURRENCY,
          deliveryMode:
            book.deliveryMode === "digital" ? DeliveryMode.DIGITAL : DeliveryMode.PHYSICAL,
          downloadUrl: book.downloadUrl ?? null,
        })),
      },
    },
  })

  const stripe = getStripe()
  const baseUrl = getBaseUrl(request)

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${baseUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/${locale}/cart`,
    client_reference_id: session?.user?.id ?? undefined,
    customer_email: session?.user?.email ?? undefined,
    billing_address_collection: "auto",
    shipping_address_collection: hasPhysicalItem ? { allowed_countries: ["BG", "DE", "FR", "GB", "IT", "NL", "RO", "US"] } : undefined,
    phone_number_collection: hasPhysicalItem ? { enabled: true } : undefined,
    metadata: {
      orderId: order.id,
      locale,
    },
    line_items: purchasedItems.map(({ quantity, book }) => ({
      quantity,
      price_data: {
        currency: ORDER_CURRENCY,
        unit_amount: toMinorUnits(book.price ?? 0),
        product_data: {
          name: book.title,
          description: book.shortTagline ?? undefined,
          images: book.coverImage ? [urlFor(book.coverImage).width(600).url()] : undefined,
          metadata: {
            slug: book.slug,
            deliveryMode: book.deliveryMode === "digital" ? "digital" : "physical",
          },
        },
      },
    })),
  })

  await prisma.order.update({
    where: { id: order.id },
    data: {
      stripeCheckoutSessionId: checkoutSession.id,
    },
  })

  return NextResponse.json({
    checkoutUrl: checkoutSession.url,
    orderId: order.id,
  })
}
