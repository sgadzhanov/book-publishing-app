import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { book } from "./sanity/schemaTypes/book"
import { author } from "./sanity/schemaTypes/author"
import { post } from "@/sanity/schemaTypes/post"

export default defineConfig({
  name: "default",
  title: "Book Publisher Admin",
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  basePath: "/studio",

  plugins: [structureTool()],

  schema: {
    types: [book, author, post],
  },
})
