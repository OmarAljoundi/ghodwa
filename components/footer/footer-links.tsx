import type { Service } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useBrandsPages, useExtraPages, useServicesPages } from '@/hooks/use-render-items';
import type { BrandWithRelationsSchema } from '@/schema';
import type { SettingSchema } from '@/schema/setting-schema';
import { ColumnGroup } from './column-group';

export function FooterLinks({
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
  const brandItems = useBrandsPages(brands, 'footer');
  const filtredBrands = useFilteredLanguageData(brandItems);
  const mappedBrands = filtredBrands.map((o) => ({
    title: o.name,
    url: `/our-brands/${o.slug}`,
  }));

  const securityDefenceItems = useBrandsPages(securityDefenceBrands, 'footer');
  const filtredSecurityDefence = useFilteredLanguageData(securityDefenceItems);
  const mappedSecurityDefence = filtredSecurityDefence.map((o) => ({
    title: o.name,
    url: `/security-and-defence/${o.slug}`,
  }));

  const serviceItems = useServicesPages(services, 'footer');
  const filtredServices = useFilteredLanguageData(serviceItems);
  const mappedServices = filtredServices.map((x) => ({
    title: x.title,
    url: `/services/${x.slug}`,
  }));

  const extraAlGhodwaMenu = useExtraPages(settings, 'footer');
  const alGhodwaMenu = useFilteredLanguageData(extraAlGhodwaMenu);

  // md/lg (2 columns): the four groups fill row 1 = [Our Brands, Services],
  // row 2 = [Security and Defence, Al Ghodwa] — so the two second-row titles
  // land on the same line regardless of how tall the first row is. `md:order-*`
  // pins this 2×2 order independently of DOM order.
  // 2xl (3 columns): Our Brands | Security and Defence | (Services stacked above
  // Al Ghodwa). The Services/Al Ghodwa wrapper is `display:contents` below 2xl
  // (children act as their own grid cells, keeping the 2×2 layout) and a tight
  // flex column at 2xl, so the two stack with no gap pulled from the grid rows.
  return (
    <div className="col-span-full md:col-span-2 2xl:col-span-3 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-8 w-full 2xl:items-start">
      <div className="md:order-1 2xl:order-1">
        <ColumnGroup items={mappedBrands} title="Our Brands" />
      </div>
      <div className="md:order-3 2xl:order-2">
        {mappedSecurityDefence.length > 0 ? (
          <ColumnGroup items={mappedSecurityDefence} title="Security and Defence" />
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
      <div className="contents 2xl:order-3 2xl:flex 2xl:flex-col 2xl:gap-y-8">
        <div className="md:order-2 2xl:order-none">
          <ColumnGroup items={mappedServices} title="Services" />
        </div>
        <div className="md:order-4 2xl:order-none">
          <ColumnGroup items={alGhodwaMenu} title="Al Ghodwa" />
        </div>
      </div>
    </div>
  );
}
