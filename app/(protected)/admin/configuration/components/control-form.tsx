import { CheckboxCard } from "@/components/ui/checkbox-card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

export function ControlForm({
  prefix,
  showPage = true,
  children,
}: {
  prefix?: string;
  showPage?: boolean;
  children?: ReactNode;
}) {
  const { control } = useFormContext();
  const key = prefix ? `${prefix}.` : "";
  return (
    <div className="flex justify-between gap-x-2">
      {showPage && (
        <FormField
          control={control}
          name={`${key}showPage`}
          render={({ field }) => (
            <FormItem className="h-max w-full">
              <FormControl>
                <CheckboxCard
                  title="Show the page"
                  desc="Control if you want to show the page or hide it"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name={`${key}showOnFooter`}
        render={({ field }) => (
          <FormItem className="h-max w-full">
            <FormControl>
              <CheckboxCard
                title="Show on Footer"
                desc="Control if you want to show it on the footer or hide it"
                onCheckedChange={field.onChange}
                checked={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${key}showOnMenu`}
        render={({ field }) => (
          <FormItem className="h-max w-full">
            <FormControl>
              <CheckboxCard
                title="Show on menu"
                desc="Control if you want to show it on the menu or hide it"
                onCheckedChange={field.onChange}
                checked={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {children}
    </div>
  );
}
