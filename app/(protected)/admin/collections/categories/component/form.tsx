import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateCategorySchema } from "@/schema";
import { UploaderFormSingle } from "@/components/uploader/uploader-form-single";
import { SeoForm } from "@/components/seo-form";
import { SlugInput } from "@/components/ui/slug-input";

export function CategoryForm({ lang }: { lang: "ar_" | "en_" }) {
  const { control } = useFormContext<CreateCategorySchema>();

  const title = lang == "ar_" ? "Arabic" : "Engilsh";

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
                      <Input
                        {...field}
                        value={field.value}
                        placeholder={`Enter ${title} Name`}
                      />
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
                  <FormLabel>{title} name</FormLabel>
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
          </CardContent>
        </Card>
        <SeoForm lang={lang} />
      </div>

      <Card className="max-w-72 ">
        <CardHeader>
          <CardTitle>Import your category image</CardTitle>
          <CardDescription>
            Add your amazing category image to encourage your customer more!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name={`image`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <UploaderFormSingle
                    defaultUploadedFile={field.value}
                    onChange={field.onChange}
                  />
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
