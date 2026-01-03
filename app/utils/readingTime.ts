import { toPlainText } from "@portabletext/toolkit"

export function getReadingTime(blocks: any[]): number {
  const text = toPlainText(blocks)
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}
