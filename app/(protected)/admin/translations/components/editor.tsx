"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { LangTabs } from "@/components/lang-tabs";
import { TranslationForm } from "./form";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addNewKey } from "@/lib/translations.server";
import { toast } from "sonner";

export function TranslationsEditor() {
  const [currentLanguage, setCurrentLanguage] = useState<"tab-en" | "tab-ar">(
    "tab-en"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Translations</CardTitle>
          <CardDescription>
            Manage translations for your application. Only editing is allowed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex items-center w-full max-w-sm">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search translations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <AddNewKey />
              <Button
                type="button"
                onClick={async () => await queryClient.invalidateQueries()}
              >
                Refresh
              </Button>
            </div>
          </div>

          <LangTabs
            value={currentLanguage}
            onValueChange={(e) => setCurrentLanguage(e as "tab-en" | "tab-ar")}
            showSave={false}
          >
            <TranslationForm
              lang="en_"
              currentLanguage="tab-en"
              searchTerm={searchTerm}
            />
            <TranslationForm
              lang="ar_"
              currentLanguage="tab-ar"
              searchTerm={searchTerm}
            />
          </LangTabs>
        </CardContent>
      </Card>
    </div>
  );
}

const translationSchema = z.object({
  key: z
    .string()
    .min(2, "Key must be at least 2 characters")
    .regex(
      /^[a-zA-Z0-9_ ]+$/,
      "Key can only contain letters, numbers, underscores, and spaces."
    ),
  arabicValue: z.string().min(2, "Arabic value must be at least 2 characters"),
  englishValue: z
    .string()
    .min(2, "English value must be at least 2 characters"),
});
type TranslationFormValues = z.infer<typeof translationSchema>;

function AddNewKey() {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const form = useForm<TranslationFormValues>({
    resolver: zodResolver(translationSchema),
    defaultValues: {
      key: "",
      arabicValue: "",
      englishValue: "",
    },
  });

  async function onSubmit(values: TranslationFormValues) {
    await addNewKey(values);

    await queryClient.invalidateQueries();
    toast.success("Translations saved", {
      description: `Successfully add new translations.`,
    });
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add New Translation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Translation</DialogTitle>
          <DialogDescription>
            Add a new key with Arabic and English translations.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input placeholder="translation_key" {...field} />
                  </FormControl>
                  <FormDescription>
                    Key can only contain letters, numbers, underscores, and
                    spaces.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arabicValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arabic Value</FormLabel>
                  <FormControl>
                    <Input
                      dir="rtl"
                      placeholder="Arabic translation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="englishValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Value</FormLabel>
                  <FormControl>
                    <Input placeholder="English translation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {form.formState.isSubmitting ? "Adding..." : "Add Translation"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
