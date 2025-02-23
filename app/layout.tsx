import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { TooltipProvider } from "@/providers/tooltip-provider";
import "@/components/minimal-tiptap/styles/index.css";
import { cn } from "@/lib/utils";
import { monaSans, notoKufiArabic, notoSans } from "./fonts";
import { cookies, headers } from "next/headers";
import { dir } from "i18next";

export const metadata: Metadata = {
  title: "Ghodwa Site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = (await cookies())?.get("NEXT_LOCALE")?.value ?? "en";
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const finalLang = pathname && pathname?.includes("admin") ? "en" : lang;

  return (
    <html lang={finalLang} dir={dir(finalLang)}>
      <body
        className={cn(
          notoKufiArabic.variable,
          notoSans.variable,
          monaSans.variable
        )}
      >
        <Toaster richColors />
        <ReactQueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
