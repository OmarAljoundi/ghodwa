import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandWithRelationsSchema, CreateModelSchema } from "@/schema";
import { SeoForm } from "@/components/seo-form";
import { SlugInput } from "@/components/ui/slug-input";
import UploaderForm from "@/components/uploader/uploader-form";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Files, FileText, Link, Plus, TrashIcon } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { UploaderFormSingle } from "@/components/uploader/uploader-form-single";
import { cn } from "@/lib/utils";
import RichTextEditor from "@/components/minimal-tiptap/editor";
import { FormErrors } from "@/components/form-errors";

export function ModelForm({
  lang,
  brands,
}: {
  lang: "ar_" | "en_";
  brands: Array<BrandWithRelationsSchema>;
}) {
  const { control } = useFormContext<CreateModelSchema>();

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
            </div>
            <Specification lang={lang} />

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
            <h1 className="text-xl mb-4">Assign the Model Category</h1>
            <ItemCategory brands={brands} />

            <FormField
              control={control}
              name={`${lang}description`}
              render={({ field }) => (
                <FormItem className="w-full mt-8">
                  <FormLabel>{title} description</FormLabel>
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
        <Card>
          <CardHeader>
            <CardTitle>Import your model images</CardTitle>
            <CardDescription>
              Add your amazing model images to encourage your customer more!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name={`image`}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormControl>
                      <UploaderForm
                        defaultUploadedFiles={field.value ?? []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-y-4">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Add your brochure</CardTitle>
            <CardDescription>
              Add your amazing brochure to encourage your customer more!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name={`brochure`}
              render={({ field }) => {
                console.log("field", field.value);
                return (
                  <FormItem className="w-full">
                    <FormControl>
                      <UploaderFormSingle
                        type="files"
                        defaultUploadedFile={field.value ?? undefined}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>
        <FormErrors />
      </div>
    </div>
  );
}

function ItemCategory({ brands }: { brands: Array<BrandWithRelationsSchema> }) {
  const { control } = useFormContext<CreateModelSchema>();

  return (
    <div className="space-y-8 w-full  mx-auto">
      <div className="space-y-12">
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={String(field.value)}
              className="space-y-8"
            >
              {brands.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center gap-6 border-b pb-2">
                    {group.logo?.url && (
                      <Image
                        src={group.logo.url}
                        alt={group.en_name}
                        width={45}
                        height={45}
                        className="object-cover"
                      />
                    )}
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">
                        {group.en_name}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {group.en_description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-6">
                    {group.categories?.map((category) => (
                      <FormItem key={category.id} className="relative h-full">
                        <FormControl>
                          <RadioGroupItem
                            value={String(category.id)}
                            id={String(category.id)}
                            className="sr-only"
                          />
                        </FormControl>
                        <Label
                          htmlFor={String(category.id)}
                          className={`
                            relative h-full p-3 rounded-lg border transition-colors cursor-pointer
                            flex flex-row justify-start gap-x-4 
                            ${
                              field.value == category.id
                                ? "border-primary bg-primary/10 shadow-md"
                                : "border-input hover:bg-muted/50"
                            }
                          `}
                        >
                          {category.image?.url && (
                            <Image
                              src={category.image.url}
                              alt={category.en_name}
                              width={45}
                              height={45}
                              className="object-cover rounded-md"
                            />
                          )}
                          <div>
                            <h3 className="text-xl font-semibold">
                              {category.en_name}
                            </h3>
                            {category.en_description && (
                              <p className="text-muted-foreground text-xs line-clamp-2">
                                {category.en_description}
                              </p>
                            )}
                          </div>
                        </Label>
                      </FormItem>
                    ))}
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </div>
    </div>
  );
}

function Specification({ lang }: { lang: "ar_" | "en_" }) {
  const { control } = useFormContext<CreateModelSchema>();

  const { append, remove, fields, move } = useFieldArray({
    control: control,
    name: `specification`,
  });

  const appendNewEmpty = useCallback(() => {
    append({
      id: crypto.randomUUID(),
      ar_key: "",
      en_key: "",
      ar_value: "",
      en_value: "",
    });
  }, []);

  return (
    <div className="mb-8">
      {fields.length == 0 ? (
        <EmptyState
          title="No specification created"
          description="You can create new specification item to show it in your model"
          className="max-w-full"
          icons={[FileText, Link, Files]}
          action={{
            label: "Create new specification",
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
                        name={`specification.${index}.${lang}key`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            {index == 0 && (
                              <FormLabel>Specification Key</FormLabel>
                            )}
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Specification key"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`specification.${index}.${lang}value`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            {index == 0 && (
                              <FormLabel>Specification Value</FormLabel>
                            )}
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Specification value"
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
    </div>
  );
}
