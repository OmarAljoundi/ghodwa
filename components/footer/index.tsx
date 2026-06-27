'use client';
import type { Service } from '@/generated/client/client';
import type { BrandWithRelationsSchema } from '@/schema';
import type { SettingSchema } from '@/schema/setting-schema';
import { Bottom } from './bottom';
import { FooterLinks } from './footer-links';
import LogoContact from './logo-contact';
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
      <div className="container mx-auto md:px-4 xl:px-8">
        {/* Main row: below lg a responsive grid (stacks/2-up); at lg+ a flex row where
            each of the four columns sizes to its CONTENT (no stretched fr-tracks, so no
            trailing voids) and the columns are distributed with even space between them.
            LogoContact + FooterLinks each emit two flex children (Fragments). */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 justify-items-start px-4 xl:px-0 lg:flex lg:justify-between lg:gap-x-8">
          <LogoContact footer={footer} />
          <FooterLinks
            brands={brands}
            securityDefenceBrands={securityDefenceBrands}
            services={services}
            settings={settings}
          />
        </div>
        {/* Bottom row: social (left) + website-by (right), spanning full width. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 xl:px-0 mt-10">
          <Bottom socialMediaContact={socialMediaContact} />
          <WebsiteBy />
        </div>
      </div>
    </footer>
  );
}
