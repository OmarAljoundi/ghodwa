'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BlurFade } from '@/components/ui/blur-fade';
import { Separator } from '@/components/ui/separator';
import type { Service } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function ServicesPagesSitemap({
  className,
  services,
}: {
  className?: string;
  services: Service[];
}) {
  const servicesFiltered = useFilteredLanguageData(services);
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <BlurFade delay={0.1} className={className}>
      <div className="bg-white rounded-3xl shadow-sm p-4  w-full">
        <h1 className="text-xl mb-4 ps-4 rtl:pe-4 font-bold">{t('Our Services')}</h1>
        <div className="px-2 space-y-1">
          {servicesFiltered.map((props, index) => (
            <BlurFade delay={index * 0.2} direction={'left'} key={props.title}>
              <Link
                href={`/services/${props.slug}`}
                aria-current={pathname.includes(props.slug)}
                className={cn(
                  'p-1.5 rounded-lg flex justify-between items-center cursor-pointer',
                  pathname.includes(props.slug)
                    ? 'bg-primary font-bold'
                    : 'hover:bg-primary/40  duration-300 transition-all',
                )}
              >
                <span className="ps-4 rtl:pe-4">{props.title}</span>
                {!pathname.includes(props.slug) && (
                  <ArrowRight className={'size-4 !text-primary bg-transparent rtl:rotate-180'} />
                )}
              </Link>

              <Separator
                className={cn(
                  'first:hidden',
                  pathname.includes(props.slug) ? 'hidden' : '',
                  index === servicesFiltered.length - 1 ? 'hidden' : '',
                )}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}
