import { PrismaClient } from "@prisma/client";

export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

export type PrismaModels = keyof Omit<
  PrismaClient,
  | "$connect"
  | "$disconnect"
  | "$on"
  | "$transaction"
  | "$use"
  | "$extends"
  | "$executeRaw"
  | "$executeRawUnsafe"
  | "$queryRaw"
  | "$queryRawUnsafe"
>;

import { type ClientUploadedFileData } from "uploadthing/types";

export type UploadedFile<T = unknown> = ClientUploadedFileData<T>;

export type UploadedFileOmit = Omit<UploadedFile, "serverData">;

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export type ArType = "نماذج" | "فئات" | "ماركات" | "خدمات" | "أخبار";
export type EnType = "Models" | "Categories" | "Brands" | "Services" | "News";

export type GlobleIndex = {
  title: string;
  description: string;
  keywords?: string;
  type: EnType | ArType;
  slug: string;
  objectID: string;
};

export type AlgoliaSearchResult = {
  title: string;
  description: string;
  slug: string;
  type: string;
  objectID: string;
  _highlightResult: Record<"title" | "description" | "type", { value: string }>;
};
