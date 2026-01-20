'use client';
import { closestCorners } from '@dnd-kit/core';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import RichTextEditor from '@/components/minimal-tiptap/editor';
import { SeoForm } from '@/components/seo-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckboxCard } from '@/components/ui/checkbox-card';
import { CreatableTabs } from '@/components/ui/creatable-tabs';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SlugInput } from '@/components/ui/slug-input';
import { cn } from '@/lib/utils';
import type { SettingSchema } from '@/schema/setting-schema';

export function ExtraAboutContentForm({ lang = 'ar_' }: { lang?: 'ar_' | 'en_' }) {
  const { control, setValue, watch } = useFormContext<SettingSchema>();
  const { append, remove } = useFieldArray({
    control,
    name: 'extraAboutPages',
  });

  const watchFields = watch('extraAboutPages');

  const appendNewEmpty = () => {
    append({
      id: crypto.randomUUID(),
      ar_title: '',
      en_title: '',
      ar_content: '',
      en_content: '',
      slug: '',
      seo: { ar_metaKeywords: [], en_metaKeywords: [] },
      showOnFooter: true,
      showOnMenu: true,
      showPage: true,
    });
  };

  const getButtonTitle = useCallback(
    (index: number) => {
      if (lang === 'ar_') return (watchFields || [])[index]?.ar_title || `New Tab ${index + 1}`;

      return (watchFields || [])[index]?.en_title || `New Tab ${index + 1}`;
    },
    [lang, watchFields],
  );

  const title = lang === 'ar_' ? 'Arabic' : 'English';
  return (
    <Card>
      <CardHeader>
        <CardTitle>Extra About us pages</CardTitle>
        <CardDescription>
          This will appear in the (about al ghodwa pages) for the website
        </CardDescription>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="pt-2 mb-10">
        <CreatableTabs
          uniqueId="id"
          orientation="horizontal"
          collisionDetection={closestCorners}
          value={watchFields || []}
          onValueChange={(e) => {
            setValue('extraAboutPages', e);
          }}
          buttonTitle={getButtonTitle}
          onAddNewTab={appendNewEmpty}
          onTabRemove={remove}
          overlay={<div className="size-full rounded-md bg-primary/10" />}
        >
          {(index) => (
            <div className="flex flex-col  flex-1" key={index}>
              <FormField
                control={control}
                name={`extraAboutPages.${index}.${lang}title`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>{title} title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`extraAboutPages.${index}.slug`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <SlugInput firstText="/content/" placeholder="Enter a slug..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-x-2">
                <FormField
                  control={control}
                  name={`extraAboutPages.${index}.showPage`}
                  render={({ field }) => (
                    <FormItem className="h-max w-full">
                      <FormControl>
                        <CheckboxCard
                          title="Show the page"
                          desc="Control if you want to show the page or hide it"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`extraAboutPages.${index}.showOnFooter`}
                  render={({ field }) => (
                    <FormItem className="h-max w-full">
                      <FormControl>
                        <CheckboxCard
                          title="Show on Footer"
                          desc="Control if you want to show it on the footer or hide it"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`extraAboutPages.${index}.showOnMenu`}
                  render={({ field }) => (
                    <FormItem className="h-max w-full">
                      <FormControl>
                        <CheckboxCard
                          title="Show on menu"
                          desc="Control if you want to show it on the menu or hide it"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name={`extraAboutPages.${index}.${lang}content`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>{title} content</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        isRtL={lang === 'ar_'}
                        throttleDelay={0}
                        className={cn('h-full min-h-56 w-full rounded-xl')}
                        editorContentClassName="overflow-auto h-full"
                        placeholder="This is your placeholder..."
                        editable={true}
                        output="html"
                        editorClassName="focus:outline-none px-5 py-4 h-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SeoForm lang={lang} prefiex={`extraAboutPages.${index}`} />
            </div>
          )}
        </CreatableTabs>
      </CardContent>
    </Card>
  );
}
