"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// Type for filtering object properties
export type FilterLanguageObject<T, L extends string> = {
  [K in keyof T as K extends `${L}_${infer R}` ? R : never]: T[K];
} & {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T as K extends `${infer _}_${infer _}` ? never : K]: T[K];
};

// Type for array items
export type FilterLanguageArray<T, L extends string> = T extends Array<infer U>
  ? Array<FilterLanguageObject<U, L>>
  : FilterLanguageObject<T, L>;

// Type guard to check if value is an array
function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}

export function useFilteredLanguageData<
  T extends Record<string, unknown> | Record<string, unknown>[]
>(data?: T): FilterLanguageArray<T, "ar" | "en"> {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language as "ar" | "en";

  const filteredData = useMemo(() => {
    if (!data) return undefined;

    // Handle array case
    if (isArray(data)) {
      return data.map((item) => filterObjectByLanguage(item, currentLocale));
    }

    // Handle single object case
    return filterObjectByLanguage(data, currentLocale);
  }, [data, currentLocale]);

  return filteredData as FilterLanguageArray<T, typeof currentLocale>;
}

// Helper function to filter individual objects
function filterObjectByLanguage<T extends Record<string, unknown>>(
  obj: T,
  locale: "ar" | "en"
): FilterLanguageObject<T, typeof locale> {
  const result: Partial<Record<string, unknown>> = {};

  for (const key in obj) {
    if (key.startsWith(`${locale}_`)) {
      // Remove the language prefix from the key
      const newKey = key.slice(3); // Strips 'ar_' or 'en_'
      result[newKey] = obj[key];
    } else if (!key.includes("_")) {
      // Include language-agnostic fields as-is
      result[key] = obj[key];
    }
  }

  return result as FilterLanguageObject<T, typeof locale>;
}
