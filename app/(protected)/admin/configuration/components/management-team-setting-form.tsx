"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreatableTabs } from "@/components/ui/creatable-tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UploaderFormSingle } from "@/components/uploader/uploader-form-single";
import { SettingSchema } from "@/schema/setting-schema";
import { closestCorners } from "@dnd-kit/core";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function ManagementTeamSettingForm({
  lang = "ar_",
}: {
  lang?: "ar_" | "en_";
}) {
  const { control, setValue, watch } = useFormContext<SettingSchema>();
  const title = lang == "ar_" ? "Arabic" : "Engilsh";

  const watchFields = watch("managementTeam.team");

  const { append, remove } = useFieldArray({
    control: control,
    name: "managementTeam.team",
  });

  const getButtonTitle = useCallback(
    (index: number) => {
      if (lang === "ar_")
        return watchFields[index]?.ar_name || `New Tab ${index + 1}`;

      return watchFields[index]?.en_name || `New Tab ${index + 1}`;
    },
    [lang, watchFields]
  );

  const appendNewEmpty = useCallback(() => {
    append({
      ar_jobTitle: "",
      ar_name: "",
      contactNumber: "",
      en_jobTitle: "",
      en_name: "",
      ar_summary: "",
      en_summary: "",
      id: crypto.randomUUID(),
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Management Team settings</CardTitle>
        <CardDescription>
          This will appear in the alghodwa (Management Team section) for the
          website
        </CardDescription>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="pt-2">
        <FormField
          control={control}
          name={`managementTeam.${lang}title`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{title} title of the page </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Meet the leadership team" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`managementTeam.${lang}badgeTitle`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{title} Badge title </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Our expert crew" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center gap-x-2 mb-2">
          <h1 className="text-xl">Team members</h1>
        </div>

        <CreatableTabs
          uniqueId="id"
          orientation="horizontal"
          collisionDetection={closestCorners}
          value={watchFields || []}
          onValueChange={(e) => {
            setValue("managementTeam.team", e);
          }}
          buttonTitle={getButtonTitle}
          onAddNewTab={appendNewEmpty}
          onTabRemove={remove}
          overlay={<div className="size-full rounded-md bg-primary/10" />}
        >
          {(activeTab) => (
            <TeamColumn activeTab={activeTab} lang={lang} key={activeTab} />
          )}
        </CreatableTabs>
      </CardContent>
    </Card>
  );
}

function TeamColumn({
  activeTab,
  lang,
}: {
  activeTab: number;
  lang: "ar_" | "en_";
}) {
  const { control } = useFormContext<SettingSchema>();
  const title = lang == "ar_" ? "Arabic" : "Engilsh";

  return (
    <div className="border border-border flex flex-row p-6 rounded-lg gap-x-6">
      <div className="flex w-full flex-col ">
        <FormField
          control={control}
          name={`managementTeam.team.${activeTab}.${lang}name`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{title} member name </FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`managementTeam.team.${activeTab}.${lang}jobTitle`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{title} job title </FormLabel>

              <FormControl>
                <Input {...field} placeholder="Executive Director" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`managementTeam.team.${activeTab}.contactNumber`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Contact number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+9627xxxxxx" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`managementTeam.team.${activeTab}.${lang}summary`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{title} summary</FormLabel>
              <FormControl>
                <Textarea
                  rows={9}
                  {...field}
                  placeholder="A brief description about the member"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-72">
        <FormField
          control={control}
          name={`managementTeam.team.${activeTab}.media`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Member image</FormLabel>
              <FormControl>
                <UploaderFormSingle
                  defaultUploadedFile={field.value ?? undefined}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
