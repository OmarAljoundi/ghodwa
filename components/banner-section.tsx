'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import ResponsiveImage from './responsive-image';
import { Button } from './ui/button';

/**
 * Shared full-width promo banner used by the home page (Security & Defence,
 * Spare Parts / "More section") and the SD landing page (Services).
 *
 * Consolidates three hand-cloned banner blocks into one component so the
 * layout/responsiveness stays consistent: text is vertically centred via flex
 * (no fixed `pt-[...]` pixel offsets that broke on resize). The gradient itself
 * is supplied by the caller via `overlayClassName` (the original
 * `*-gradient-overlay` utility classes in globals.css, including the
 * `!bg-black/70 lg:!bg-transparent` mobile overlay).
 */
export function BannerSection({
  largeSrc,
  smallSrc,
  title,
  subtitle,
  url,
  ctaText,
  overlayClassName,
  heading = 'h2',
  ctaArrowWrapClassName = 'bg-black',
  ctaArrowClassName = 'text-primary',
  buttonClassName = 'bg-primary text-black',
  fallbackUrl,
}: {
  largeSrc?: string;
  smallSrc?: string;
  title?: string;
  subtitle?: string;
  url?: string;
  ctaText?: string;
  /** Gradient overlay utility class (e.g. `sd-home-gradient-overlay`). */
  overlayClassName: string;
  heading?: 'h1' | 'h2';
  ctaArrowWrapClassName?: string;
  ctaArrowClassName?: string;
  buttonClassName?: string;
  /** Used when `url` is empty (e.g. S&D banner defaults to the SD landing). */
  fallbackUrl?: string;
}) {
  const Heading = heading as 'h1' | 'h2';
  const href = url || fallbackUrl;

  const headingNode: ReactNode = (
    <Heading className="font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-50 relative z-10 whitespace-pre-line rtl:leading-tight">
      {title}
    </Heading>
  );

  return (
    <div className="relative w-full h-[440px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden rounded-3xl lg:rounded-3xl">
      <ResponsiveImage
        largeSrc={largeSrc}
        smallSrc={smallSrc}
        alt={title ?? ''}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-3xl"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />

      {/* Directional brand gradient: solid on the text side -> transparent over
          the image. Class carries the per-banner colour + RTL mirroring. */}
      <div className={cn('absolute inset-0 rounded-3xl', overlayClassName)} />

      <div className="grid-pattern rounded-3xl" />

      {/* Text column: inline-start half on desktop, full width on mobile.
          Vertically centred via flex — no fixed pixel padding to break on
          resize. */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="flex w-full flex-col items-start gap-y-5 px-6 sm:px-8 lg:px-16 xl:px-24 sm:w-[85%] md:w-[70%] lg:w-3/5 xl:w-1/2">
          {headingNode}
          {subtitle ? (
            <p className="font-light text-sm sm:text-base text-gray-50 relative z-10 max-w-prose whitespace-pre-line">
              {subtitle}
            </p>
          ) : null}
          {href && ctaText ? (
            <Link href={href} className="block">
              <Button className={cn('z-10 px-5 rounded-xl py-6', buttonClassName)} size="lg">
                {ctaText}
                <div className={cn('rounded-sm -me-1 ms-2 py-1 px-1', ctaArrowWrapClassName)}>
                  <ArrowRight
                    className={cn('size-6 rtl:rotate-180', ctaArrowClassName)}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
