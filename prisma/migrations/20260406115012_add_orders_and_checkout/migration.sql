-- CreateEnum
CREATE TYPE "DeliveryMode" AS ENUM ('PHYSICAL', 'DIGITAL');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'FULFILLED', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('NOT_REQUIRED', 'PENDING', 'PROCESSING', 'FULFILLED');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "customerName" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "fulfillmentStatus" "FulfillmentStatus" NOT NULL DEFAULT 'PENDING',
    "deliveryMode" "DeliveryMode" NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "subtotalAmount" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "stripeCheckoutSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "shippingAddress" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sanityBookId" TEXT,
    "bookSlug" TEXT NOT NULL,
    "bookLocale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorName" TEXT,
    "coverImageUrl" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitAmount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "deliveryMode" "DeliveryMode" NOT NULL,
    "downloadUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeCheckoutSessionId_key" ON "Order"("stripeCheckoutSessionId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
