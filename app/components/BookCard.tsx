import { urlFor } from "@/sanity/lib/image"
import { BookType } from "@/types"
import { Link } from "@/i18n/navigation"
import Image from "next/image"

export default function BookCard({ book }: { book: BookType }) {
  const imgSrc = book.coverImage ? urlFor(book.coverImage).url() : "/placeholder.jpg"

  return (
    <li>
      <Link href={`/books/${book.slug}`} className="group block">
        <div className="relative aspect-3/4 rounded-md overflow-hidden shadow-md">
          <Image
            src={imgSrc}
            alt={book.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-3">
        <Link href={`/books/${book.slug}`} className="font-medium hover:underline">
          {book.title}
        </Link>
        {book.author?.slug ? (
          <div>
            <Link
              href={`/authors/${book.author.slug}`}
              className="text-sm text-slate-500 hover:underline"
            >
              {book.author.name}
            </Link>
          </div>
        ) : (
          <p className="text-sm text-slate-500">{book.author.name}</p>
        )}
      </div>
    </li>
  )
}
