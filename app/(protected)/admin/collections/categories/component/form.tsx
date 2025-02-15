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
import { CreateCategorySchema } from "@/schema";
import { UploaderFormSingle } from "@/components/uploader/uploader-form-single";
import { SeoForm } from "@/components/seo-form";
import { SlugInput } from "@/components/ui/slug-input";

export function CategoryForm({ lang }: { lang: "ar_" | "en_" }) {
  const { setValue, getValues, control } =
    useFormContext<CreateCategorySchema>();

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
              <FormField
                control={control}
                name={`${lang}description`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{title} description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
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
            {/* <h1 className="text-xl mb-4">Assign the category brand</h1>
            <FormField
              control={control}
              name="brandId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                      className="flex flex-row "
                    >
                      {brands.map((item) => (
                        <FormItem key={`${item.id}-${item.en_name}`}>
                          <Label
                            className="relative flex flex-col gap-1 rounded-lg items-center border cursor-pointer
                          border-input p-4 w-52 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring 
                          has-[[data-state=checked]]:bg-background"
                            htmlFor={`${item.id}-${item.en_name}`}
                          >
                            <div className="flex items-center flex-col justify-between gap-0.5">
                              <FormControl>
                                <RadioGroupItem
                                  id={`${item.id}-${item.en_name}`}
                                  value={String(item.id)}
                                  className="order-1 after:absolute after:inset-0 hidden"
                                />
                              </FormControl>
                              <Image
                                src={item.logo?.url}
                                alt={item.logo?.url}
                                width={50}
                                height={50}
                                className="opacity-60"
                              />

                              <h1>{item.en_name}</h1>
                              <p className="text-muted-foreground text-xs line-clamp-1">
                                {item.en_description}
                              </p>
                            </div>
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </CardContent>
        </Card>
        <SeoForm lang={lang} />
      </div>

      <Card className="max-w-72 ">
        <CardHeader>
          <CardTitle>Import your brand logo</CardTitle>
          <CardDescription>
            Add your amazing brand logo to encourage your customer more!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploaderFormSingle
            defaultUploadedFile={getValues("image") ?? undefined}
            onChange={(e) => setValue("image", e)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
