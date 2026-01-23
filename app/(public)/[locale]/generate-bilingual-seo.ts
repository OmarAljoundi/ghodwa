import type { Metadata } from 'next';
import { resolveUrl } from '@/lib/utils';
import type { SeoSchema } from '@/schema/seo-schema';

export const languages = {
  en: { name: 'English', dir: 'ltr', locale: 'en-US' },
  ar: { name: 'العربية', dir: 'rtl', locale: 'ar-SA' },
} as const;

type Lang = keyof typeof languages;

export const generatePageBilingualSeo = (
  seo: SeoSchema,
  pathname: string = '/',
  images?: Array<{ path: string; width?: number; height?: number; alt?: string }>,
): Record<Lang, Metadata> => {
  const {
    ar_metaKeywords,
    en_metaKeywords,
    ar_metaDescription,
    ar_metaTitle,
    en_metaDescription,
    en_metaTitle,
  } = seo;

  const ogImages =
    images?.map((img) => {
      return {
        url: resolveUrl(img.path),
        width: img.width ?? 1200,
        height: img.height ?? 630,
        alt: img?.alt ?? 'Alghodwa preview image',
      };
    }) || [];

  const url = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
  const arUrl = `${process.env.NEXT_PUBLIC_APP_URL}/ar${pathname}`;

  return {
    en: {
      title: en_metaTitle ?? '',
      description: en_metaDescription ?? '',
      keywords: en_metaKeywords?.map((x) => x.text) ?? [],
      openGraph: {
        title: en_metaTitle ?? '',
        description: en_metaDescription ?? '',
        url: url,
        siteName: 'Alghodwa Group',
        images: ogImages,
        locale: 'en_US',
        type: 'website',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: url,
        languages: {
          'en-US': url,
          'ar-JO': arUrl,
        },
      },
    },
    ar: {
      title: ar_metaTitle ?? '',
      description: ar_metaDescription ?? '',
      keywords: ar_metaKeywords?.map((x) => x.text) ?? [],
      openGraph: {
        title: ar_metaTitle ?? '',
        description: ar_metaDescription ?? '',
        url: arUrl,
        siteName: 'مجموعة الغدوة',
        images: ogImages,
        locale: 'ar_JO',
        type: 'website',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: arUrl,
        languages: {
          'en-US': url,
          'ar-JO': arUrl,
        },
      },
    },
  };
};

export const generateLayoutBilingualSeo = (): Record<Lang, Metadata> => {
  return {
    en: {
      title: {
        default: 'Alghodwa Group',
        template: '%s | Alghodwa Group',
      },
    },
    ar: {
      title: {
        default: 'مجموعة الغدوة',
        template: '%s | مجموعة الغدوة',
      },
    },
  };
};
