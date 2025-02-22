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
import { SeoForm } from "@/components/seo-form";
import { SlugInput } from "@/components/ui/slug-input";
import { CreateNewsSchema } from "@/schema/news-schema";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/minimal-tiptap/editor";
import { cn } from "@/lib/utils";
import UploaderForm from "@/components/uploader/uploader-form";

export function NewsForm({ lang }: { lang: "ar_" | "en_" }) {
  const { control } = useFormContext<CreateNewsSchema>();

  const title = lang == "ar_" ? "Arabic" : "Engilsh";

  return (
    <div className="flex justify-start items-start gap-x-4">
      <div className="flex flex-col gap-4 flex-1 h-min">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-y-2">
              <FormField
                control={control}
                name={`${lang}title`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{title} title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        placeholder={`Enter ${title} Title`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`${lang}summary`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{title} short summary</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={6}
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
                  <FormLabel>{title} slug</FormLabel>
                  <FormControl>
                    <SlugInput
                      firstText="/news/"
                      {...field}
                      value={field.value}
                      placeholder={`Enter a slug`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        <Card className="flex-grow-0">
          <CardHeader>
            <CardTitle>Import your news images</CardTitle>
            <CardDescription>
              Add your amazing news image to encourage your customer more!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name={`image`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>News images</FormLabel>
                  <FormControl>
                    <UploaderForm
                      defaultUploadedFiles={field.value}
                      onChange={(e) => field.onChange(e)}
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
    </div>
  );
}
