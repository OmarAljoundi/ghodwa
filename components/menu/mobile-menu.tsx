'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { Service } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useBrandsPages, useExtraPages, useServicesPages } from '@/hooks/use-render-items';
import { resolveUrl } from '@/lib/utils';
import type { BrandWithRelationsSchema } from '@/schema';
import type { SettingSchema } from '@/schema/setting-schema';
import type { FileSchema } from '@/schema/upload-schema';
import ActionMenu from './action-menu';

export default function MobileMenu({
  isRTL,
  brands,
  securityDefenceBrands,
  services,
  settings,
}: {
  isRTL: boolean;
  brands: BrandWithRelationsSchema[];
  securityDefenceBrands: BrandWithRelationsSchema[];
  services: Service[];
  settings: SettingSchema;
}) {
  const [open, setOpen] = useState(false);

  const allAboutPages = useExtraPages(settings, 'menu');
  const serviceItems = useServicesPages(services, 'menu');
  const brandItems = useBrandsPages(brands, 'menu');
  const securityDefenceItems = useBrandsPages(securityDefenceBrands, 'menu');

  const brandsFilter = useFilteredLanguageData(brandItems);
  const securityDefenceFilter = useFilteredLanguageData(securityDefenceItems);
  const servicesFilter = useFilteredLanguageData(serviceItems);
  const alghodowaFilter = useFilteredLanguageData(allAboutPages);

  const t = useTranslations();

  return (
    <div className="flex xl:hidden gap-x-2">
      <ActionMenu />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="group text-black"
            variant="default"
            size="icon"
            onClick={() => setOpen((prevState) => !prevState)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="pointer-events-none"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={isRTL ? 'right' : 'left'}
          className="w-[300px] sm:w-[400px]  backdrop-blur-md text-black overflow-y-auto"
        >
          <SheetTitle className="sr-only">Menu Item</SheetTitle>
          <nav className="flex flex-col space-y-4 mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="alghodowa">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('Al Ghodwa')}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-4">
                    {alghodowaFilter.map((item, index) => (
                      <Link
                        key={`${item.title}-${index}`}
                        href={item.url}
                        onClick={() => setOpen(false)}
                        className="text-sm hover:text-gray-300 transition-colors"
                      >
                        {t(item.title)}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="brands">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('Our Brands')}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 ">
                    {brandsFilter.map((brand, index) => (
                      <Link
                        key={`${brand.name}-${index}`}
                        href={`/our-brands/${brand.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex flex-col items-center justify-center gap-y-2 hover:bg-white/10 rounded-md p-2 transition-colors"
                      >
                        <Image
                          src={brand.logo?.path ? resolveUrl(brand.logo?.path) : '/placeholder.svg'}
                          alt="logo"
                          width={35}
                          height={35}
                          className="object-contain"
                        />
                        <div className="text-xs text-center">{brand.name}</div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {securityDefenceFilter.length > 0 && (
                <AccordionItem value="security-defence">
                  <AccordionTrigger className="text-lg font-semibold">
                    {t('Security and Defence')}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-4 ">
                      {securityDefenceFilter.map((brand, index) => (
                        <Link
                          key={`${brand.name}-${index}`}
                          href={`/security-and-defence/${brand.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex flex-col items-center justify-center gap-y-2 hover:bg-white/10 rounded-md p-2 transition-colors"
                        >
                          <Image
                            src={
                              brand.logo?.path ? resolveUrl(brand.logo?.path) : '/placeholder.svg'
                            }
                            alt="logo"
                            width={35}
                            height={35}
                            className="object-contain"
                          />
                          <div className="text-xs text-center">{brand.name}</div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/security-and-defence"
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
                    >
                      {t('Security and Defence')}
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="services">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('Our Services')}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 ">
                    {servicesFilter.map((service, index) => (
                      <Link
                        key={`${service.title}-${index}`}
                        onClick={() => setOpen(false)}
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-x-3 hover:bg-white/10 rounded-md p-2 transition-colors"
                      >
                        <Image
                          width={25}
                          height={25}
                          alt={service.title}
                          className="bg-black rounded-lg"
                          src={resolveUrl((service?.icon as FileSchema)?.path)}
                        />
                        <div className="text-sm">{service.title}</div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              onClick={() => setOpen(false)}
              href="/news"
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              {t('News')}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/contact-us"
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              {t('Contact us')}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
