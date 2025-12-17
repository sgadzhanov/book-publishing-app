export type BookType = {
  id: string
  title: string
  slug: string
  author: {
    name: string
    slug: string
  }
  coverImage: string
  category: string
  badge?: string
  ageGroup?: string
  shortTagline: string
  publishedYear: number
  isFeatured: boolean
  price?: number
}