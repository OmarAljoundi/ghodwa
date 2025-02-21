import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploaderFormSingle } from "@/components/uploader/uploader-form-single";
import { SeoForm } from "@/components/seo-form";
import { SlugInput } from "@/components/ui/slug-input";
import { CreateServiceSchema } from "@/schema/service-schema";
import RichTextEditor from "@/components/minimal-tiptap/editor";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export function ServiceForm({ lang }: { lang: "ar_" | "en_" }) {
  const { control } = useFormContext<CreateServiceSchema>();

  const title = lang == "ar_" ? "Arabic" : "Engilsh";

  return (
    <div className="flex justify-start items-start gap-x-4">
      <div className="flex flex-col gap-4 flex-1 h-min">
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-x-2">
              <FormField
                control={control}
                name={`${lang}title`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{title} title</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value}
                        rows={4}
                        placeholder={`Enter ${title} title`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`slug`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{title} name</FormLabel>
                    <FormControl>
                      <SlugInput
                        firstText="/services/"
                        {...field}
                        value={field.value}
                        placeholder={`Enter Slug`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name={`${lang}content`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{title} content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      isRtL={lang == "ar_" ? true : false}
                      throttleDelay={0}
                      className={cn("h-full min-h-56 w-full rounded-xl")}
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
          </CardContent>
        </Card>
        <SeoForm lang={lang} />
      </div>
      <div className="flex flex-col gap-y-4">
        <Card className="max-w-72">
          <CardHeader>
            <CardTitle>Import your Service image</CardTitle>
            <CardDescription>
              Add your amazing Service image to encourage your customer more!
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
                      defaultUploadedFile={field.value ?? undefined}
                      onChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card className="max-w-72 ">
          <CardHeader>
            <CardTitle>Import your Service icon</CardTitle>
            <CardDescription>
              Add your amazing Service icon to encourage your customer more!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name={`${lang}icon`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <UploaderFormSingle
                      defaultUploadedFile={field.value ?? undefined}
                      onChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
