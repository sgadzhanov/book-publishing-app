# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 16 App Router project. Route files live under `app/`, with locale-aware pages in `app/[locale]/` and API handlers in `app/api/`. Reusable UI is grouped in `app/components/`, shared helpers in `app/utils/` and `lib/`, localization config in `i18n/` and `messages/`, database schema and migrations in `prisma/`, and Sanity schemas and clients in `sanity/`. Static assets belong in `public/`.

## Build, Test, and Development Commands
- `npm run dev`: start the local development server at `http://localhost:3000`.
- `npm run build`: run `prisma generate` and create a production build.
- `npm run start`: serve the production build locally.
- `npm run lint`: run ESLint across the repository.

Run `npx prisma migrate dev` when schema changes require a local migration. Environment variables are loaded from `.env.local`.

## Coding Style & Naming Conventions
Use TypeScript with strict typing and the `@/*` import alias. Follow the existing code style: functional React components, PascalCase component filenames such as `BookCard.tsx`, camelCase utilities such as `readingTime.ts`, and route folders in lowercase. Most files use 2-space indentation and double quotes in TS/TSX; keep formatting consistent with the file you edit. Prefer small server-first route modules and isolate client code behind focused client components.

## Testing Guidelines
There is no dedicated test runner configured yet. Until one is added, treat `npm run lint` and `npm run build` as the required validation steps for every change. For API, auth, i18n, and Prisma updates, include a brief manual verification note in the PR describing what you exercised locally.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects such as `add authentication` and `add new user profile page`. Keep commit messages concise, lowercase, and focused on one change. Pull requests should include:
- a clear summary of behavior changes
- linked issue or task reference when available
- screenshots for UI updates
- notes about schema, env, or CMS changes
- confirmation that `npm run lint` and `npm run build` passed

## Security & Configuration Tips
Do not commit secrets from `.env.local`. Review changes to `auth.ts`, `middleware.ts`, `app/api/`, and `prisma/schema.prisma` carefully, since they affect authentication, routing, and persistence.

## End of line Sequence
Use only CRLF end of line sequence files.
