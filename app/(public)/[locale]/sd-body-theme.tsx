'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

/**
 * Applies the Security & Defence palette to the document <body> while on SD
 * routes, and removes it on navigation away. Painting the body (rather than an
 * inner wrapper) guarantees the beige covers the whole page with no gray gaps.
 */
export function SdBodyTheme() {
  const pathname = usePathname();
  const isSecurityDefence = pathname.startsWith('/security-and-defence');

  useEffect(() => {
    const body = document.body;
    // The global `body { @apply bg-background }` rule already paints the body;
    // toggling `.sd-theme` just re-points --background (and the rest) to beige/olive.
    if (isSecurityDefence) {
      body.classList.add('sd-theme');
    } else {
      body.classList.remove('sd-theme');
    }
    return () => {
      body.classList.remove('sd-theme');
    };
  }, [isSecurityDefence]);

  return null;
}
