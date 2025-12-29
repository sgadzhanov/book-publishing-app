import { client } from "./sanity.client"

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: { query: string; params?: Record<string, unknown> }) {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate: 60 }, // Changes appear withing 60 seconds
  })
}
