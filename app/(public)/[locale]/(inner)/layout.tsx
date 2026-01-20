import type { ReactNode } from 'react';
import React from 'react';
import RegisterBreadcrumbClient from '@/store/register-breadcrumb-client';
import InnerPageTitle from './inner-page-title';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <React.Fragment key="layout">
      <RegisterBreadcrumbClient breadcrumb={{ href: '/', label: 'Home' }} />

      <div className="inner-gradient-background h-48 lg:h-80  lg:rounded-3xl">
        <InnerPageTitle />
      </div>
      <main className="container mx-auto mt-8 mb-6 lg:mb-12">{children}</main>
    </React.Fragment>
  );
}
