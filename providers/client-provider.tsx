"use client";
import { monaSans, notoKufiArabic, notoSans } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { dir } from "i18next";
import React, { ReactNode, useEffect, useState } from "react";

export default function ClientProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={cn(
          "flex min-h-screen flex-col overflow-x-hidden antialiased",
          notoKufiArabic.variable,
          notoSans.variable,
          monaSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
