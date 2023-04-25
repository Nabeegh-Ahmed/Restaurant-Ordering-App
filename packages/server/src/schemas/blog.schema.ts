import { object, string, TypeOf } from 'zod';

export const createBlogSchema = object({
    title: string({ required_error: 'Title is required' }),
    photo: string().optional(),
    content: string({ required_error: 'Content is required' }),
})

export const getBlogSchema = object({
    id: string({ required_error: 'Id is required' }),
})

export type CreateBlogInput = TypeOf<typeof createBlogSchema>;
export type GetBlogInput = TypeOf<typeof getBlogSchema>;
