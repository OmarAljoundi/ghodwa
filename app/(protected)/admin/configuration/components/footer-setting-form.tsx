"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React, { useCallback, useEffect, useId } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaBan, FaPhoneAlt } from "react-icons/fa";

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
import { closestCorners } from "@dnd-kit/core";
import { MAX_FOOTER_COLUMNS, SettingSchema } from "@/schema/setting-schema";
import { CreatableTabs } from "@/components/ui/creatable-tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/empty-state";
import { FaWhatsapp } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { Textarea } from "@/components/ui/textarea";

export function FooterSettingForm({ lang = "en_" }: { lang?: "ar_" | "en_" }) {
  const { control, watch, setValue } = useFormContext<SettingSchema>();

  const { append, remove } = useFieldArray({
    control: control,
    name: "footer.items",
  });

  const appendNewEmpty = useCallback(() => {
    append({
      columns: [{ ar_title: "", en_title: "", url: "" }],
      ar_group_title: "",
      en_group_title: "",
      id: crypto.randomUUID(),
    });
  }, []);

  const watchFields = watch("footer.items");

  const getButtonTitle = useCallback(
    (index: number) => {
      if (lang === "ar_")
        return watchFields[index]?.ar_group_title || `New Tab ${index + 1}`;

      return watchFields[index]?.en_group_title || `New Tab ${index + 1}`;
    },
    [lang, watchFields]
  );

  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Footer settings</CardTitle>
          <CardDescription>
            This will appear in the footer for the website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="pt-2">
          <div className="flex justify-between items-center gap-x-2 mb-2">
            <h1 className="text-xl">Footer Columns</h1>
          </div>

          <CreatableTabs
            uniqueId="id"
            orientation="horizontal"
            collisionDetection={closestCorners}
            value={watchFields || []}
            onValueChange={(e) => {
              setValue("footer.items", e);
            }}
            buttonTitle={getButtonTitle}
            onAddNewTab={appendNewEmpty}
            onTabRemove={remove}
            maxNumberOfTabs={MAX_FOOTER_COLUMNS}
            overlay={<div className="size-full rounded-md bg-primary/10" />}
          >
            {(activeTab) => (
              <ColumnFooterForm
                activeTab={activeTab}
                lang={lang}
                key={activeTab}
              />
            )}
          </CreatableTabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer settings</CardTitle>
          <CardDescription>
            This will appear in the footer (contact details) for the website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="pt-2">
          <ContactInfoForm lang={lang} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer settings</CardTitle>
          <CardDescription>
            This will appear in the footer (company details) for the website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="pt-2">
          <CompanyForm lang={lang} />
        </CardContent>
      </Card>
    </div>
  );
}

function ColumnFooterForm({
  activeTab,
  lang,
}: {
  activeTab: number;
  lang: "ar_" | "en_";
}) {
  const { control } = useFormContext<SettingSchema>();
  const title = lang == "ar_" ? "Arabic" : "Engilsh";

  const { fields, append, move, remove } = useFieldArray({
    control: control,
    name: `footer.items.${activeTab}.columns`,
  });

  const appendNewEmpty = useCallback(() => {
    append({
      ar_title: "",
      en_title: "",
      url: "",
    });
  }, []);

  return (
    <div
      className="border border-border p-6 rounded-lg gap-x-2"
      key={activeTab}
    >
      <div>
        <Sortable
          uniqueId="id"
          value={fields}
          onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
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
            <FormField
              control={control}
              name={`footer.items.${activeTab}.${lang}group_title`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{title} Group Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Group title" />
                  </FormControl>
                </FormItem>
              )}
            />
            {fields.map((field, index) => (
              <SortableItem key={field.id} value={field.id} asChild>
                <div className="grid grid-cols-[5.5fr,5.5fr,auto,auto,auto] items-center gap-2 mt-4">
                  <FormField
                    control={control}
                    name={`footer.items.${activeTab}.columns.${index}.${lang}title`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="Footer Title" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`footer.items.${activeTab}.columns.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="Footer Url" />
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
                    <Plus className="size-4 text-primary" aria-hidden="true" />
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
  );
}

function ContactInfoForm({ lang }: { lang: "ar_" | "en_" }) {
  const { control } = useFormContext<SettingSchema>();

  const { fields, append, move, remove } = useFieldArray({
    control: control,
    name: `footer.contactInfo`,
  });

  const appendNewEmpty = useCallback(() => {
    append({
      ar_title: "",
      en_title: "",
      number: "",
      showCall: true,
      showWhatsapp: true,
    });
  }, []);

  useEffect(() => {
    console.log("fields", fields);
  }, [fields]);

  return (
    <div className="border border-border p-6 rounded-lg gap-x-2">
      <div>
        {fields.length == 0 && (
          <EmptyState
            title="No contact info is created"
            description="You can create new contact items to show it in your site footer"
            className="max-w-full"
            icons={[FileText, Link, Files]}
            action={{
              label: "Create new contact",
              onClick: () => appendNewEmpty(),
            }}
          />
        )}
        <Sortable
          uniqueId="id"
          value={fields}
          onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
          overlay={
            <div className="grid grid-cols-[7fr,7fr,1fr,1fr,auto,auto,auto] items-center gap-2">
              <div className="h-8 w-full rounded-sm bg-primary/10" />
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
                <div className="grid grid-cols-[7fr,7fr,1fr,1fr,auto,auto,auto] items-center gap-2 mt-4">
                  <FormField
                    control={control}
                    name={`footer.contactInfo.${index}.${lang}title`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="Contact title" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`footer.contactInfo.${index}.number`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="Contact number" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`footer.contactInfo.${index}.showWhatsapp`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <ShowContact
                            OffIcon={FaBan}
                            OnIcon={FaPhoneAlt}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`footer.contactInfo.${index}.showCall`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <ShowContact
                            OffIcon={FaBan}
                            OnIcon={FaWhatsapp}
                            {...field}
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
                    <Plus className="size-4 text-primary" aria-hidden="true" />
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
  );
}

function CompanyForm({ lang }: { lang: "ar_" | "en_" }) {
  const { control } = useFormContext<SettingSchema>();

  const { fields, append, move, remove } = useFieldArray({
    control: control,
    name: `footer.company.details`,
  });

  const appendNewEmpty = useCallback(() => {
    append({
      email: "",
    });
  }, []);

  return (
    <div className="p-6 rounded-lg gap-x-2">
      <div className="flex flex-col gap-y-4">
        <FormField
          control={control}
          name={`footer.company.${lang}location`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Company Location</FormLabel>
              <FormControl>
                <Textarea rows={8} {...field} placeholder="Contact title" />
              </FormControl>
            </FormItem>
          )}
        />

        {fields.length == 0 && (
          <EmptyState
            title="No email info is created"
            description="You can create new email items to show it in your site footer"
            className="max-w-full"
            icons={[FileText, Link, Files]}
            action={{
              label: "Create new email",
              onClick: () => appendNewEmpty(),
            }}
          />
        )}
        <Sortable
          uniqueId="id"
          value={fields}
          onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
          overlay={
            <div className="grid grid-cols-[11fr,auto,auto,auto] items-center gap-2">
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
                <div className="grid grid-cols-[11fr,auto,auto,auto] items-center gap-2 mt-4">
                  <FormField
                    control={control}
                    name={`footer.company.details.${index}.email`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Please enter an email"
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
                    <Plus className="size-4 text-primary" aria-hidden="true" />
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
  );
}
function ShowContact({
  value,
  onChange,
  OffIcon,
  OnIcon,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  OffIcon: IconType;
  OnIcon: IconType;
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
          <span className="text-[10px] font-medium uppercase">
            <OffIcon className="size-6" />
          </span>
        </span>
        <span className="min-w-78flex pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
          <span className="text-[10px] font-medium uppercase">
            <OnIcon className="size-6" />
          </span>
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Labeled switch
      </Label>
    </div>
  );
}
