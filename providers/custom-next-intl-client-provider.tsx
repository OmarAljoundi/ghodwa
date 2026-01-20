'use client';
import { NextIntlClientProvider } from 'next-intl';
import type React from 'react';

export function CustomNextIntlClientProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  function onError(error: any) {
    if (error.code === 'MISSING_MESSAGE') return;
    console.error(error);
  }

  return (
    <NextIntlClientProvider onError={onError} locale={locale} messages={messages} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
}
