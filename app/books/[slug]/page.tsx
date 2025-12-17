
import { trendingBooks } from '@/data'
import { BookType } from '@/types'
import Image from 'next/image'

function getBook(slug: string) {
  return trendingBooks.find(book => book.slug === slug)
}

export default async function BookDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book: BookType | undefined = getBook(slug)

  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <section className='w-3/4 mx-auto mt-12 mb-6'>
      <p className='text-slate-500 w-fit cursor-default text-lg transition-all duration-100 hover:text-slate-700'>BACK</p>
      <div className="flex flex-col md:flex-row gap-8 justify-center mx-auto h-[calc(100vh-206px)]">
        <div className="relative w-full md:w-[340px] aspect-2/3 overflow-hidden rounded-md shadow-2xl transition-shadow duration-300 group-hover:shadow-2xl">
          <Image
            src={book.coverImage}
            alt={slug}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            // width="310"
            // height="280"
            priority
          />
        </div>
        <div className='flex flex-col mx-auto'>
          {/* title, author_name, price, desc */}
          <div className='text-center'>
            <h2 className="text-2xl font-semibold text-slate-800">{book.title}</h2>
            <p className="text-slate-600">{book.author.name}</p>
          </div>
          <div>
            <div className='border-b border-amber-600 my-10' />
            <p>{book.shortTagline}</p>
            <p>€{book.price}</p>
          </div>
        <h1 className='text-neutral-600 text-4xl mt-10 '>Much more to come on this page 🤝 :-)</h1>
        </div>
      </div>
    </section>
  )
}
