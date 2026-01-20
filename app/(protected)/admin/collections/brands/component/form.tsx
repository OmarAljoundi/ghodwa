import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { BiSolidCategory } from 'react-icons/bi';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaRegFile } from 'react-icons/fa6';
import { EmptyState } from '@/components/empty-state';
import { SeoForm } from '@/components/seo-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SlugInput } from '@/components/ui/slug-input';
import { UploaderFormSingle } from '@/components/uploader/uploader-form-single';
import type { CategorySchema, CreateBrandSchema } from '@/schema';
import { ControlForm } from '../../../configuration/components/control-form';

export function BrandForm({
  lang,
  categories,
}: {
  lang: 'ar_' | 'en_';
  categories: Array<CategorySchema>;
}) {
  const { control } = useFormContext<CreateBrandSchema>();

  const title = lang === 'ar_' ? 'Arabic' : 'English';

  return (
    <div className="flex justify-start items-start gap-x-4">
      <div className="flex flex-col gap-4 flex-1 h-min">
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-x-2">
              <FormField
                control={control}
                name={`${lang}name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{title} name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} placeholder={`Enter ${title} Name`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`${lang}description`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{title} description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value as string}
                        placeholder={`Enter ${title} Description`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name={`slug`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <SlugInput
                      firstText="/brands/"
                      {...field}
                      value={field.value}
                      placeholder={`Enter Slug`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ControlForm showPage={false} />
            <h1 className="text-xl mb-4">Assign the categories</h1>
            <div className="flex flex-row flex-wrap gap-4">
              {categories.length === 0 && (
                <EmptyState
                  title="No categories found"
                  description="You need to create categories to assigned it here"
                  icons={[BiSolidCategory, FaRegFile, FaCloudUploadAlt]}
                  className="col-span-full max-w-full bg-input"
                />
              )}
              {categories.map((item) => (
                <FormField
                  key={`${item.id}-${item.en_name}`}
                  control={control}
                  name="categories"
                  render={({ field }) => {
                    const currentValue = field.value;

                    const isSelected =
                      Array.isArray(currentValue.connect) &&
                      currentValue.connect.some((val) => val?.id === item.id);

                    return (
                      <FormItem
                        key={item.id}
                        className="w-auto has-[[data-state=checked]]:bg-input relative flex  items-start gap-8 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                      >
                        <FormControl>
                          <Checkbox
                            id={`${item.id}-${item.en_name}`}
                            className="order-1 after:absolute after:inset-0"
                            onCheckedChange={(checked) => {
                              if (checked) {
                                const newConnect = [...currentValue.connect, { id: item.id }];
                                const newDisconnect = currentValue.disconnect.filter(
                                  (x) => x.id !== item.id,
                                );
                                field.onChange({
                                  connect: newConnect,
                                  disconnect: newDisconnect,
                                });
                              } else {
                                const newConnect = currentValue.connect.filter(
                                  (x) => x.id !== item.id,
                                );

                                const newDisconnect = [...currentValue.disconnect, { id: item.id }];

                                field.onChange({
                                  connect: newConnect,
                                  disconnect: newDisconnect,
                                });
                              }
                            }}
                            checked={isSelected}
                          />
                        </FormControl>
                        <div className="flex grow items-start gap-3">
                          {item?.image?.url && (
                            <Image
                              src={item?.image.url}
                              alt={'category'}
                              width={60}
                              height={60}
                              className="object-cover"
                            />
                          )}
                          <div className="grid gap-2">
                            <Label htmlFor={`${item.id}-${item.en_name}`}>{item.en_name}</Label>
                            <p
                              id={`${item.id}-${item.en_name}-description`}
                              className="text-xs text-muted-foreground"
                            >
                              {item.en_description ||
                                item.ar_description ||
                                'No description available'}
                            </p>
                          </div>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <SeoForm lang={lang} />
      </div>
      <Card className="max-w-72 ">
        <CardHeader>
          <CardTitle>Import your brand logo</CardTitle>
          <CardDescription>
            Add your amazing brand logo to encourage your customer more!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name={`logo`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <UploaderFormSingle defaultUploadedFile={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
