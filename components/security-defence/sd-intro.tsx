'use client';

import Image from 'next/image';
import { use } from 'react';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { resolveUrl } from '@/lib/utils';
import type { getSettings } from '@/query';
import type { FileSchema } from '@/schema/upload-schema';

export function SecurityDefenceIntro({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getSettings>;
}) {
  const settings = use(dataPromise);
  const intro = settings.securityDefence?.intro;

  const filtered = useFilteredLanguageData(intro);

  if (!intro || !filtered) return null;

  const { title, description, media } = filtered;
  const mediaPath = (media as FileSchema)?.path;

  // Screen-reader label: collapse the literal newline that drives
  // `whitespace-pre-line` in the visible heading so the alt text reads cleanly.
  const altText =
    typeof title === 'string' && title.trim().length > 0
      ? title.replace(/\s+/g, ' ').trim()
      : 'Security and Defence';

  return (
    <section className="container mx-auto py-10 lg:py-16">
      {/*
        ONE CSS grid that *is* the mockup composition at every width — responsive
        by construction. No absolute positioning, no per-breakpoint pixel offsets.

        WHY IT CAN'T BREAK
        - Tracks are `fr` units `[1.05fr_0.95fr]`, so they re-divide the SAME
          container width at any viewport (md -> 4K). The ~52/48 split is
          width-invariant: proportions never disagree with absolute sizes.
        - The image lives in a fixed-RATIO box (`aspect-[4/3]`, the PNG's own
          shape) with `object-contain object-bottom`. Its rendered height is
          DERIVED from its measured column width (height = width * 3/4) — never a
          hand-tuned px height — so the truck+dust unit is always fully visible
          and can never float over a stray gap.
        - Cells align to the row START (`items-start` + `self-start`), so the row
          height = the taller cell and the IMAGE is pinned to the top. If a verbose
          (e.g. Arabic) paragraph grows taller than the image box, the image stays
          top-aligned next to the heading instead of centering into blank space.

        RTL (image RIGHT / text LEFT) — handled by the GRID, not by hand
        - DOM order is image-then-text. We do NOT pin `grid-column` and we do NOT
          add any RTL column math. The grid's native line numbering flips with
          `dir=rtl`: the first source item flows to the inline-START edge, which is
          the physical RIGHT in RTL. So image -> right, text -> left automatically,
          and the wider `1.05fr` track (first track) sits on the image's side in
          both directions.
        - Overlap ("dust under the text") is a single fluid negative inline-start
          margin on the TEXT cell: `-ms-[clamp(...)]`. `ms` is the inline-start
          axis, so it pulls the text toward the image in BOTH directions (left in
          LTR, right in RTL). Capped in rem so even at 4K it only nudges the text
          over the haze — it can never collapse the columns or clip the truck.

        MOBILE (< md): single column. We force text first with `order` for reading
        order / SEO, then reset `order` at md so the grid's direction-aware flow
        takes over. The overlap margin only applies at md+.
      */}
      <div
        className="grid grid-cols-1 items-start gap-y-8
          lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-8 lg:gap-y-0"
      >
        {/* IMAGE — first in source. Grid flow places it on the inline-start side:
            physical LEFT in LTR, physical RIGHT in RTL. No grid-column / RTL math.

            2xl ONLY (>=1536px): shift the image to the RIGHT. `transform` keeps it
            out of layout flow so nothing else moves; the prefix scopes it to 2xl so
            no smaller screen is affected. Adjust the rem value to tune the amount. */}
        {mediaPath && (
          <div className="order-2 w-full self-start lg:order-none 2xl:translate-x-[10rem]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={resolveUrl(mediaPath)}
                alt={altText}
                fill
                quality={100}
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        )}

        {/* TEXT — second in source -> inline-end side (right in LTR, left in RTL).
            `self-start` pins the heading to the row top, level with the truck cabin.
            The fluid `-ms` overlap pulls it toward the image over the dust haze.
            `z-10` keeps it above the image edge during the overlap. */}
        <div
          className="order-1 flex w-full flex-col gap-y-5 text-start
            lg:order-none lg:self-start lg:pt-2 lg:z-10 xl:pt-6
            lg:-ms-[clamp(0.5rem,3.5vw,4.5rem)]"
        >
          <h2 className="whitespace-pre-line text-3xl font-semibold leading-tight text-primary lg:text-4xl xl:text-5xl rtl:leading-snug">
            {title as string}
          </h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-foreground/80 lg:text-lg">
            {description as string}
          </p>
        </div>
      </div>
    </section>
  );
}
