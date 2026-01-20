'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

export default function Scroll() {
  const pathname = usePathname();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <we need to scroll when the pathname changes>
  useEffect(() => {
    window.scroll({ behavior: 'instant', left: 0, top: 0 });
  }, [pathname]);

  return null;
}
