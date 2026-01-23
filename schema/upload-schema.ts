import { z } from 'zod';

export const fileSchema = z.object({
  path: z.string(),
  size: z.number(),
  type: z.string(),
});

export type FileSchema = z.infer<typeof fileSchema>;
export const fileSchemaRequired = fileSchema.optional().superRefine((val, ctx) => {
  if (typeof val !== 'object' || val === null) {
    ctx.addIssue({
      code: 'custom',
      message: 'Image is required and must be a valid object',
    });
  } else if (!('path' in val)) {
    ctx.addIssue({
      code: 'custom',
      message: "Image object must have a 'path' property",
    });
  }
});

export const fileSchemaArrayRequired = fileSchema
  .array()
  .min(1, { message: 'At least one image must be added' })
  .default([]);
