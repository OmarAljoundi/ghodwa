"use client";

import { SettingSchema } from "@/schema/setting-schema";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadedFileOmit } from "@/lib/types";
import { UploaderFormSingle } from "@/components/uploader/uploader-form-single";
import { Textarea } from "@/components/ui/textarea";
import { CreatableTabs } from "@/components/ui/creatable-tabs";
import { closestCorners } from "@dnd-kit/core";

export default function HomeSettingsForm({
  lang = "ar_",
}: {
  lang?: "ar_" | "en_";
}) {
  const { control, setValue, watch } = useFormContext<SettingSchema>();
  const { append, remove } = useFieldArray({
    control,
    name: "home.homehero",
  });

  const watchFields = watch("home.homehero");

  const appendNewEmpty = () => {
    append({
      id: crypto.randomUUID(),
      ar_title: "",
      en_title: "",
      ar_subtitle: "",
      en_subtitle: "",
    });
  };

  const getButtonTitle = useCallback(
    (index: number) => {
      if (lang === "ar_")
        return (watchFields || [])[index]?.ar_title || `New Tab ${index + 1}`;

      return (watchFields || [])[index]?.en_title || `New Tab ${index + 1}`;
    },
    [lang, watchFields]
  );

  const title = lang == "ar_" ? "Arabic" : "English";
  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Home heros section</CardTitle>
          <CardDescription>
            This will appear in the home page (home hero section) for the
            website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <CreatableTabs
            uniqueId="id"
            orientation="horizontal"
            collisionDetection={closestCorners}
            value={watchFields || []}
            onValueChange={(e) => {
              setValue("home.homehero", e);
            }}
            buttonTitle={getButtonTitle}
            onAddNewTab={appendNewEmpty}
            onTabRemove={remove}
            overlay={<div className="size-full rounded-md bg-primary/10" />}
          >
            {(index) => (
              <div className="flex justify-between gap-x-4" key={index}>
                <div className="flex flex-col gap-y-2 flex-1">
                  <FormField
                    control={control}
                    name={`home.homehero.${index}.${lang}title`}
                    render={({ field }) => (
                      <FormItem className="h-max w-full">
                        <FormLabel>{title} title</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a title..."
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`home.homehero.${index}.${lang}subtitle`}
                    render={({ field }) => (
                      <FormItem className="h-max w-full">
                        <FormLabel>{title} subtitle</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a subtitle..."
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-grow flex flex-row gap-x-2 ">
                  <FormField
                    control={control}
                    name={`home.homehero.${index}.${lang}media`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        <FormItem>Desktop Image</FormItem>
                        <FormControl>
                          <UploaderFormSingle
                            defaultUploadedFile={
                              field.value as UploadedFileOmit
                            }
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`home.homehero.${index}.${lang}mobile_media`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        <FormItem>Mobile Image</FormItem>
                        <FormControl>
                          <UploaderFormSingle
                            defaultUploadedFile={
                              field.value as UploadedFileOmit
                            }
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </CreatableTabs>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Welcome section</CardTitle>
          <CardDescription>
            This will appear in the home page (Welcome section) for the website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <div className="flex flex-col gap-y-4">
            <FormField
              control={control}
              name={`home.welcomeSection.${lang}title`}
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
              name={`home.welcomeSection.${lang}subtitle`}
              render={({ field }) => (
                <FormItem className="h-max w-full">
                  <FormLabel>{title} sub title</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a sub-title..."
                      {...field}
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-x-4">
              <FormField
                control={control}
                name={`home.welcomeSection.callToAction.${lang}text`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>{title} call to action text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a call action text..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`home.welcomeSection.callToAction.url`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>Call to action url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a call action url..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>More section</CardTitle>
          <CardDescription>
            This will appear in the home page (More section) for the website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <div className="flex flex-col gap-y-4">
            <FormField
              control={control}
              name={`home.moreSection.${lang}title`}
              render={({ field }) => (
                <FormItem className="h-max w-full">
                  <FormLabel>{title} title</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Enter a title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`home.moreSection.${lang}subtitle`}
              render={({ field }) => (
                <FormItem className="h-max w-full">
                  <FormLabel>{title} sub title</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a sub-title..."
                      {...field}
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-x-4">
              <FormField
                control={control}
                name={`home.moreSection.callToAction.${lang}text`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>{title} call to action text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a call action text..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`home.moreSection.callToAction.url`}
                render={({ field }) => (
                  <FormItem className="h-max w-full">
                    <FormLabel>Call to action url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a call action url..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between gap-x-2">
              <FormField
                control={control}
                name={`home.moreSection.${lang}media`}
                render={({ field }) => (
                  <FormItem className="h-max flex-grow">
                    <FormLabel>Desktop background image</FormLabel>
                    <FormControl>
                      <UploaderFormSingle
                        defaultUploadedFile={field.value}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`home.moreSection.${lang}mobile_media`}
                render={({ field }) => (
                  <FormItem className="h-max flex-grow">
                    <FormLabel>Mobile background image</FormLabel>
                    <FormControl>
                      <UploaderFormSingle
                        defaultUploadedFile={field.value}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Latest news</CardTitle>
          <CardDescription>
            This will appear in the home page (Latest news section) for the
            website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <div className="flex flex-col gap-y-4">
            <FormField
              control={control}
              name={`home.latestNews.${lang}title`}
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
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Brands</CardTitle>
          <CardDescription>
            This will appear in the home page (brand section) for the website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <div className="flex flex-col gap-y-4">
            <FormField
              control={control}
              name={`home.brand.${lang}title`}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
