import { number, object, string, TypeOf } from 'zod';

export const createProductSchema = object({
    name: string({ required_error: 'Name is required' }),
    description: string({ required_error: "Collection description is required" }),
    price: number({ required_error: "Price is required" }),
    gallery: string().array().optional(),
})

export type CreateProductInput = TypeOf<typeof createProductSchema>;