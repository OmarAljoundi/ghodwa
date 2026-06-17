'use client';
import type { Service } from '@/generated/client/client';
import type { BrandWithRelationsSchema } from '@/schema';
import type { SettingSchema } from '@/schema/setting-schema';
import { Bottom } from './bottom';
import { FirstFooterLayer } from './first-footer-layer';
import LogoContact from './logo-contact';
import { SecondFooterLayer } from './second-footer-layer';
import { SecurityDefenceFooterLayer } from './security-defence-footer-layer';
import { WebsiteBy } from './website-by';

export function Footer({
  settings,
  brands,
  securityDefenceBrands,
  services,
}: {
  settings: SettingSchema;
  brands: BrandWithRelationsSchema[];
  securityDefenceBrands: BrandWithRelationsSchema[];
  services: Service[];
}) {
  const { footer, socialMediaContact } = settings;
  return (
    <footer className="bg-black text-white py-12 mt-8  lg:rounded-b-3xl rounded-t-3xl ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6  justify-items-start px-4 xl:px-0">
          <LogoContact footer={footer} />
          <FirstFooterLayer brands={brands} />
          <SecurityDefenceFooterLayer securityDefenceBrands={securityDefenceBrands} />
          <SecondFooterLayer services={services} settings={settings} />
          <Bottom socialMediaContact={socialMediaContact} />
          <WebsiteBy />
        </div>
      </div>
    </footer>
  );
}
