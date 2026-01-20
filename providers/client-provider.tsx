'use client';
import { type ReactNode, useEffect, useState } from 'react';
import { monaSans, notoKufiArabic, notoSans } from '@/app/fonts';
import { cn } from '@/lib/utils';

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

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={dir}>
      <body
        className={cn(
          'flex min-h-screen flex-col overflow-x-hidden antialiased',
          notoKufiArabic.variable,
          notoSans.variable,
          monaSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
