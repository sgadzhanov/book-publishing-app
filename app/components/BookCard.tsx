import { urlFor } from "@/sanity/lib/image"
import { BookType } from "@/types"
import Image from "next/image"
import Link from "next/link"

export default function BookCard({ book }: { book: BookType }) {
  const imgSrc = book.coverImage ? urlFor(book.coverImage).url() : "/placeholder.jpg"
  return (
    <li key={book.id}>
      <Link href={`/books/${book.slug}`} className="group">
        <div className="relative aspect-3/4 rounded-md overflow-hidden shadow-md">
          <Image
            src={imgSrc}
            alt={book.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <p className="mt-3 font-medium">{book.title}</p>
        <p className="text-sm text-slate-500">{book.author.name}</p>
      </Link>
    </li>
  )
}
