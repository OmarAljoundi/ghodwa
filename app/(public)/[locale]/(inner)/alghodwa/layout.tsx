import type { ReactNode } from 'react';
import { getSettings } from '@/query';
import { AlghodwaPagesSitemap } from './components/alghodwa-pages-sitemap';

export default async function Layout({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  return (
    <div className="grid grid-cols-[12fr] lg:grid-cols-[3fr,9fr] gap-8">
      <AlghodwaPagesSitemap className="hidden lg:block" settings={settings} />
      {children}
    </div>
  );
}
