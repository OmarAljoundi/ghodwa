'use client';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { getServiceBySlug } from '@/query';
import { BlurFade } from '../ui/blur-fade';

export function ServiceDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getServiceBySlug>;
}) {
  const service = use(dataPromise);
  const { content, title } = useFilteredLanguageData(service);

  if (!service.is_published) return notFound();

  return (
    <article className="mx-auto">
      <BlurFade delay={0.3} blur="16px" inView direction="up">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
      </BlurFade>

      <BlurFade delay={0.75} blur="16px" inView direction="up" className="minimal-tiptap-editor">
        <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      </BlurFade>
    </article>
  );
}
