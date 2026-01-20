'use client';

import { type Tag, TagInput } from 'emblor';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function SeoForm({
  lang,
  prefiex,
  ...rest
}: {
  lang: 'ar_' | 'en_';
  prefiex?: string;
  title?: string;
  description?: string;
}) {
  const title = rest.title || 'Configure SEO for this page';
  const description = rest.description || 'Here you can configure the seo for this page!';
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <SeoFormInputs lang={lang} prefiex={prefiex} />
      </CardContent>
    </Card>
  );
}

export function SeoFormInputs({ lang, prefiex = '' }: { lang: 'ar_' | 'en_'; prefiex?: string }) {
  const title = lang === 'ar_' ? 'Arabic' : 'English';
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(null);
  const { control } = useFormContext();

  const controlPrefix = prefiex ? `${prefiex}.seo` : 'seo';

  return (
    <div className="px-2">
      <FormField
        control={control}
        name={`${controlPrefix}.${lang}metaTitle`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{title} Meta Title</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ''} placeholder={`Enter a ${title} Title`} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${controlPrefix}.${lang}metaKeywords`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{title} Meta Keywords</FormLabel>
            <FormControl>
              <TagInput
                maxTags={5}
                setTags={field.onChange}
                tags={(field.value as Tag[]) ?? []}
                activeTagIndex={activeTagIndex}
                setActiveTagIndex={setActiveTagIndex}
                styleClasses={{
                  inlineTagsContainer: 'bg-input',
                }}
                placeholder={`Enter a ${title} Meta Keywords`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${controlPrefix}.${lang}metaDescription`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{title} Meta Description</FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                {...field}
                value={field.value ?? ''}
                placeholder={`Enter a ${title} Meta Description`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
