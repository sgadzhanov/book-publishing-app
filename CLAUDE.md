# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

Sanity Studio is embedded at `/studio` route.

## Architecture

This is a **Next.js 16** publishing house website with **Sanity CMS** backend and **next-intl** internationalization (English/Bulgarian).

### Key Structure

- `app/[locale]/` - Locale-prefixed pages (Next.js App Router)
- `app/components/` - React components (no separate components folder at root)
- `sanity/` - CMS configuration
  - `schemaTypes/` - Content models (book, author, post)
  - `lib/queries.ts` - GROQ queries for fetching content
  - `lib/sanity.client.ts` - Sanity client instance
- `i18n/` - Internationalization config
  - `routing.ts` - Locale configuration (en, bg)
  - `request.ts` - Server-side locale handling
- `messages/` - Translation JSON files (en.json, bg.json)
- `types.ts` - TypeScript types for content models

### Internationalization

- **UI translations**: Use `next-intl` with `useTranslations()` hook
- **Content translations**: Sanity documents include a `language` field; all queries filter by `language == $lang`
- Routes are always locale-prefixed (`/en/books`, `/bg/books`)

### Content Models (Sanity)

All three document types support document-level internationalization:
- **book**: title, slug, author (reference), coverImage, labels, ageGroup, badges, shortTagline, publishedYear, price, isFeatured
- **author**: name, slug, image, bio
- **post**: title, slug, excerpt, coverImage, author (reference), publishedAt, categories, content (Portable Text with pullQuote blocks)

### Data Fetching Pattern

Pages fetch data using the Sanity client with GROQ queries:
```typescript
import { client } from "@/sanity/lib/sanity.client"
import { someQuery } from "@/sanity/lib/queries"

const data = await client.fetch(someQuery, { lang: locale, ...params })
```

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

## End of line Sequence
Use only CRLF end of line sequence files.
