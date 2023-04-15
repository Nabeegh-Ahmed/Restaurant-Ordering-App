import { number, object, string, TypeOf } from 'zod';

export const createRestaurantSchema = object({
    name: string({ required_error: 'Name is required' }),
    description: string({ required_error: "Description is required" }),
    gallery: string().array().optional(),
})

export const getRestaurantSchema = object({
    id: string({ required_error: 'Id is required' }),
})

export type CreateRestaurantInput = TypeOf<typeof createRestaurantSchema>;
export type GetRestaurantInput = TypeOf<typeof getRestaurantSchema>;