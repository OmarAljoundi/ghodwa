import { z } from "zod";

export const brandSchema = z.object({
  id: z.number().int().positive(),
  ar_name: z.string().min(1),
  en_name: z.string().min(1),
  logo: z.any().optional(),
  slug: z.string().min(1, { message: "Slug is required and must be unique" }),
  ar_description: z.string().optional(),
  en_description: z.string().optional(),
  seo: z.any().optional(),
  createdBy: z.string().default("admin"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date(),
});

export const categorySchema = z.object({
  id: z.number().int().positive(),
  ar_name: z.string().min(1),
  en_name: z.string().min(1),
  image: z.any().optional(),
  seo: z.any().optional(),
  slug: z.string().min(1, { message: "Slug is required and must be unique" }),
  ar_description: z.string().optional(),
  en_description: z.string().optional(),
  brandId: z.number().nullable().optional().default(null),
  createdBy: z.string().default("admin"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date(),
});

export const modelSchema = z.object({
  id: z.number().int().positive(),
  ar_name: z.string().min(1),
  en_name: z.string().min(1),
  slug: z.string().min(1, { message: "Slug is required and must be unique" }),
  ar_description: z.string().optional(),
  en_description: z.string().optional(),
  specification: z
    .object({
      id: z.string(),
      ar_key: z.string(),
      ar_value: z.string(),
      en_key: z.string(),
      en_value: z.string(),
    })
    .array()
    .default([]),
  seo: z.any().optional(),
  image: z.array(z.any()).default([]),
  brochure: z.array(z.any()).default([]),
  categoryId: z.union([z.string(), z.number()]).transform(Number),
  createdBy: z.string().default("admin"),
  createdAt: z.date().default(new Date()),

  updatedAt: z.date(),
});

export const createBrandSchema = brandSchema
  .extend({
    categories: z
      .object({ connect: z.array(z.object({ id: z.number() })) })
      .default({ connect: [] }),
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
export const updateBrandSchema = brandSchema
  .partial()
  .extend({
    categories: z
      .object({ connect: z.array(z.object({ id: z.number() })) })
      .default({ connect: [] }),
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const createCategorySchema = categorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateCategorySchema = categorySchema
  .partial()
  .omit({ id: true, createdAt: true, updatedAt: true });

export const createModelSchema = modelSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateModelSchema = modelSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const categoryWithRelationsSchema = categorySchema.extend({
  brand: brandSchema.optional(),
  models: z.array(modelSchema).optional(),
});

export const brandWithRelationsSchema = brandSchema.extend({
  categories: z.array(categoryWithRelationsSchema).optional(),
});

export const modelWithRelationsSchema = modelSchema.extend({
  category: categorySchema.optional(),
});

export const queryBrandSchema = brandSchema
  .extend({
    categories: z.array(categorySchema).optional(),
  })
  .partial();
export const queryCategorySchema = categorySchema
  .extend({
    brand: brandSchema.optional(),
    models: z.array(modelSchema).optional(),
  })
  .partial();
export const queryModelSchema = modelSchema
  .extend({
    category: categorySchema.optional(),
  })
  .partial();

export type BrandSchema = z.infer<typeof brandSchema>;
export type CreateBrandSchema = z.infer<typeof createBrandSchema>;
export type UpdateBrandSchema = z.infer<typeof updateBrandSchema>;
export type BrandWithRelationsSchema = z.infer<typeof brandWithRelationsSchema>;
export type QueryBrandSchema = z.infer<typeof queryBrandSchema>;
export type CategorySchema = z.infer<typeof categorySchema>;
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
export type CategoryWithRelationsSchema = z.infer<
  typeof categoryWithRelationsSchema
>;
export type QueryCategorySchema = z.infer<typeof queryCategorySchema>;
export type ModelSchema = z.infer<typeof modelSchema>;
export type CreateModelSchema = z.infer<typeof createModelSchema>;
export type UpdateModelSchema = z.infer<typeof updateModelSchema>;
export type ModelWithRelationsSchema = z.infer<typeof modelWithRelationsSchema>;
export type QueryModelSchema = z.infer<typeof queryModelSchema>;
