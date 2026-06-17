import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type React from 'react';
import { monaSans, notoKufiArabic, notoSans } from '@/app/fonts';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/menu/navigation';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { CustomDirectionProvider } from '@/providers/custom-direction-provider';
import { CustomNextIntlClientProvider } from '@/providers/custom-next-intl-client-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import Scroll from '@/providers/scroll';
import { TooltipProvider } from '@/providers/tooltip-provider';
import { getBrands, getSecurityDefenceBrands, getServices, getSettings } from '@/query';
import type { BrandWithRelationsSchema } from '@/schema';
import { generateLayoutBilingualSeo } from './generate-bilingual-seo';
import { SdBodyTheme } from './sd-body-theme';
import '../../globals.css';
export const viewport: Viewport = {
  themeColor: '#EFB14E',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'ar' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = generateLayoutBilingualSeo()[locale];

  return dictionary;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isArabic = locale === 'ar';
  setRequestLocale(locale);
  const messages = await getMessages();

  // Detect the Security & Defence namespace from the request path (set by the
  // proxy) so we can paint the <body> beige/olive on the first server render —
  // no gray flash before hydration.
  const currentPath = (await headers()).get('x-current-path') ?? '';
  const pathWithoutLocale = currentPath.replace(/^\/(en|ar|de)(?=\/|$)/, '');
  const isSecurityDefence = pathWithoutLocale.startsWith('/security-and-defence');

  const [settings, brands, services, securityDefenceBrands] = await Promise.all([
    getSettings(),
    getBrands(),
    getServices(),
    getSecurityDefenceBrands(),
  ]);

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'}>
      <body
        className={cn(
          notoKufiArabic.variable,
          notoSans.variable,
          monaSans.variable,
          isSecurityDefence && 'sd-theme',
        )}
      >
        <CustomNextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>
            <CustomDirectionProvider dir={isArabic ? 'rtl' : 'ltr'}>
              <TooltipProvider>
                <Scroll />
                <SdBodyTheme />

                <div className="flex flex-grow flex-col lg:p-4 relative">
                  <Navigation
                    settings={settings}
                    brands={brands as unknown as BrandWithRelationsSchema[]}
                    securityDefenceBrands={
                      securityDefenceBrands as unknown as BrandWithRelationsSchema[]
                    }
                    services={services}
                  />
                  <main className="flex-grow">{children}</main>
                  <Footer
                    settings={settings}
                    brands={brands as unknown as BrandWithRelationsSchema[]}
                    securityDefenceBrands={
                      securityDefenceBrands as unknown as BrandWithRelationsSchema[]
                    }
                    services={services}
                  />
                </div>
                <Toaster richColors />
              </TooltipProvider>
            </CustomDirectionProvider>
          </ReactQueryProvider>
        </CustomNextIntlClientProvider>
      </body>
    </html>
  );
}
