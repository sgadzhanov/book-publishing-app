import Image from "next/image"
import ContactUs from "./components/ContactUs"
import FAQSection from "./components/FAQSection"
import FindYourBook from "./components/FindYourBook"
import Hero from "./components/Hero"
import PicksForEveryone from "./components/PicksForEveryone"
import ReadersTrustUs from "./components/ReadersTrustUs"
import TrustedBy from "./components/TrustedBy"
import Section from "./components/ui/Section"

const trendingBooks = [
  {
    id: "book_001",
    title: "The Whispering Library",
    slug: "the-whispering-library",
    author: {
      name: "Amelia Rowan",
      slug: "amelia-rowan"
    },
    coverImage: "/books/the-whispering-library.jpg",
    category: "Fiction",
    ageGroup: "Adults",
    badge: "Trending",
    shortTagline: "A mysterious library where books remember their readers.",
    publishedYear: 2024,
    isFeatured: true
  },
  {
    id: "book_002",
    title: "Fox Under the Moon",
    slug: "fox-under-the-moon",
    author: {
      name: "Leo Brightwood",
      slug: "leo-brightwood"
    },
    coverImage: "/books/fox-under-the-moon.jpg",
    category: "Kids",
    ageGroup: "Kids",
    badge: "Bestseller",
    shortTagline: "A gentle bedtime story about courage and kindness.",
    publishedYear: 2023,
    isFeatured: true
  },
  {
    id: "book_003",
    title: "Echoes of Tomorrow",
    slug: "echoes-of-tomorrow",
    author: {
      name: "Daniel Cross",
      slug: "daniel-cross"
    },
    coverImage: "/books/echoes-of-tomorrow.avif",
    category: "Science Fiction",
    ageGroup: "Teens",
    badge: "New Release",
    shortTagline: "Time travel was never meant to be remembered.",
    publishedYear: 2024,
    isFeatured: true
  },
  {
    id: "book_004",
    title: "Beneath the Paper Lanterns",
    slug: "beneath-the-paper-lanterns",
    author: {
      name: "Mei Lin Zhao",
      slug: "mei-lin-zhao"
    },
    coverImage: "/books/Beneath-the-Lanterns.webp",
    category: "Historical Fiction",
    ageGroup: "Adults",
    badge: "Editor's Pick",
    shortTagline: "A love story unfolding in the shadows of old Shanghai.",
    publishedYear: 2022,
    isFeatured: false
  },
  {
    id: "book_005",
    title: "The Little Inventor’s Handbook",
    slug: "the-little-inventors-handbook",
    author: {
      name: "Sophie Calder",
      slug: "sophie-calder"
    },
    coverImage: "/books/the-little-inventors-handbook.jpg",
    category: "Kids",
    ageGroup: "Kids",
    badge: "Popular",
    shortTagline: "Creative experiments for curious young minds.",
    publishedYear: 2021,
    isFeatured: false
  }
]


export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <PicksForEveryone />
      <FindYourBook />
      <ReadersTrustUs />
      <FAQSection />
      <ContactUs />

      <section className="w-4/5 mx-auto my-12">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Featured Books</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 lg:gap-4">
          {trendingBooks.map((book) => (
            <li
              key={book.id}
              className="flex flex-col items-center text-slate-700 rounded-xl py-6 gap-2 transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <div className="relative w-[280px] aspect-2/3 overflow-hidden rounded-md shadow-2xl transition-shadow duration-300
            group-hover:shadow-2xl">
                <Image
                  src={book.coverImage}
                  alt={book.slug}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="280px"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
              <div className="w-[280px]">
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-start text-sm w-2/3">{book.author.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Section>
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Our Space</h2>
        <p className="text-slate-700">
          Cozy reading nooks, quiet corners, and warm community vibes.
        </p>
      </Section>
    </>
  )
}
