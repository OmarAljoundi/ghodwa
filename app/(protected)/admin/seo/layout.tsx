import type { ReactNode } from 'react';
import ContentWrapper from '@/components/admin-panel/contet-wrapper';
import { ConfigurationMenu } from './components/configuration-menu';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: 'Dashboard', url: '/admin' },
        { item: 'Seo', currentPage: true },
      ]}
    >
      <ConfigurationMenu>{children}</ConfigurationMenu>
    </ContentWrapper>
  );
}
