import initTranslations from "@/app/i18n";
import { Toaster } from "@/components/ui/sonner";
import TranslationsProvider from "@/providers/translations-provider";
import React from "react";
import Scroll from "@/providers/scroll";
import ClientProvider from "@/providers/client-provider";
import { Navigation } from "@/components/menu/navigation";
import { Footer } from "@/components/footer";
import { getBrands, getServices, getSettings } from "@/query";
import { BrandWithRelationsSchema } from "@/schema";
import { CustomDirectionProvider } from "@/providers/custom-direction-provider";
import { dir } from "i18next";

const i18nNamespaces = ["common", "errors"];

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const settings = await getSettings();
  const brands = await getBrands();
  const services = await getServices();
  return (
    <CustomDirectionProvider dir={dir(locale)}>
      <ClientProvider locale={locale}>
        <Scroll />

        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <div className="flex flex-grow flex-col lg:p-4 relative">
            <Navigation
              brands={brands as BrandWithRelationsSchema[]}
              services={services}
            />
            <main className="flex-grow">{children}</main>
            <Footer settings={settings} />
          </div>
        </TranslationsProvider>
        <Toaster richColors />
      </ClientProvider>
    </CustomDirectionProvider>
  );
}
