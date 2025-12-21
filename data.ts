import { BookType } from "./types";

export const trendingBooks: BookType[] = [
  {
    id: "book_001",
    title: "The Whispering Library",
    slug: "the-whispering-library",
    author: {
      name: "Amelia Rowan",
      slug: "amelia-rowan"
    },
    coverImage: "/books/the-whispering-library.jpg",
    labels: ["Mystery", "Literary Fiction", "Fantasy"],
    ageGroup: "Adults",
    badges: ["Trending", "Editor's Pick"],
    shortTagline: "A mysterious library where books remember their readers.",
    publishedYear: 2024,
    isFeatured: true,
    price: 10.99
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
    ageGroup: "Kids",
    labels: ["Children’s Books", "Fantasy", "Bedtime Stories"],
    badges: ["Bestseller"],
    shortTagline: "A gentle bedtime story about courage and kindness.",
    publishedYear: 2023,
    isFeatured: true,
    price: 9.99
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
    ageGroup: "Teens",
    labels: ["Science Fiction", "Time Travel", "Young Adult"],
    badges: ["New Release", "Trending"],
    shortTagline: "Time travel was never meant to be remembered.",
    publishedYear: 2024,
    isFeatured: true,
    price: 8.99
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
    ageGroup: "Adults",
    labels: ["Historical Fiction", "Romance", "Literary Fiction"],
    badges: ["Editor's Pick"],
    shortTagline: "A love story unfolding in the shadows of old Shanghai.",
    publishedYear: 2022,
    isFeatured: false,
    price: 12.99
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
    ageGroup: "Kids",
    labels: ["Non-Fiction", "Education", "STEM"],
    badges: ["Popular"],
    shortTagline: "Creative experiments for curious young minds.",
    publishedYear: 2021,
    isFeatured: false,
    price: 19.99
  }
];
