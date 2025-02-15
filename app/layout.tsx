import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { TooltipProvider } from "@/providers/tooltip-provider";
import { cn } from "@/lib/utils";
import { monaSans, notoKufiArabic, notoSans } from "./fonts";

export const metadata: Metadata = {
  title: "Ghodwa Site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
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
