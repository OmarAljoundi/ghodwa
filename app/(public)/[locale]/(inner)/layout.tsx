import type { ReactNode } from 'react';
import React from 'react';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';
import { InnerShell } from './inner-shell';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <React.Fragment key="layout">
      <RegisterBreadcrumbClient breadcrumb={{ href: '/', label: 'Home' }} />

      <InnerShell>{children}</InnerShell>
    </React.Fragment>
  );
}
