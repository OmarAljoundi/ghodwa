import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 85, 75],
    remotePatterns: [
      {
        hostname: 'placehold.co',
      },
      {
        hostname: 'ynubnujbowecahoxvuzt.supabase.co',
      },
      {
        hostname: 'utfs.io',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
