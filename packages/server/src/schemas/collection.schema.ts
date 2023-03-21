import { object, string, TypeOf } from 'zod';

export const createCollectionSchema = object({
  name: string({ required_error: 'Name is required' }),
  description: string({ required_error: "Collection description is required" }),
  gallery: string().array().optional(),
})

export type CreateCollectionInput = TypeOf<typeof createCollectionSchema>;