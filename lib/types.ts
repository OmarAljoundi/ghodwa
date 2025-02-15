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
