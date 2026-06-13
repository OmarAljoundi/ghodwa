'use client';

import { ImageIcon, Type } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { UploaderFormSingle } from '@/components/uploader/uploader-form-single';
import type { SettingSchema } from '@/schema/setting-schema';

export function SecurityDefenceSettingForm({ lang = 'ar_' }: { lang?: 'ar_' | 'en_' }) {
  const { control } = useFormContext<SettingSchema>();
  const title = lang === 'ar_' ? 'Arabic' : 'English';
  const isRtl = lang === 'ar_';

  return (
    <div className="flex flex-col gap-y-4">
      {/* Intro: image + title + description */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Intro section</CardTitle>
          <CardDescription>
            The introduction block at the top of the Security &amp; Defence landing page (image +
            title + description).
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Text column */}
            <div className="flex flex-col gap-y-4 lg:col-span-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Type className="h-4 w-4" />
                <span>Headline &amp; copy</span>
              </div>
              <FormField
                control={control}
                name={`securityDefence.intro.${lang}title`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>{title} title</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        dir={isRtl ? 'rtl' : 'ltr'}
                        placeholder="Enter a title..."
                        className="resize-none text-base font-medium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`securityDefence.intro.${lang}description`}
                render={({ field }) => (
                  <FormItem className="flex h-full flex-col">
                    <FormLabel>{title} description</FormLabel>
                    <FormControl>
                      <Textarea
                        dir={isRtl ? 'rtl' : 'ltr'}
                        placeholder="Enter a description..."
                        className="min-h-[160px] flex-1 resize-none leading-relaxed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image column */}
            <div className="lg:col-span-2">
              <FormField
                control={control}
                name={`securityDefence.intro.${lang}media`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <div className="flex items-center justify-between">
                      <FormLabel className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        {title} intro image
                      </FormLabel>
                      <span className="text-[11px] text-muted-foreground">Wide · 16:9</span>
                    </div>
                    <FormControl>
                      <div className="rounded-xl border border-dashed bg-muted/30 p-3">
                        <UploaderFormSingle defaultUploadedFile={field.value} {...field} />
                      </div>
                    </FormControl>
                    <p className="text-[11px] text-muted-foreground">
                      Shown at the top of the landing page. PNG or JPG, up to 4&nbsp;MB.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products grid heading (brand cards are derived from Brand Type = security_defence) */}
      <Card>
        <CardHeader>
          <CardTitle>Products section</CardTitle>
          <CardDescription>
            Heading above the products grid. The brand cards themselves are pulled automatically
            from brands whose Type is &quot;Security and defence&quot;.
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="pt-2">
          <FormField
            control={control}
            name={`securityDefence.productsHeading.${lang}title`}
            render={({ field }) => (
              <FormItem className="h-max w-full">
                <FormLabel>{title} title</FormLabel>
                <FormControl>
                  <Input placeholder="Security and defence products" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Services block: wide image + title + description + CTA */}
      <Card>
        <CardHeader>
          <CardTitle>Services section</CardTitle>
          <CardDescription>
            The wide services banner near the bottom of the landing page (image + title +
            description + call to action).
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="pt-2">
          <div className="flex flex-col gap-y-4">
            <FormField
              control={control}
              name={`securityDefence.services.${lang}title`}
              render={({ field }) => (
                <FormItem className="h-max w-full">
                  <FormLabel>{title} title</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Enter a title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`securityDefence.services.${lang}subtitle`}
              render={({ field }) => (
                <FormItem className="h-max w-full">
                  <FormLabel>{title} sub title</FormLabel>
                  <FormControl>
                    <Textarea rows={8} placeholder="Enter a sub-title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-x-4">
              <FormField
                control={control}
                name={`securityDefence.services.callToAction.${lang}text`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>{title} call to action text</FormLabel>
                    <FormControl>
                      <Input placeholder="Book a service request" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`securityDefence.services.callToAction.url`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>Call to action url</FormLabel>
                    <FormControl>
                      <Input placeholder="/contact-us" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between gap-x-2">
              <FormField
                control={control}
                name={`securityDefence.services.${lang}media`}
                render={({ field }) => (
                  <FormItem className="h-max flex-grow">
                    <FormLabel>Desktop background image</FormLabel>
                    <FormControl>
                      <UploaderFormSingle defaultUploadedFile={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`securityDefence.services.${lang}mobile_media`}
                render={({ field }) => (
                  <FormItem className="h-max flex-grow">
                    <FormLabel>Mobile background image</FormLabel>
                    <FormControl>
                      <UploaderFormSingle defaultUploadedFile={field.value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
