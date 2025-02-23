"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { contactSchema, ContactSchema } from "@/schema/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { submitForm } from "@/query";
import { toast } from "sonner";

export function ContactUsForm() {
  const { t, i18n } = useTranslation("common");
  const lang = i18n.language;
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactSchema) {
    const isArabic = lang == "ar";
    const { success } = await submitForm(data, isArabic);
    if (success) {
      toast.success(t("Thank you for reaching out, we will contact you soon"));
      form.reset({ email: "", name: "", message: "", subject: "" });
      return;
    }
    toast.error(t("We are facing a tecnical issue, please try again later"));
  }

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-4xl lg:text-5xl">{t("We're ready to help you!")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="-space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Name")}</FormLabel>
                <FormControl>
                  <Input
                    className="rtl:text-right"
                    dir={lang == "ar" ? "rtl" : "ltr"}
                    placeholder={t("Your name")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="rtl:text-right"
                    placeholder={t("Your email")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Subject")}</FormLabel>
                <FormControl>
                  <Input
                    dir={lang == "ar" ? "rtl" : "ltr"}
                    className="rtl:text-right"
                    placeholder={t("Subject of your message")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Message")}</FormLabel>
                <FormControl>
                  <Textarea
                    dir={lang == "ar" ? "rtl" : "ltr"}
                    className="rtl:text-right"
                    placeholder={t("Your message")}
                    {...field}
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {t("Send Message")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
