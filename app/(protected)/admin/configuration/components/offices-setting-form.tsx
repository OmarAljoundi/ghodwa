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
import { SettingSchema } from "@/schema/setting-schema";
import { closestCorners } from "@dnd-kit/core";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function OfficesSettingForm({ lang = "ar_" }: { lang?: "ar_" | "en_" }) {
  const { control, setValue, watch } = useFormContext<SettingSchema>();

  const { append, remove } = useFieldArray({
    control: control,
    name: "offices.items",
  });

  const appendNewEmpty = useCallback(() => {
    append({
      ar_address: "",
      ar_city: "",
      ar_country: "",
      contactNumber: "",
      en_address: "",
      en_city: "",
      en_country: "",
      id: crypto.randomUUID(),
    });
  }, []);

  const watchFields = watch("offices.items");

  const getButtonTitle = useCallback(
    (index: number) => {
      if (lang === "ar_")
        return watchFields[index]?.ar_country || `New Tab ${index + 1}`;

      return watchFields[index]?.en_country || `New Tab ${index + 1}`;
    },
    [lang, watchFields]
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Offices Setting</CardTitle>
        <CardDescription>
          This will appear in the contact us (Offices section) for the website
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
            setValue("offices.items", e);
          }}
          buttonTitle={getButtonTitle}
          onAddNewTab={appendNewEmpty}
          onTabRemove={remove}
          maxNumberOfTabs={3}
          overlay={<div className="size-full rounded-md bg-primary/10" />}
        >
          {(activeTab) => (
            <OfficeItem activeTab={activeTab} lang={lang} key={activeTab} />
          )}
        </CreatableTabs>
      </CardContent>
    </Card>
  );
}

function OfficeItem({
  activeTab,
  lang,
}: {
  activeTab: number;
  lang: "ar_" | "en_";
}) {
  const { control } = useFormContext<SettingSchema>();

  return (
    <div className="flex flex-col items-center mt-4">
      <FormField
        control={control}
        name={`offices.items.${activeTab}.${lang}country`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g United States" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`offices.items.${activeTab}.${lang}city`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g New York" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`offices.items.${activeTab}.contactNumber`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Contact Number</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g +44 20 7123 4567" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`offices.items.${activeTab}.${lang}address`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Textarea
                rows={6}
                {...field}
                placeholder="e.g 123 Broadway, 5th Floor, Suite 500, Financial District, New York, NY 10001"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
