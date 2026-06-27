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

  // Two stacked-pair columns rendered as REAL grid cells (Fragment, not a nested
  // grid) so they sit on the footer's 4-col grid and every column gap is the grid's
  // single uniform `gap-6`. Each pair is its own vertical flex stack: the lower
  // title (S&D / Al Ghodwa) sits a fixed gap under the upper one, so a long list in
  // one column can't push the other column's lower title down. Below md the
  // ColumnGroup accordions stack into a single column. Empty Security and Defence
  // collapses cleanly (renders just Our Brands).
  return (
    <>
      <div className="col-span-full md:col-span-1 lg:w-auto flex flex-col gap-y-8 w-full">
        <ColumnGroup items={mappedBrands} title="Our Brands" />
        {mappedSecurityDefence.length > 0 && (
          <ColumnGroup items={mappedSecurityDefence} title="Security and Defence" />
        )}
      </div>
      <div className="col-span-full md:col-span-1 lg:w-auto flex flex-col gap-y-8 w-full">
        <ColumnGroup items={mappedServices} title="Services" />
        <ColumnGroup items={alGhodwaMenu} title="Al Ghodwa" />
      </div>
    </>
  );
}
