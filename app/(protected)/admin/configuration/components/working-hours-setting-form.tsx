"use client";
import { EmptyState } from "@/components/empty-state";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { SettingSchema } from "@/schema/setting-schema";
import { Files, FileText, Link, Plus, TrashIcon } from "lucide-react";
import React, { useCallback, useId } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Time } from "@internationalized/date";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
export function WorkingHoursSettingForm({
  lang = "ar_",
}: {
  lang?: "ar_" | "en_";
}) {
  const { control, watch } = useFormContext<SettingSchema>();

  const { append, remove, fields, move } = useFieldArray({
    control: control,
    name: `workingHours.items`,
  });

  const workingHoursItems = watch("workingHours.items");

  const appendNewEmpty = useCallback(() => {
    append({
      id: crypto.randomUUID(),
      ar_day: "",
      en_day: "",
      office: {
        state: "open",
        from: { hour: 8, minute: 0 },
        to: { hour: 17, minute: 0 },
      },
    });
  }, []);

  const isClosed = useCallback(
    (index: number) => {
      if (workingHoursItems[index].office.state == "closed") return true;

      return false;
    },
    [workingHoursItems]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Working hours</CardTitle>
        <CardDescription>
          This will appear in the Contact us (Working hours section) for the
          website
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
                  <div className="grid grid-cols-[4.5fr,1fr,2.75fr,2.75fr,auto,auto,auto] items-center gap-2">
                    <div className="h-8 w-full rounded-sm bg-primary/10" />
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
                      <div className="mt-4 grid grid-cols-[4.5fr,1fr,2.75fr,2.75fr,auto,auto,auto] items-end gap-2">
                        <FormField
                          control={control}
                          name={`workingHours.items.${index}.${lang}day`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              {index == 0 && <FormLabel>Day</FormLabel>}

                              <FormControl>
                                <Input {...field} placeholder="e.g Saturday" />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`workingHours.items.${index}.office.state`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              {index == 0 && <FormLabel>Open Status</FormLabel>}

                              <FormControl>
                                <IsOpen
                                  offText="Closed"
                                  onText="Opened"
                                  value={field.value == "open" ? true : false}
                                  onChange={(e) =>
                                    field.onChange(e ? "open" : "closed")
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`workingHours.items.${index}.office.from`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              {index == 0 && <FormLabel>From</FormLabel>}

                              <FormControl ignoreDir={true}>
                                <TimePicker
                                  label="From Opening Time"
                                  key={`officeFrom-${index}`}
                                  isDisabled={isClosed(index)}
                                  hourCycle={24}
                                  onChange={(w) =>
                                    field.onChange({
                                      hour: w?.hour,
                                      minute: w?.minute,
                                    })
                                  }
                                  value={
                                    new Time(
                                      field.value?.hour,
                                      field.value?.minute
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`workingHours.items.${index}.office.to`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              {index == 0 && <FormLabel>To</FormLabel>}

                              <FormControl ignoreDir={true}>
                                <TimePicker
                                  label="To Opening Time"
                                  key={`officeTo-${index}`}
                                  isDisabled={isClosed(index)}
                                  hourCycle={24}
                                  onChange={(w) =>
                                    field.onChange({
                                      hour: w?.hour,
                                      minute: w?.minute,
                                    })
                                  }
                                  value={
                                    new Time(
                                      field.value?.hour,
                                      field.value?.minute
                                    )
                                  }
                                />
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

function IsOpen({
  value,
  onChange,
  offText,
  onText,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  offText: string;
  onText: string;
}) {
  const id = useId();

  return (
    <div>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={value}
          onCheckedChange={onChange}
          className="peer absolute inset-0 h-[inherit] w-auto rounded-lg data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
        />
        <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
          <span className="text-[10px] font-medium uppercase">{offText}</span>
        </span>
        <span className="min-w-78flex pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
          <span className="text-[10px] font-medium uppercase">{onText}</span>
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Labeled switch
      </Label>
    </div>
  );
}
