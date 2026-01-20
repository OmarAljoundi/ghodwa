'use client';
import { useAddInnerPage } from './inner-page';

export default function RegisterInnerPageClient({ title }: { title: string }) {
  useAddInnerPage(title);
  return null;
}
