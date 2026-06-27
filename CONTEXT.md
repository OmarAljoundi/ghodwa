# Ghodwa

Bilingual (AR/EN, plus DE) marketing site + CMS for Al-Ghodwa Group, a heavy-machinery and vehicle distributor. The public site presents brands → categories → models, plus news and services; an `/admin` dashboard manages all content.

## Language

**Brand**:
A vendor whose vehicles/equipment Al-Ghodwa distributes (e.g. Hidromek, ND Defense). Top of the product hierarchy. A DB table.
_Avoid_: vendor, make, manufacturer (in code/UI use "Brand").

**Category**:
A grouping of Models under a Brand (e.g. "Wheeled excavators"). A DB table.

**Model**:
A specific product under a Category (e.g. "HMK 140W"), with specifications, images, and a brochure. A DB table.
_Avoid_: product (UI says "Model").

**Brand Type** _(new)_:
A Prisma enum `BrandType { default, security_defence }` on **Brand** (field `type BrandType @default(default)`) distinguishing its product line. `default` = existing general-distribution behaviour; `security_defence` = brands shown in the Security & Defence experience. Migration backfills all existing brands to `default`. Admin gets a Type select on the brand create/update form.
_Avoid_: category (already taken), kind, segment.

**Security & Defence (SD)**:
A distinct branded experience (palette: beige `#d1bfa7` + olive) covering a homepage promo block, a dedicated landing page, and the brand→category→model flow re-skinned, scoped to **Brands** with **Brand Type** = `security_defence`.
_Avoid_: defense (project copy uses British "defence"), military.

**More section**:
The existing `home.moreSection` promo block in the CMS `Setting` JSON — a homepage block with wide image, title, subtitle, and a call-to-action. The new SD homepage block is structurally a clone of this.
_Avoid_: confusing with the `Service` content model.

**Setting**:
A single DB row per `section` (e.g. `CMS`) holding all CMS configuration as one JSON blob, validated by `settingSchema`. Edited under admin → Configuration.

## Relationships

- A **Brand** has one **Brand Type** and many **Categories**; a **Category** has many **Models**.
- The **Security & Defence** landing page lists **Brands** where **Brand Type** = `security_defence`.
- The homepage **Security and defence section** is a clone of the **More section**, stored in **Setting**.

## Routing

- The SD product flow lives under a **separate URL namespace** (e.g. `/security-and-defence/[brandSlug]/[categorySlug]/[modelSlug]`), parallel to `/our-brands/...`. SD context (and thus the beige/olive palette) is implied by the URL prefix, not by a query param or by `Brand Type` alone.
- **Namespaces are mutually exclusive by Brand Type.** `/our-brands` lists/serves only `default` brands; `/security-and-defence` lists/serves only `security_defence` brands. A brand slug resolved under the wrong prefix returns not-found. `Brand Type` is the single source of truth for namespace membership.
- **The namespace guard is enforced at the brand level only** ("trust the tree below"): each namespace's brand page 404s if the brand's Type doesn't match the prefix. Category/model pages are reached via the (guarded) brand in normal navigation and are not independently re-checked.
- **SD routes physically live under `app/(public)/[locale]/(inner)/security-and-defence/`**, reusing the shared inner shell (breadcrumb/title/container). An **SD layout segment** wraps them to apply the SD CSS-variable scope (beige/olive) and swap the hero band to the SD gradient. The hero title comes from i18n like other inner pages.
- **Filtering happens at the query layer.** `getBrands()` returns only `default` brands (so the home grid, `/our-brands`, menu, footer, sitemap auto-exclude SD); a new `getSecurityDefenceBrands()` serves SD surfaces.
- A **"Security & Defence"** top-nav item sits between "Our Brands" and "Services", rendered as a **mega-menu** (mirrors "Our Brands"): lists SD brands + their categories, with a "View all" CTA to the SD landing page. Its links target the `/security-and-defence/...` namespace.
- The footer **has a "Security and Defence" link column** sourced from `getSecurityDefenceBrands()`, alongside "Our Brands", "Services", and "Al Ghodwa". It renders only when SD brands exist (collapses cleanly otherwise). (Superseded the original ADR-0001 stance of "no SD content in footer.")

## Theming

- The site is themed via **CSS custom properties** (`--primary`, `--background`, `--card`, …) consumed through Tailwind semantic tokens (`bg-primary`, `bg-card`). The default palette is warm gold (`--primary: 37 83% 62%`).
- The **SD palette** (beige `#d1bfa7` background, olive `hsl(63 37% 34%)` primary) is applied by **overriding these CSS variables in an SD-scoped wrapper/layout** — the existing brand/model components are **reused**, not forked. Components are parameterized with a base path (`our-brands` vs `security-and-defence`), and remaining hardcoded colors (e.g. `bg-white`) are migrated to semantic tokens so they respond to the palette.
- **Source of truth for SD colors = the `security and defence section/` spec files only** (the `.txt` gradients + `#d1bfa7` background). We do **not** invent a full derived palette up front; whenever a token isn't covered by those files, ask the user for the exact value rather than guessing.
- **Gradients follow the existing `sub-hero-section` pattern**: defined as CSS classes in `app/globals.css` with a base (EN/LTR) rule and a `:lang(ar)` variant for RTL (mirroring `.gradient-overlay` / `:lang(ar) .gradient-overlay`, `.grid-pattern`, `.inner-gradient-background`). They are applied as **overlay divs layered over a `ResponsiveImage`** banner; AR/EN switching is automatic via the `:lang(ar)` selector (no JS locale branching). New SD classes (e.g. `.sd-gradient-overlay`, `.sd-services-gradient`, `.sd-section-bg` = `#d1bfa7`) are populated verbatim from the SD `.txt` spec files.

## Surfaces

- **(A) Home SD promo block** — `home.securityDefenceSection` (clones `home.moreSection`: AR/EN desktop+mobile image, AR/EN title/subtitle, CTA text+url). Edited under Configuration→Home, after "More section". Rendered on the home page **before** the spare-parts `SubHeroSection`. CTA points to the SD landing page.
- **(B) SD landing page** (`/security-and-defence`), four stacked sections:
  1. **Hero** — hardcoded "Security and Defence" title + SD gradient banner (not CMS-editable; matches how inner pages set their own title).
  2. **Intro** — admin-editable: image + AR/EN title + AR/EN description.
  3. **Products grid** — heading admin-editable (AR/EN); brand logo cards **derived** from `getSecurityDefenceBrands()` (Brand Type = `security_defence`).
  4. **Services block** — admin-editable: wide AR/EN image + AR/EN title + AR/EN description + CTA text + CTA url (same shape family as `moreSection`).
  - Editable config stored under a new top-level **`settings.securityDefence`** = `{ intro, productsHeading, services }`, with a new **"Security & Defence"** tab in the Configuration sidebar.
  - The **Services block is a pure CMS promo block** (image/title/desc/CTA text/CTA url) with a **free-form CTA url** set by the admin. It is **not** coupled to the `Service` content model; SD introduces no typed Service.
- **(C) SD product flow** — `/security-and-defence/[brandSlug]/[categorySlug]/[modelSlug]`, reusing the our-brands components with the SD palette + base path.
- The home SD promo block's **CTA defaults to `/security-and-defence`** (admin can override). SD product-page **breadcrumbs route through the landing**: `Home > Security & Defence > Brand > Category > Model` (mirrors `Home > Our Brands > ...`).

## SEO & sitemap

- Add **`seoStaticPagesSecurityDefence`** to settings (editable under admin→Seo), used by the SD landing page's `generateMetadata`.
- The sitemap **includes** the SD landing + SD brand/category/model URLs under the `/security-and-defence` prefix, and the existing brand/category/model sitemap entries are **filtered to exclude SD** items (so SD never appears under `/our-brands`). (The current category/model sitemap URLs also have a slug-order/base bug to fix while we're there.)
- SD brand/category/model **detail pages reuse the existing per-record `seo` JSON** column (same as default brands) — no new per-record SEO mechanism.

## Global search (Algolia)

- The index-feed functions (`feed-search` / `search.server`) emit **`/security-and-defence/...` hrefs for `security_defence` brands/categories/models** and `/our-brands/...` for `default` ones (branch on `Brand Type`), so SD content stays searchable in the command palette and links to the correct namespace.

## Content & assets

- **Code vs content are separated.** We build the schema, admin forms, and pages; the client uploads SD banners/intro image and creates the SD brands (ND Defense, Emergency One) with logos through the **admin CMS** (stored in Supabase). We do **not** seed assets or pre-fill config.

## Flagged ambiguities

- "More Section" was used to mean both the homepage `moreSection` promo block and the `Service` "More Section" — resolved: the new SD home block clones the homepage `moreSection`, not the Service model.
- "Defense" (American) vs "Defence" (British) — resurfaced in a client mockup using "Security & Defense". **Resolved (standing): copy uses British "Defence"** everywhere (per the **Security & Defence (SD)** entry). The American spelling in client mockups is not adopted.

## Footer & menu layout (client-confirmed)

- **Top menu (xl+ desktop bar):** the dark nav pill **hugs its content** (nav items + search + Language grouped tight, no `flex-grow`/`justify-between` spreading them) and sits at the inline-end of the header row (right in EN, left in AR). The **logo aligns to the same inline-start inset as the hero headline** ("A wide and impressive brand portfolio"); header horizontal padding is **symmetric** and mirrors the hero inset so left/right margins match at every breakpoint. Below xl the bar collapses to a hamburger; only the symmetric padding applies there, not the grouping.
- **Footer link groups (md and up):** arranged as **two stacked-pair columns** — **Our Brands → Security & Defence** in one column, **Services → Al Ghodwa** in the other — each pair an independent vertical flex stack so the lower title sits a fixed gap under the upper one (a long list in one column can't push the other column's lower title down). One unified grid with **even gaps across all breakpoints**. Mobile (<md) stays four separate accordions.
