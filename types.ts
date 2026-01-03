import { PortableTextBlock } from "next-sanity"

export type BookType = {
  id: string
  title: string
  slug: string
  author: {
    name: string
    slug: string
  }
  coverImage: { _type: string, asset: { _ref: string } }
  labels: string[]
  ageGroup?: "Kids" | "Teens" | "Adults"
  badges?: string[]
  shortTagline: string
  publishedYear: number
  isFeatured: boolean
  price?: number
}

export type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  categories?: {
    title: string
  }[]
  coverImage?: any
  content: PortableTextBlock[]
  author?: {
    name: string
    slug: string
  }
}

export type Author = {
  _id: string
  bio: string
  image: { _type: string, asset: { _ref: string, _type: string } },
  name: string
  slug: string
}