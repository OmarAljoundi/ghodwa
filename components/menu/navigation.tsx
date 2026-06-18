'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { Service } from '@/generated/client/client';
import { cn } from '@/lib/utils';
import type { BrandWithRelationsSchema } from '@/schema';
import type { SettingSchema } from '@/schema/setting-schema';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';

export function Navigation({
  brands,
  securityDefenceBrands,
  services,
  settings,
}: {
  brands: BrandWithRelationsSchema[];
  securityDefenceBrands: BrandWithRelationsSchema[];
  services: Service[];
  settings: SettingSchema;
}) {
  const lang = useLocale();
  const isRTL = lang === 'ar';

  return (
    <header
      className={cn(
        'absolute top-2 lg:top-12 left-0 right-0 mx-auto z-50 w-full   transition-all duration-300 !bg-transparent',
      )}
    >
      <div className="flex h-16 items-center px-6 lg:px-16 gap-x-4 lg:gap-x-10 justify-between w-full flex-row">
        <div className="shrink-0">
          <Link
            href="/"
            className={cn(
              'flex items-center space-x-2 rtl:space-x-reverse ltr:justify-end ltr:lg:justify-start rtl:justify-end rtl:lg:justify-start',
            )}
          >
            <Image
              src={'/arabic-logo.png'}
              className={cn('block ltr:hidden lg:w-[250px] w-[150px]')}
              width={250}
              height={50}
              quality={85}
              priority={true}
              sizes="(max-width: 768px) 120px, 150px"
              alt="arabic-logo"
            />

            <Image
              src={'/english-logo.png'}
              className={cn('block rtl:hidden lg:w-[250px] w-[150px]')}
              width={250}
              height={50}
              quality={85}
              priority={true}
              sizes="(max-width: 768px) 120px, 150px"
              alt="english-logo"
            />
          </Link>
        </div>

        <DesktopMenu
          brands={brands}
          securityDefenceBrands={securityDefenceBrands}
          services={services}
          settings={settings}
        />
        <MobileMenu
          brands={brands}
          securityDefenceBrands={securityDefenceBrands}
          services={services}
          settings={settings}
          isRTL={isRTL}
        />
      </div>
    </header>
  );
}
