import { useMemo } from 'react';
import type { Service } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { BrandWithRelationsSchema } from '@/schema';

export interface NavigationItemsProps {
  title: string;
  href: string;
  callToAction?: { title: string; description: string; herf: string };
  items?: ItemProps[];
}

export interface ItemProps {
  title: string;
  href: string;
  items?: Array<ItemProps>;
}

export function useGenerateMenu({
  brands,
  services,
}: {
  brands: BrandWithRelationsSchema[];
  services: Service[];
}): NavigationItemsProps[] {
  const brandsFilter = useFilteredLanguageData(brands);
  const servicesFilter = useFilteredLanguageData(services);

  const navigationItems = useMemo((): NavigationItemsProps[] => {
    return [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'AlGhodwa',
        href: '/about-us',
      },
      {
        title: 'Our Brands',
        href: '#',
        callToAction: {
          title: 'View all brands',
          description:
            'We take pride in offering a diverse portfolio of brands that cater to a wide range of needs and preferences, experience the excellence that defines us.',
          herf: '/our-brands',
        },
        items: brandsFilter.map(({ name, slug, categories }) => {
          return {
            title: name,
            href: `/our-brands/${slug}`,
            items: (categories ?? [])?.map(({ en_name, slug: categorySlug }) => {
              return {
                title: en_name,
                href: `/our-brands/${slug}/${categorySlug}`,
              };
            }),
          };
        }),
      },
      {
        title: 'Services',
        href: '/services',
        items: servicesFilter.map(({ title, slug }) => {
          return {
            title: title,
            href: `/services/${slug}`,
          };
        }),
      },
    ];
  }, [brandsFilter, servicesFilter]);

  return navigationItems;
}
