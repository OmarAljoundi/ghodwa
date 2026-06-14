# Security & Defence: separate namespace, typed brands, CSS-variable re-skin

## Context

Al-Ghodwa is adding a "Security & Defence" (SD) experience: a homepage promo block, a dedicated landing page, and a brand→category→model product flow that looks like the existing `/our-brands` flow but in a different palette (beige `#d1bfa7` + olive). SD brands live in the same `Brand` table as default brands.

## Decision

1. **Typed brands.** Add `Brand.type: BrandType { default, security_defence }` (`@default(default)`, existing rows backfilled to `default`). `Brand Type` is the single source of truth for which experience a brand belongs to.
2. **Separate URL namespace.** SD product pages live under `/security-and-defence/[brandSlug]/[categorySlug]/[modelSlug]`, parallel to `/our-brands/...`. SD context is implied by the URL prefix.
3. **Mutually exclusive by type.** `/our-brands` serves only `default` brands; `/security-and-defence` serves only `security_defence`. A brand resolved under the wrong prefix 404s. The guard is enforced at the **brand level only** ("trust the tree below"). Brand filtering happens at the query layer: `getBrands()` returns `default` only; a new `getSecurityDefenceBrands()` serves SD.
4. **Re-skin by CSS-variable scope, reuse not fork.** The site is themed via CSS custom properties (`--primary`, `--background`, `--card`, …). The SD palette is applied by overriding these variables in an SD-scoped layout segment; the existing `our-brands`/`model-details` components are **reused** (parameterized with a base path), not duplicated. Per-locale banner gradients follow the existing `sub-hero-section` pattern (CSS classes with a `:lang(ar)` variant, layered over a `ResponsiveImage`).

## Consequences

- Adding a future "experience" (e.g. another typed line) means a new `BrandType` value, a new namespace + scoped layout, and a new query filter — not a new component set.
- Because the guard is brand-level only, a hand-crafted URL mixing a default brand's category slug under the SD prefix is not independently re-validated; acceptable given slugs are reached via the guarded brand in normal navigation.
- Every surface that lists brands/models (home grid, menu, footer, sitemap, Algolia feed) must branch on `Brand Type` so SD never leaks under `/our-brands` and default never leaks under `/security-and-defence`.
