'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BlurFade } from '@/components/ui/blur-fade';
import { Separator } from '@/components/ui/separator';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useExtraPages } from '@/hooks/use-render-items';
import { usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { SettingSchema } from '@/schema/setting-schema';

export function AlghodwaPagesSitemap({
  className,
  settings,
}: {
  className: string;
  settings: SettingSchema;
}) {
  const allAboutPages = useExtraPages(settings);

  const alGhodwaMenuFiltered = useFilteredLanguageData(allAboutPages);
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <BlurFade delay={0.1} className={className}>
      <div className="bg-white rounded-3xl shadow-sm p-4  w-full">
        <h1 className="text-xl mb-4 ps-4 rtl:pe-4 font-bold">{t('Al Ghodwa')}</h1>
        <div className="px-2 space-y-1">
          {alGhodwaMenuFiltered.map((props, index) => (
            <BlurFade delay={index * 0.2} direction={'left'} key={props.title}>
              <Link
                href={props.url}
                aria-current={props.url === pathname}
                className={cn(
                  'p-1.5 rounded-lg flex justify-between items-center cursor-pointer',
                  props.url === pathname
                    ? 'bg-primary font-bold'
                    : 'hover:bg-primary/40  duration-300 transition-all',
                )}
              >
                <span className="ps-4 rtl:pe-4">{t(props.title)}</span>
                {props.url !== pathname && (
                  <ArrowRight className={'size-4 !text-primary bg-transparent rtl:rotate-180'} />
                )}
              </Link>

              <Separator
                className={cn(
                  'first:hidden',
                  props.url === pathname ? 'hidden' : '',
                  index === alGhodwaMenuFiltered.length - 1 ? 'hidden' : '',
                )}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}
