import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import type { Service } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useBrandsPages, useExtraPages, useServicesPages } from '@/hooks/use-render-items';
import { cn, resolveUrl } from '@/lib/utils';
import type { BrandWithRelationsSchema } from '@/schema';
import type { SettingSchema } from '@/schema/setting-schema';
import type { FileSchema } from '@/schema/upload-schema';
import ActionMenu from './action-menu';

export default function DesktopMenu({
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
    <nav
      className={`px-8 py-4 hidden flex-grow lg:flex items-center justify-between  bg-black/50 backdrop-blur-md bg-opacity-70  transition-all duration-300 rounded-lg `}
    >
      <NavigationMenu key={'main'}>
        <NavigationMenuList>
          <NavigationMenuItem key={'about'}>
            <NavigationMenuTrigger className={cn('bg-transparent text-white', 'font-light')}>
              {t('Al Ghodwa')}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[250px] p-1">
                {alghodowaFilter.map((item) => (
                  <li key={`${item.title}-${item.url}`}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {t(item.title)}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key={'brands'}>
            <NavigationMenuTrigger className={cn('bg-transparent text-white', 'font-light')}>
              {t('Our Brands')}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] p-4">
                <h3 className="text-lg font-medium">{t('Our Brands')}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t('Discover our diverse portfolio of innovative brands')}
                </p>
                <div className="grid grid-cols-3 gap-4 ">
                  {brandsFilter.map((brand) => (
                    <Link
                      key={`${brand.name}-${brand.id}`}
                      href={`/our-brands/${brand.slug}`}
                      className="flex flex-col items-center border justify-center gap-y-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      {brand.logo?.path && (
                        <Image
                          src={resolveUrl(brand.logo?.path)}
                          alt="logo"
                          width={35}
                          height={35}
                          className="object-contain flex items-center justify-center"
                        />
                      )}
                      <div className="text-sm font-medium leading-none">{brand.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {securityDefenceFilter.length > 0 && (
            <NavigationMenuItem key={'security-defence'}>
              <NavigationMenuTrigger className={cn('bg-transparent text-white', 'font-light')}>
                {t('Security and Defence')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[600px] p-4">
                  <h3 className="text-lg font-medium">{t('Security and Defence')}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t('Security and defence products')}
                  </p>
                  <div className="grid grid-cols-3 gap-4 ">
                    {securityDefenceFilter.map((brand) => (
                      <Link
                        key={`${brand.name}-${brand.id}`}
                        href={`/security-and-defence/${brand.slug}`}
                        className="flex flex-col items-center border justify-center gap-y-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {brand.logo?.path && (
                          <Image
                            src={resolveUrl(brand.logo?.path)}
                            alt="logo"
                            width={35}
                            height={35}
                            className="object-contain flex items-center justify-center"
                          />
                        )}
                        <div className="text-sm font-medium leading-none">{brand.name}</div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/security-and-defence"
                    className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
                  >
                    {t('Security and Defence')}
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem key={'services'}>
            <NavigationMenuTrigger className={cn('bg-transparent text-white', 'font-light')}>
              {t('Our Services')}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] p-4">
                <h3 className=" text-lg font-medium">{t('Our Services')}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t('Explore our range of professional services')}
                </p>
                <div className="space-y-4">
                  {servicesFilter.map((service) => (
                    <Link
                      key={`${service.title}-${service.id}`}
                      href={`/services/${service.slug}`}
                      className="flex items-center rtl:space-x-reverse space-x-3 rounded-md p-1.5 hover:text-accent transition-all duration-300  bg-black text-white "
                    >
                      <Image
                        width={35}
                        height={35}
                        alt={service.title}
                        src={resolveUrl((service?.icon as FileSchema)?.path)}
                      />
                      <div>
                        <div className="text-sm font-medium leading-none">{service.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key={'news'}>
            <NavigationMenuLink asChild>
              <Link
                href="/news"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-transparent text-white',
                  'font-light',
                )}
              >
                {t('News')}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem key={'contact'}>
            <NavigationMenuLink asChild>
              <Link
                href="/contact-us"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-transparent text-white',
                  'font-light',
                )}
              >
                {t('Contact us')}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ActionMenu key={'actions'} />
    </nav>
  );
}
