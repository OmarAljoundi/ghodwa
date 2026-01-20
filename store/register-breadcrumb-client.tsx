'use client';
import { type Breadcrumb, useAddBreadcrumb } from './bread-crumb-store';

export default function RegisterBreadcrumbClient({ breadcrumb }: { breadcrumb: Breadcrumb }) {
  useAddBreadcrumb(breadcrumb);
  return null;
}
