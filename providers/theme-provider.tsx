'use client';

const NextThemesProvider = dynamic(() => import('next-themes').then((e) => e.ThemeProvider), {
  ssr: false,
  loading: () => <h1>Loading..</h1>,
});

import dynamic from 'next/dynamic';
import type { ThemeProviderProps } from 'next-themes';

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
