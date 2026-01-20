'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@/db.server';
import { deleteObjectGlobalIndexFunction, executeGlobalIndexFunction } from './feed-search';
import type { PrismaModels, Result } from './types';

export async function getAll<T>(
  model: PrismaModels,
  options?: {
    where?: Record<string, unknown>;
    include?: Record<string, boolean>;
    orderBy?: Record<string, 'asc' | 'desc'>;
  },
): Promise<Result<T[]>> {
  try {
    const records = await (db[model] as any).findMany({
      ...options,
    });

    return {
      success: true,
      data: records as T[],
      statusCode: 200,
    };
  } catch (error) {
    console.error(`Error fetching records from  ${model as string}:`, error);
    return {
      success: false,
      error: `Failed to fetch  ${model as string}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      statusCode: 500,
    };
  }
}

export async function createOne<T>(model: PrismaModels, data: Partial<T>): Promise<Result<T>> {
  try {
    const record = await (db[model] as any).create({
      data: data as never,
    });

    await executeGlobalIndexFunction(model);

    revalidatePath('/', 'layout');

    return {
      success: true,
      data: record as T,
      statusCode: 201,
    };
  } catch (error) {
    console.error(
      `Error creating record in  ${model as string}:`,
      error instanceof Error ? error.stack : 'Unknown error',
    );
    return {
      success: false,
      error: `Failed to create  ${model as string}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      statusCode: 500,
    };
  }
}

export async function createMany<T>(
  model: PrismaModels,
  data: Partial<T>[],
): Promise<Result<{ count: number }>> {
  try {
    const result = await (db[model] as any).createMany({
      data: data as never,
    });

    await executeGlobalIndexFunction(model);

    revalidatePath('/', 'layout');
    return {
      success: true,
      data: result,
      statusCode: 201,
    };
  } catch (error) {
    console.error(`Error creating multiple records in  ${model as string}:`, error);
    return {
      success: false,
      error: `Failed to create multiple  ${model as string}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      statusCode: 500,
    };
  }
}

export async function updateOne<T>(
  model: PrismaModels,
  id: string | number,
  data: Partial<T>,
): Promise<Result<T>> {
  try {
    const record = await (db[model] as any).update({
      where: { id },
      data: data as never,
    });

    await executeGlobalIndexFunction(model);

    revalidatePath('/', 'layout');

    return {
      success: true,
      data: record as T,
      statusCode: 200,
    };
  } catch (error) {
    console.error(`Error updating record in  ${model as string}:`, error);
    return {
      success: false,
      error: `Failed to update  ${model as string}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      statusCode: 500,
    };
  }
}

export async function updateMany<T>(
  model: PrismaModels,
  where: Record<string, unknown>,
  data: Partial<T>,
): Promise<Result<{ count: number }>> {
  try {
    const result = await (db[model] as any).updateMany({
      where: where as never,
      data: data as never,
    });

    await executeGlobalIndexFunction(model);

    revalidatePath('/', 'layout');
    return {
      success: true,
      data: result,
      statusCode: 200,
    };
  } catch (error) {
    console.error(`Error updating multiple records in  ${model as string}:`, error);
    return {
      success: false,
      error: `Failed to update multiple  ${model as string}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      statusCode: 500,
    };
  }
}

export async function deleteOne<T>(model: PrismaModels, id: string | number): Promise<Result<T>> {
  try {
    const record = await (db[model] as any).delete({
      where: { id },
    });

    await deleteObjectGlobalIndexFunction(model, id);

    revalidatePath('/', 'layout');
    return {
      success: true,
      data: record as T,
      statusCode: 200,
    };
  } catch (error) {
    console.error(`Error deleting record from  ${model as string}:`, error);
    return {
      success: false,
      error: `Failed to delete  ${model as string}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      statusCode: 500,
    };
  }
}

export async function deleteMany(
  model: PrismaModels,
  where: Record<string, unknown>,
): Promise<Result<{ count: number }>> {
  try {
    const result = await (db[model] as any).deleteMany({
      where: where as never,
    });

    revalidatePath('/', 'layout');

    return {
      success: true,
      data: result,
      statusCode: 200,
    };
  } catch (error) {
    console.error(`Error deleting multiple records from  ${model as string}:`, error);
    return {
      success: false,
      error: `Failed to delete multiple  ${model as string}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      statusCode: 500,
    };
  }
}
