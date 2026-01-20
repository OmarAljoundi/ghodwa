'use client';
import { useTranslations } from 'next-intl';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';

export function ContentDetails({
  ar_content,
  en_content,
  title,
}: {
  title: string;
  ar_content: string;
  en_content: string;
}) {
  const { content } = useFilteredLanguageData({ ar_content, en_content });
  const t = useTranslations();

  return (
    <article className="mx-auto animate-fade-in">
      <h1 className="text-4xl font-bold mb-4">{t(title)}</h1>

      <div className="minimal-tiptap-editor">
        <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      </div>
    </article>
  );
}
