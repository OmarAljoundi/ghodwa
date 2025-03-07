import initTranslations from "@/app/i18n";
import { Toaster } from "@/components/ui/sonner";
import TranslationsProvider from "@/providers/translations-provider";
import React from "react";
import Scroll from "@/providers/scroll";
import { Navigation } from "@/components/menu/navigation";
import { Footer } from "@/components/footer";
import { getBrands, getServices, getSettings } from "@/query";
import { BrandWithRelationsSchema } from "@/schema";
import { CustomDirectionProvider } from "@/providers/custom-direction-provider";
import { dir } from "i18next";
import { Metadata, Viewport } from "next";
import { generateLayoutBilingualSeo } from "./generate-bilingual-seo";

const i18nNamespaces = ["common", "errors"];

export const viewport: Viewport = {
  themeColor: "#EFB14E",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
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
  const { resources } = await initTranslations(locale, i18nNamespaces);

  const [settings, brands, services] = await Promise.all([
    getSettings(),
    getBrands(),
    getServices(),
  ]);

  return (
    <CustomDirectionProvider dir={dir(locale)}>
      <Scroll />

      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <div className="flex flex-grow flex-col lg:p-4 relative">
          <Navigation
            settings={settings}
            brands={brands as unknown as BrandWithRelationsSchema[]}
            services={services}
          />
          <main className="flex-grow">{children}</main>
          <Footer
            settings={settings}
            brands={brands as unknown as BrandWithRelationsSchema[]}
            services={services}
          />
        </div>
      </TranslationsProvider>
      <Toaster richColors />
    </CustomDirectionProvider>
  );
}
