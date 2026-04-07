import { BookType } from "@/types"
import BookCard from "../BookCard"
import { sanityFetch } from "@/sanity/lib/utils"
import { allBooksQuery } from "@/sanity/lib/queries"

type Props = {
  locale: string
}

export default async function FeaturedBooks({ locale }: Props) {
  const relatedBooks = await sanityFetch<BookType[]>({ query: allBooksQuery, params: { lang: locale } })

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 lg:gap-4">
      {relatedBooks.map((book: BookType) => (
        <BookCard key={book.shortTagline} book={{ ...book }} />
      ))}
    </ul>
  )
}
