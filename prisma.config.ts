import path from "node:path"
import { defineConfig } from "prisma/config"
import { config as loadEnv } from "dotenv"

// Prisma CLI reads .env by default; load .env.local for local development
loadEnv({ path: path.join(process.cwd(), ".env.local") })

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    // Use the direct (unpooled) connection for migrations — not the pooler
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL,
  },
})
