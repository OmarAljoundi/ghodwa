import { useTranslations } from 'next-intl';
import React from 'react';
import type { Model } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { ModelSchema } from '@/schema';
import { BlurFade } from '../ui/blur-fade';
import { Separator } from '../ui/separator';

export function ModelSpecifications({ currentModel }: { currentModel: Model }) {
  const { description, specification } = useFilteredLanguageData(currentModel);
  const filteredSpecification = useFilteredLanguageData(
    specification as ModelSchema['specification'],
  );

  const t = useTranslations();
  return (
    <React.Fragment>
      <BlurFade
        delay={0.1}
        direction={'left'}
        className="w-full text-black leading-5 minimal-tiptap-editor"
      >
        <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: description ?? '' }} />
      </BlurFade>

      <BlurFade delay={0.3} direction={'left'} className="flex justify-start  w-full">
        <h1 className="rounded-lg px-3 py-1  border-2 border-primary text-xl text-black font-bold">
          {t('Specifications')}
        </h1>
      </BlurFade>

      <BlurFade delay={0.5} direction={'left'} className="flex flex-col w-full space-y-3">
        {filteredSpecification.map((prop) => (
          <React.Fragment key={prop.id}>
            <div className="flex justify-between sm:justify-start gap-x-2">
              <h1 className="font-bold  lg:min-w-80">{prop.key}</h1>
              <h3>{prop.value}</h3>
            </div>
            <Separator className="first:hidden last:hidden bg-primary" />
          </React.Fragment>
        ))}
      </BlurFade>
    </React.Fragment>
  );
}
