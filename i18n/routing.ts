import { defineRouting } from 'next-intl/routing';

export const SUPPORTED_LOCALES = ['en', 'ar', 'de'] as const;
export const SUPPORTED_LOCALES_MAP = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Germany',
    value: 'de',
  },
  {
    label: 'Arabic',
    value: 'ar',
  },
] as const;

export const SUPPORTED_LOCALES_HASH = {
  en: 'English',
  de: 'Germany',
  ar: 'Arabic',
} as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always',
});
