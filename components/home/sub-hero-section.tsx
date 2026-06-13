'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { getSettings } from '@/query';
import ResponsiveImage from '../responsive-image';
import { Button } from '../ui/button';

export function SubHeroSection({ dataPromise }: { dataPromise: ReturnType<typeof getSettings> }) {
  const {
    home: { moreSection },
  } = use(dataPromise);
  const { callToAction, subtitle, title, media, mobile_media } =
    useFilteredLanguageData(moreSection);
  const { url, text } = useFilteredLanguageData(callToAction);
  return (
    <div className="relative w-full h-[400px] md:h-[600px]">
      <ResponsiveImage
        largeSrc={media?.path}
        smallSrc={mobile_media?.path}
        alt={title}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-none lg:rounded-3xl"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />

      <div className="absolute inset-0 gradient-overlay rounded-none lg:rounded-3xl !bg-black/70 lg:!bg-transparent" />

      <div className="grid-pattern rounded-none lg:rounded-3xl" />

      <div className="relative h-full w-full flex items-center justify-center">
        <div className="flex flex-row-reverse items-center space-x-4 z-10 h-full w-full">
          <div className="text content px-4 lg:px-24 items-start w-full  lg:w-2/3 xl:w-[50%]  me-auto  space-y-6 z-10 h-full flex flex-col justify-start pt-[150px] md:pt-[230px]">
            <h1 className="font-normal text-2xl md:text-6xl text-gray-50 relative z-10 whitespace-pre-line rtl:md:leading-[75px] rtl:leading-10">
              {title}
            </h1>
            <p className="font-light text-base text-gray-50 relative z-10">{subtitle}</p>
            <Link href={url} className="block">
              <Button className="z-10 bg-primary text-black px-5 rounded-xl py-6" size="lg">
                {text}
                <div className="bg-black rounded-sm -me-1 ms-2 py-1 px-1">
                  <ArrowRight
                    className="size-6 text-primary rtl:rotate-180"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
