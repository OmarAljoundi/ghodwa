'use client';
import { DirectionProvider } from '@radix-ui/react-direction';
import type { ReactNode } from 'react';

export function CustomDirectionProvider({
  children,
  dir,
}: {
  children: ReactNode;
  dir: 'rtl' | 'ltr';
}) {
  return <DirectionProvider dir={dir}>{children}</DirectionProvider>;
}
