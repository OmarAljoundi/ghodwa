'use client';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import type { News } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useHydrated } from '@/hooks/use-hydrated';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import type { getNews } from '@/query';
import { BrandBadge } from '../brand-badge';

export function NewsContainer({ dataPromise }: { dataPromise: ReturnType<typeof getNews> }) {
  const news = use(dataPromise);
  return (
    <section className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:gap-x-16">
      <div className="w-fit shrink-0 mx-auto ltr:lg:ml-auto rtl:lg:mr-auto">
        <BrandBadge title="Top News" />
      </div>
      <div className="flex flex-col gap-y-6 flex-1">
        {news.map((newsItem) => (
          <NewsItem key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>
    </section>
  );
}

const NewsItem = ({ newsItem }: { newsItem: News }) => {
  const { createdAt, summary, title, slug, image } = useFilteredLanguageData(newsItem);
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isHydrated = useHydrated();

  const showExpandedView = !isHydrated ? false : isDesktop ? isHovered : true;

  return (
    <Link href={`/news/${slug}`}>
      <div
        onMouseEnter={() => isDesktop && setIsHovered(true)}
        onMouseLeave={() => isDesktop && setIsHovered(false)}
        className={cn(
          'border-b border-border cursor-pointer relative transition-all duration-300',
          showExpandedView ? 'pb-4' : 'pb-0',
        )}
      >
        <div className={cn('flex flex-col md:flex-row md:justify-start md:gap-x-4 gap-y-3')}>
          <div
            className={cn(
              'relative w-full md:max-w-[300px] flex-shrink-0 overflow-hidden rounded-lg',
              'transition-all duration-300 ease-in-out',
              isDesktop
                ? showExpandedView
                  ? 'h-[200px] scale-[1.02]'
                  : 'h-[150px] scale-100'
                : 'h-[200px]',
            )}
          >
            {(image as any[])?.length > 0 && (
              <Image
                src={(image as any[])[0].url}
                alt={title}
                fill
                className="object-cover rounded-lg object-top"
                quality={80}
                sizes="(max-width: 768px) 100vw, 300px"
              />
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-y-3 min-w-0 flex-1">
            <div className="flex gap-x-2 justify-start font-light text-xl items-center min-w-0">
              <h1 className="truncate transition-colors text-gray-800">{title}</h1>
              <GoDotFill className="animate-pulse size-3 flex-shrink-0" />
              <h3 className="whitespace-nowrap text-primary flex-shrink-0">
                {format(createdAt, 'dd. MM. yyyy')}
              </h3>
            </div>

            <p
              className={cn(
                'text-sm lg:text-base font-normal text-gray-600 overflow-hidden transition-all duration-300',
                showExpandedView ? 'line-clamp-none' : 'line-clamp-1',
              )}
            >
              {summary}
            </p>
            <div
              className={cn(
                'bg-black rounded-sm py-1 px-1 w-fit md:absolute transition-opacity duration-300',
                'md:ltr:right-4 md:rtl:left-4 md:bottom-8',
                'ltr:mr-auto rtl:ml-auto bottom-2',
                'z-50',
                showExpandedView ? 'opacity-100' : 'opacity-0',
              )}
            >
              <ArrowRight
                className="size-6 text-primary rtl:rotate-180"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
