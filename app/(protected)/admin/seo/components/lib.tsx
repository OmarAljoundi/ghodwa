import { House, type LucideIcon, Newspaper, Settings2 } from 'lucide-react';
import { GrOverview } from 'react-icons/gr';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import type { IconType } from 'react-icons/lib';
import { PiBrandy } from 'react-icons/pi';
import { RiTeamLine } from 'react-icons/ri';
import { SiGooglecampaignmanager360 } from 'react-icons/si';
import { TbDeviceVisionPro } from 'react-icons/tb';
import type { SettingSchema } from '@/schema/setting-schema';

export const seoMenuItems: Record<
  | 'HomeSeo'
  | 'OverviewSeo'
  | 'MissionVisionSeo'
  | 'ManagementTeamSeo'
  | 'ManagementSystemsSeo'
  | 'ContactUsSeo'
  | 'BrandListingSeo'
  | 'ServicesListingSeo'
  | 'NewsListingSeo',
  {
    icon: LucideIcon | IconType;
    value: string;
    schemaKey: keyof SettingSchema;
    title: string;
    description: string;
  }
> = {
  HomeSeo: {
    icon: House,
    value: 'Home Seo',
    schemaKey: 'seoStaticPagesHome',
    title: 'Configure SEO for the (home page)',
    description: 'Here you can configure the seo for the home page make it reach and awesome',
  },

  OverviewSeo: {
    icon: GrOverview,
    value: 'Overview Seo',
    schemaKey: 'seoStaticPagesOverview',
    title: 'Configure SEO for the (overview page)',
    description: 'Here you can configure the seo for the overview page make it reach and awesome',
  },

  MissionVisionSeo: {
    icon: TbDeviceVisionPro,
    value: 'Mission Vision Seo',
    schemaKey: 'seoStaticPagesMission',
    title: 'Configure SEO for the (mission page)',
    description: 'Here you can configure the seo for the mission page make it reach and awesome',
  },

  ManagementTeamSeo: {
    icon: RiTeamLine,
    value: 'Management and Team Seo',
    schemaKey: 'seoStaticPagesManagementTeam',
    title: 'Configure SEO for the (management team page)',
    description:
      'Here you can configure the seo for the management team page make it reach and awesome',
  },

  ManagementSystemsSeo: {
    icon: SiGooglecampaignmanager360,
    value: 'Management Systems Seo',
    schemaKey: 'seoStaticPagesManagementSystems',
    title: 'Configure SEO for the (management systems page)',
    description:
      'Here you can configure the seo for the management systems page make it reach and awesome',
  },

  ContactUsSeo: {
    icon: HiOutlineOfficeBuilding,
    value: 'Contact Us Seo',
    schemaKey: 'seoStaticPagesContactUs',
    title: 'Configure SEO for the (contact us page)',
    description: 'Here you can configure the seo for the contact us page make it reach and awesome',
  },

  BrandListingSeo: {
    icon: PiBrandy,
    value: 'Brand Listing Seo',
    schemaKey: 'seoStaticPagesBrandListing',
    title: 'Configure SEO for the (brand listing page)',
    description:
      'Here you can configure the seo for the brand listing page make it reach and awesome',
  },

  ServicesListingSeo: {
    icon: Settings2,
    value: 'Services Listing Seo',
    schemaKey: 'seoStaticPagesServicesListing',
    title: 'Configure SEO for the (services listing page)',
    description:
      'Here you can configure the seo for the services listing page make it reach and awesome',
  },

  NewsListingSeo: {
    icon: Newspaper,
    value: 'News Listing Seo',
    schemaKey: 'seoStaticPagesNewsListing',
    title: 'Configure SEO for the (news listing page)',
    description:
      'Here you can configure the seo for the news listing page make it reach and awesome',
  },
};
