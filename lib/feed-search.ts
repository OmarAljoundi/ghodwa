"use server";

import { searchClient } from "@algolia/client-search";
import { GlobleIndex, PrismaModels } from "./types";
import {
  GetBrandsGlobleIndex,
  GetCategoriesGlobleIndex,
  GetModelsGlobleIndex,
  GetNewsGlobleIndex,
  GetServicesGlobleIndex,
} from "./search.server";

type ReturnFunc = () => Promise<{ ar: GlobleIndex[]; en: GlobleIndex[] }>;

const tableMap: Partial<Record<PrismaModels, ReturnFunc>> = {
  category: GetCategoriesGlobleIndex,
  model: GetModelsGlobleIndex,
  brand: GetBrandsGlobleIndex,
  service: GetServicesGlobleIndex,
  news: GetNewsGlobleIndex,
} as const;

const client = searchClient(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_API_KEY!
);

export async function executeGlobalIndexFunction(
  tableName: PrismaModels
): Promise<void> {
  const func = tableMap[tableName];
  if (func) {
    try {
      const result = await func();
      const promiseGlobleIndexAr = client.saveObjects({
        indexName: "ghodwa_globle_index_ar",
        objects: [...result.ar],
        waitForTasks: false,
      });

      const promiseGlobleIndexEn = client.saveObjects({
        indexName: "ghodwa_globle_index_en",
        objects: [...result.en],
        waitForTasks: false,
      });

      await Promise.all([promiseGlobleIndexEn, promiseGlobleIndexAr]);
    } catch (error) {
      console.error(
        `Error executing function '${tableName.toString()}': ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  } else {
    console.info(`Invalid function name '${tableName.toString()}'`);
  }
}

export async function deleteObjectGlobalIndexFunction(
  tableName: PrismaModels,
  id: number | string
): Promise<void> {
  let objectID: string | null = "";

  switch (tableName) {
    case "model":
      objectID += "Models";
      break;
    case "brand":
      objectID += "Brands";
      break;
    case "category":
      objectID += "Categories";
      break;
    case "service":
      objectID += "Services";
      break;
    default:
      objectID = null;
  }

  if (objectID === null) {
    console.info(`Invalid function name '${tableName.toString()}'`);
    return;
  }

  objectID += `-${id}`;

  await client.deleteObject({
    indexName: "ghodwa_globle_index_ar",
    objectID: objectID,
  });

  await client.deleteObject({
    indexName: "ghodwa_globle_index_en",
    objectID: objectID,
  });
}
