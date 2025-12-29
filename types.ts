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
