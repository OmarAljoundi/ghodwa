"use client";
import RichTextEditor from "@/components/minimal-tiptap/editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SettingSchema } from "@/schema/setting-schema";
import React from "react";
import { useFormContext } from "react-hook-form";

export function MissionVisionSettingForm({
  lang = "ar_",
}: {
  lang?: "ar_" | "en_";
}) {
  const { control } = useFormContext<SettingSchema>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mission and vision section</CardTitle>
        <CardDescription>
          This will appear in the alghodwa (Mission and vision section) for the
          website
        </CardDescription>
      </CardHeader>
      <Separator className="my-2" />

      <CardContent className="pt-2">
        <div className="flex flex-col gap-y-4">
          <FormField
            control={control}
            name={`missionVision.${lang}content`}
            render={({ field }) => (
              <FormItem className="h-max w-full">
                <FormLabel>Content</FormLabel>
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
        </div>
      </CardContent>
    </Card>
  );
}
