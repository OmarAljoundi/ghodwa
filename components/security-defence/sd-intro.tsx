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
        Split hero (per client feedback): two balanced columns — one side image,
        the other side text — collapsing to a single stacked column on mobile.

        RTL is handled by the GRID, not by hand: DOM order is image-then-text, no
        `grid-column` pinning and no RTL column math. With `dir=rtl` the grid's
        native line numbering flips, so the first source item (image) flows to
        the inline-START edge (physical LEFT in LTR, physical RIGHT in RTL) and
        the text takes the inline-END side automatically.

        Columns are equal `1fr` tracks and cells are centred (`items-center`), so
        the split holds at every width with no overlap offsets or per-breakpoint
        pixel tuning that could break on resize.
      */}
      <div className="grid grid-cols-1 items-center gap-y-8 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* IMAGE — first in source -> inline-start side (left LTR / right RTL). */}
        {mediaPath && (
          <div className="order-2 w-full lg:order-none">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={resolveUrl(mediaPath)}
                alt={altText}
                fill
                quality={100}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        )}

        {/* TEXT — second in source -> inline-end side (right LTR / left RTL). */}
        <div className="order-1 flex w-full flex-col gap-y-5 text-start lg:order-none">
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
