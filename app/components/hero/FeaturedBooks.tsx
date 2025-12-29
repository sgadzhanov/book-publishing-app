import { BookType } from "@/types"
import BookCard from "../BookCard"
import { sanityFetch } from "@/sanity/lib/utils"
import { allBooksQuery } from "@/sanity/lib/queries"


export default async function FeaturedBooks() {
  const relatedBooks = await sanityFetch<BookType[]>({ query: allBooksQuery })

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 lg:gap-4">
      {relatedBooks.map((book: BookType) => (
        <BookCard key={book.shortTagline} book={{ ...book }} />
      ))}
    </ul>
  )
}

type BookItemProps = {
  id: string
  title: string
  slug: string
  author: string
  coverImage: string
}
