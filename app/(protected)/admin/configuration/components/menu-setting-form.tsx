"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Files, FileText, Link, Plus, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { EmptyState } from "@/components/empty-state";
import { SettingSchema } from "@/schema/setting-schema";

export function MenuSettingForm({ lang = "en_" }: { lang?: "ar_" | "en_" }) {
  const { control } = useFormContext<SettingSchema>();

  const { append, remove, fields, move } = useFieldArray({
    control: control,
    name: `menus.${lang}items`,
  });

  const appendNewEmpty = useCallback(() => {
    append({
      id: crypto.randomUUID(),
      title: "",
      url: "",
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu settings</CardTitle>
        <CardDescription>
          This will appear in the menu for the website
        </CardDescription>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="pt-2">
        {fields.length == 0 ? (
          <EmptyState
            title="No menus created"
            description="You can create new menu items to show it in your site header"
            className="max-w-full"
            icons={[FileText, Link, Files]}
            action={{
              label: "Create Menu",
              onClick: () => appendNewEmpty(),
            }}
          />
        ) : (
          <div className="gap-x-2 rounded-lg">
            <div>
              <Sortable
                uniqueId="id"
                value={fields}
                onMove={({ activeIndex, overIndex }) =>
                  move(activeIndex, overIndex)
                }
                overlay={
                  <div className="grid grid-cols-[5.5fr,5.5fr,auto,auto,auto] items-center gap-2">
                    <div className="h-8 w-full rounded-sm bg-primary/10" />
                    <div className="h-8 w-full rounded-sm bg-primary/10" />
                    <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                    <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                    <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                  </div>
                }
              >
                <div className="flex w-full flex-col gap-2">
                  {fields.map((field, index) => (
                    <SortableItem key={field.id} value={field.id} asChild>
                      <div className="mt-4 grid grid-cols-[5.5fr,5.5fr,auto,auto,auto] items-end gap-2">
                        <FormField
                          control={control}
                          name={`menus.${lang}items.${index}.title`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              {index == 0 && <FormLabel>Menu Title</FormLabel>}

                              <FormControl>
                                <Input {...field} placeholder="Menu title" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`menus.${lang}items.${index}.url`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              {index == 0 && <FormLabel>Menu Url</FormLabel>}

                              <FormControl ignoreDir={true}>
                                <Input {...field} placeholder="Menu url" />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-9 shrink-0"
                          onClick={() => appendNewEmpty()}
                        >
                          <Plus
                            className="size-4 text-primary"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Add</span>
                        </Button>

                        <SortableDragHandle
                          variant="outline"
                          size="icon"
                          className="size-9 shrink-0"
                        >
                          <DragHandleDots2Icon
                            className="size-4"
                            aria-hidden="true"
                          />
                        </SortableDragHandle>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-9 shrink-0"
                          onClick={() => remove(index)}
                        >
                          <TrashIcon
                            className="size-4 text-destructive"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </Sortable>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
