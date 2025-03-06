import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getTranslations, saveTranslations } from "../actions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TranslationItemSchema = z.record(z.string());

const TranslationFormSchema = z.object({
  translations: TranslationItemSchema,
});

type TranslationFormValues = z.infer<typeof TranslationFormSchema>;
export function TranslationForm({
  currentLanguage,
  searchTerm,
}: {
  searchTerm: string;
  currentLanguage: "tab-en" | "tab-ar";
  lang: "ar_" | "en_";
}) {
  const queryClient = useQueryClient();
  const { data: translations, isLoading: isTranslationsLoading } = useQuery({
    queryKey: ["translations", currentLanguage],
    queryFn: () => getTranslations(currentLanguage),
    staleTime: 1000 * 60 * 5,
  });

  const saveTranslationsMutation = useMutation({
    mutationFn: ({
      lang,
      data,
    }: {
      lang: "tab-en" | "tab-ar";
      data: Record<string, string>;
    }) => saveTranslations(lang, data),
    onSuccess: () => {
      toast.success("Translations saved", {
        description: `Successfully updated ${currentLanguage} translations.`,
      });
      queryClient.invalidateQueries({
        queryKey: ["translations", currentLanguage],
      });
      queryClient.invalidateQueries({ queryKey: ["backups", currentLanguage] });
    },
    onError: (error) => {
      toast.error("Error saving translations", {
        description: "Failed to save translation data. Please try again.",
      });
      console.error(error);
    },
  });

  const form = useForm<TranslationFormValues>({
    resolver: zodResolver(TranslationFormSchema),
    defaultValues: {
      translations: {},
    },
    shouldUnregister: false,
  });

  function handleSubmit(values: TranslationFormValues) {
    const updatedTranslations = { ...translations };

    Object.entries(values.translations).forEach(([key, value]) => {
      if (key in updatedTranslations) {
        updatedTranslations[key] = value;
      }
    });

    saveTranslationsMutation.mutate({
      lang: currentLanguage,
      data: updatedTranslations,
    });
  }

  useEffect(() => {
    if (translations && !isTranslationsLoading) {
      form.reset({ translations });
    }
  }, [translations, isTranslationsLoading, form]);

  const translationKeys = translations
    ? Object.keys(translations)
        .sort()
        .filter((key) => {
          if (!searchTerm || searchTerm.trim() === "") return true;
          const searchTermLower = searchTerm.toLowerCase();
          return (
            key.toLowerCase().includes(searchTermLower) ||
            translations[key].toLowerCase().includes(searchTermLower)
          );
        })
    : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {isTranslationsLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))
        ) : translationKeys.length > 0 ? (
          <ScrollArea className="h-[600px] pr-6">
            <div className="px-2 space-y-4">
              {translationKeys.map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`translations.${key}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex flex-col mb-1">
                        <span className="break-words text-sm font-medium">
                          {key}
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          dir={currentLanguage === "tab-ar" ? "rtl" : "ltr"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No translations found matching your search.
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              isTranslationsLoading ||
              !form.formState.isDirty ||
              saveTranslationsMutation.isPending
            }
          >
            {saveTranslationsMutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
