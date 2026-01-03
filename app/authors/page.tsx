import { authorsQuery } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/utils"
import { Author } from "@/types";
import Link from "next/link";


export default async function AuthorsPage() {
  const authors = await sanityFetch<Author[]>({ query: authorsQuery })

  return (
    <main className="w-4/5 lg:w-3/4 mx-auto py-24">
      <h1 className="text-4xl font-semibold mb-12">
        Our Authors
      </h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {authors.map((author: Author) => (
          <li key={author.slug} className="bg-sky-100 p-4 rounded-lg">
            <Link
              href={`/authors/${author.slug}`}
              className="text-xl font-medium hover:underline"
            >
              {author.name}
            </Link>
            {author.bio && (
              <p className="text-slate-600 mt-2">{author.bio}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
