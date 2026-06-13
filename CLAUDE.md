# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`ghodwa` is a bilingual (Arabic / English, plus German) marketing site + CMS for a vehicle/equipment brand. The public site shows brands → categories → models, plus news and services. An `/admin` dashboard manages all content. Built on **Next.js 16 (App Router, RSC)**, **React 19**, **Prisma 7** on PostgreSQL, **better-auth**, **Algolia** search, **Supabase Storage**, and **Resend** email.

The package manager is **Bun** (`bun.lock`). Use `bun install` / `bun run <script>`.

## Commands

```bash
bun run dev        # next dev (local development)
bun run build      # next build
bun run start      # next start (production server)
bun run lint       # next lint
bun run email:dev  # react-email preview server for ./emails

bunx biome check .       # lint + format check (Biome is the real linter/formatter, not eslint)
bunx biome check --write . # auto-fix + format

bunx prisma migrate dev --name <name>   # create + apply a migration (uses DIRECT_URL)
bunx prisma generate                    # regenerate client into ./generated/client
bunx prisma studio
```

There is **no test suite** in this repo.

### Linting / formatting nuance
- **Biome** ([biome.json](biome.json)) is the formatter and linter: single quotes, double quotes in JSX, 2-space indent, 100-col width. `bun run lint` runs `next lint`, but Biome is what enforces style — run `bunx biome check --write .` before committing. `generated/`, `.next/`, `node_modules/`, and CSS are excluded.

## Architecture

### Path alias
`@/*` maps to the repo root (see [tsconfig.json](tsconfig.json)). Imports look like `@/db.server`, `@/lib/generic.server`, `@/components/ui/button`.

### Middleware lives in `proxy.ts`, not `middleware.ts`
Next.js 16 renamed middleware; [proxy.ts](proxy.ts) exports `proxy()` and `config`. It does two things:
1. Guards `/admin/*` — calls `auth.api.getSession()` and redirects to `/login?callback=...` when there is no session.
2. Otherwise delegates to `next-intl`'s `handleI18nRouting`.

### Database access
- [db.server.ts](db.server.ts) exports the single `db` PrismaClient, built on the `@prisma/adapter-pg` driver adapter against `DATABASE_URL`.
- The Prisma client is generated to **[generated/client/](generated/client/)** (not `@prisma/client`). Import types from `@/generated/client/client`. This directory is git-ignored/Biome-ignored — run `bunx prisma generate` after pulling.
- Migrations use `DIRECT_URL` (non-pooled), runtime uses `DATABASE_URL` (pooled). See [prisma.config.ts](prisma.config.ts).
- Schema models are `snake_case`-mapped via `@@map` (e.g. `Brand` → `brand`). Content models carry **parallel `ar_*` / `en_*` columns** for every translatable field, plus a JSON `seo` blob and JSON image columns.

### Generic CRUD layer
[lib/generic.server.ts](lib/generic.server.ts) is the heart of admin writes: type-generic `getAll`/`createOne`/`createMany`/`updateOne`/`updateMany`/`deleteOne`/`deleteMany` that take a `PrismaModels` name (a string key into `db`) and return a `Result<T>` (`{ success, data?, error?, statusCode }`). Mutations automatically:
1. Re-feed the Algolia global index via `executeGlobalIndexFunction` / `deleteObjectGlobalIndexFunction`.
2. Call `revalidatePath('/', 'layout')`.

When adding a new content model, prefer routing writes through this layer so search-indexing and revalidation stay consistent. `getAll` is passed as an **unawaited promise** to client table components, which unwrap it with React `use()` inside `<Suspense>` (see any `admin/*/page.tsx` + `components/table.tsx`).

### Search (Algolia)
Two concerns, two key tiers:
- **Global site search** ([lib/search.server.ts](lib/search.server.ts), [lib/feed-search.ts](lib/feed-search.ts)) — indexes brands/categories/models/services/news into `ghodwa_globle_index_{ar,en}`. Reads use `ALGOLIA_SEARCH_API_KEY`; writes use `ALGOLIA_WRITE_API_KEY` (write client is `undefined` when that key is absent, so indexing is a no-op locally). `objectID`s are `<Type>-<id>` (e.g. `Brands-5`).
- **UI translations** ([lib/translations.server.ts](lib/translations.server.ts)) — stored in the `translations` Algolia index (not the DB), versioned by `language` + `isLatest`. Uses `ALGOLIA_API_KEY`.

### i18n
- `next-intl` with locales `['en','ar','de']`, default `en`, `localePrefix: 'always'` ([i18n/routing.ts](i18n/routing.ts)). Static UI strings load from [locales/{en,ar}/common.json](locales/) via [i18n/request.ts](i18n/request.ts).
- **Always import navigation primitives from [i18n/navigation.ts](i18n/navigation.ts)** (`Link`, `redirect`, `useRouter`, `usePathname`) — these are locale-aware. Don't use `next/link` / `next/navigation` for locale-prefixed routes.
- Per-record content is bilingual at the data layer (`ar_*`/`en_*`), so components pick the column by current locale rather than reading from message files.

### Storage & images
- File uploads go to **Supabase Storage** ([lib/uploadthing.server.ts](lib/uploadthing.server.ts)). Uploaded JSON file refs follow [schema/upload-schema.ts](schema/upload-schema.ts) (`{ path, size, type }`); resolve a public URL with `resolveUrl(path)` from [lib/utils.ts](lib/utils.ts).
- `next.config.ts` whitelists the Supabase, `utfs.io`, and `placehold.co` image hosts and allows SVG. Server actions accept up to 10mb bodies.

### Validation (Zod)
[schema/](schema/) holds all Zod schemas and the inferred TS types (`*Schema`). [schema/index.ts](schema/index.ts) defines the brand/category/model schemas with paired `create*`/`update*` variants (omitting `id`/timestamps). SEO ([schema/seo-schema.ts](schema/seo-schema.ts)) and file uploads have their own schemas. Forms use `react-hook-form` + `@hookform/resolvers` against these.

### Auth (better-auth)
- [auth.ts](auth.ts) — server config (Prisma adapter, email+password, `autoSignIn`). [auth-client.ts](auth-client.ts) — client (`signIn`, `signUp`, `useSession`).
- API handler at [app/api/auth/[...all]/route.ts](app/api/auth/%5B...all%5D/route.ts). There is a dev-only seed route at `app/api/auth/register/route.ts` that creates a hardcoded `admin@admin.com` user — do not ship/trigger it in production.

### Routing structure (App Router route groups)
- `app/(public)/[locale]/` — public bilingual site. `(inner)/` wraps secondary pages (alghodwa, contact-us, news, our-brands, services) with a shared breadcrumb/title layout. `page.tsx` is the home page.
- `app/(protected)/admin/` — CMS, guarded by `proxy.ts`. Sections: `collections/{brands,categories,models}`, `news`, `services`, `seo`, `translations`, `contact-us`, `configuration`.
- `app/(authentication)/login/` — login.
- Each admin section follows the same shape: `page.tsx` (Suspense + `getAll` promise) → `components/{table,columns,form,create,update}.tsx`, sometimes a `lib/actions.ts` for bespoke server actions (e.g. `updateServicesOrder` reordering).

### Server-side caching pattern
Read queries in [query.ts](query.ts) wrap Prisma calls in `unstable_cache` with `revalidate: 86400` and **tags** (e.g. `['brands', slug]`). Mutations invalidate via `revalidatePath('/', 'layout')`. Per-slug helpers (`getBrandBySlug`, etc.) return a closure-invoked cache so the slug becomes part of the cache key.

### Settings (key-value CMS config)
Site-wide config (CMS section) lives in the `Setting` table as a single JSON `value` per `section`, accessed through [lib/settings.server.ts](lib/settings.server.ts) and cached as `getSettings()` in [query.ts](query.ts).

### Client state
Lightweight UI state uses **Zustand** stores in [store/](store/) (e.g. breadcrumb, current inner page). Server state uses **TanStack Query** (provider in [providers/react-query-provider.tsx](providers/react-query-provider.tsx)).

### UI
- **shadcn/ui** (new-york style, neutral base, lucide icons) in [components/ui/](components/ui/); config in [components.json](components.json). `cn()` from `@/lib/utils` merges classes.
- Rich text editing uses a **TipTap**-based editor under [components/minimal-tiptap/](components/minimal-tiptap/). Data tables use `@tanstack/react-table` helpers in [components/data-table/](components/data-table/) + [lib/data-table.ts](lib/data-table.ts). Drag-reordering uses `@dnd-kit`.
- Transactional emails are React-Email components in [emails/](emails/) sent via Resend (see `submitForm` in [query.ts](query.ts)).

## External services (env)
Required for a full deploy (see [README.md](README.md)): **Algolia**, **Resend**, **Supabase**, **Vercel**. Key env vars: `DATABASE_URL`, `DIRECT_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_API_KEY` / `ALGOLIA_WRITE_API_KEY` / `ALGOLIA_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_SECRET_KEY` / `NEXT_PUBLIC_SUPABASE_BUCKET`, `RESEND_API_KEY` / `FROMEMAIL` / `BCCEMAIL`.
