import { BookType } from "@/types"
import Image from "next/image"

import { trendingBooks } from '@/data'
import Link from "next/link"


export default function FeaturedBooks() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 lg:gap-4">
      {trendingBooks.map((book: BookType) => (
        <BookItem
          key={book.id}
          id={book.id}
          slug={book.slug}
          author={book.author.name}
          coverImage={book.coverImage}
          title={book.title}
        />
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

function BookItem({
  id,
  title,
  slug,
  author,
  coverImage,
}: BookItemProps) {
  return (
    <li
      key={id}
      className="flex flex-col items-center text-slate-700 py-6 gap-2 rounded-xl cursor-pointer transition-all duration-300 ease-out hover:bg-sky-100 hover:-translate-y-1"
    >
      <Link href={`/books/${slug}`}>
        <div className="relative w-[280px] aspect-2/3 overflow-hidden rounded-md shadow-2xl transition-shadow duration-300
            group-hover:shadow-2xl">
          <Image
            src={coverImage}
            alt={slug}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="280px"
            priority
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        </div>
        <div className="w-[280px]">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-start text-sm w-2/3">{author}</p>
        </div>
      </Link>
    </li>
  )
}
