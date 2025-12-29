import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "q8xw9bau",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
})
