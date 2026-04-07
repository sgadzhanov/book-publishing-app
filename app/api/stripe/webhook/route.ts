import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { getStripe } from "@/lib/stripe"
import { fulfillOrder } from "@/lib/orders"
import { FulfillmentStatus, OrderStatus } from "@prisma/client"

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set.")
  }
  return secret
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId
  if (!orderId) return

  if (session.payment_status !== "paid") {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        stripeCheckoutSessionId: session.id,
      },
    })
    return
  }

  await fulfillOrder(orderId, {
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    email: session.customer_details?.email,
    customerName: session.customer_details?.name,
    shippingAddress: session.collected_information?.shipping_details?.address ?? null,
  })
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId
  if (!orderId) return

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.EXPIRED,
      fulfillmentStatus: FulfillmentStatus.PENDING,
    },
  })
}

async function handleAsyncPaymentFailed(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId
  if (!orderId) return

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.FAILED,
      fulfillmentStatus: FulfillmentStatus.PENDING,
    },
  })
}

export async function POST(request: Request) {
  const stripe = getStripe()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 })
  }

  const payload = await request.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, getWebhookSecret())
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook verification failed."
    return NextResponse.json({ error: message }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object)
      break
    case "checkout.session.async_payment_succeeded":
      await handleCheckoutCompleted(event.data.object)
      break
    case "checkout.session.async_payment_failed":
      await handleAsyncPaymentFailed(event.data.object)
      break
    case "checkout.session.expired":
      await handleCheckoutExpired(event.data.object)
      break
    default:
      break
  }

  return NextResponse.json({ received: true })
}
