import type { ReactNode } from 'react';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <RegisterBreadcrumbClient breadcrumb={{ href: '/our-brands', label: 'Our Brands' }} />
      {children}
    </>
  );
}
