'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBreadcrumbStore } from '@/store/bread-crumb-store';

export default function InnerPageBreadcrumb() {
  const { breadcrumbs } = useBreadcrumbStore();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  const shouldShowDropdown =
    (isSmallScreen && breadcrumbs.length > 3) || (!isSmallScreen && breadcrumbs.length > 5);

  let visibleBreadcrumbs = breadcrumbs;
  let dropdownBreadcrumbs: typeof breadcrumbs = [];

  if (isSmallScreen && breadcrumbs.length > 3) {
    visibleBreadcrumbs = [breadcrumbs[0]!, breadcrumbs[breadcrumbs.length - 1]!];
    dropdownBreadcrumbs = breadcrumbs.slice(1, -1);
  } else if (!isSmallScreen && breadcrumbs.length > 5) {
    visibleBreadcrumbs = [
      breadcrumbs[0]!,
      breadcrumbs[breadcrumbs.length - 2]!,
      breadcrumbs[breadcrumbs.length - 1]!,
    ];
    dropdownBreadcrumbs = breadcrumbs.slice(1, -2);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="rounded-lg border border-border  px-3 py-0.5 lg:py-2 shadow-sm shadow-black/5">
        {visibleBreadcrumbs.slice(0, -1).map((breadcrumb, index) => (
          <React.Fragment key={`${breadcrumb.href}-${index}`}>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="transition-colors text-white hover:text-brand-primary-300"
                href={breadcrumb.href}
              >
                {t(breadcrumb.label)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {!shouldShowDropdown && index < visibleBreadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <GoDotFill className="animate-pulse size-3 flex-shrink-0" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}

        {shouldShowDropdown && dropdownBreadcrumbs.length > 0 && (
          <React.Fragment key="dropdown-section">
            <BreadcrumbSeparator>
              <GoDotFill className="animate-pulse size-3 flex-shrink-0" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-foreground">
                  <BreadcrumbEllipsis />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {dropdownBreadcrumbs.map((breadcrumb, index) => (
                    <DropdownMenuItem key={`${breadcrumb.href}-${index}-sub-menu`} asChild>
                      <Link href={breadcrumb.href}>{t(breadcrumb.label)}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <GoDotFill className="animate-pulse size-3 flex-shrink-0" />
            </BreadcrumbSeparator>
          </React.Fragment>
        )}

        {visibleBreadcrumbs.length > 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">
              {t(visibleBreadcrumbs[visibleBreadcrumbs.length - 1]?.label ?? '')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
