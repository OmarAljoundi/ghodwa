'use client';

import { useAddInnerPage } from './inner-page';

export function InnerPageClient({ currentPage }: { currentPage: string }) {
  useAddInnerPage(currentPage);

  return null;
}
