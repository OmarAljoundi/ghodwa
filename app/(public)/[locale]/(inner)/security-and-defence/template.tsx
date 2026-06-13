import type { ReactNode } from 'react';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <RegisterBreadcrumbClient
        breadcrumb={{ href: '/security-and-defence', label: 'Security and Defence' }}
      />
      {children}
    </>
  );
}
