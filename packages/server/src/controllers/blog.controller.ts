import { TRPCError } from '@trpc/server';
import { Context } from '../app';
import { CreateBlogInput, GetBlogInput } from '../schemas/blog.schema';
import { createBlog, getBlogById, getBlogs } from '../services/blog.service';

export const createBlogHandler = async ({ input, ctx }: { ctx: Context, input: CreateBlogInput }) => {
    try {
        const user = ctx.user;
        if (!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You are not authorized to perform this action',
            });
        }
        const res = await createBlog({
            title: input.title,
            content: input.content,
            author: user._id,
            photo: input.photo
        })
        return {
            status: "success",
            data: {
                blog: res
            }
        }
    } catch (err: any) {
        console.log(err)
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message,
        });
    }
};

export const getBlogHandler = async ({ input, ctx }: { ctx: Context, input: GetBlogInput }) => {
    try {
        const blog = await getBlogById(input.id);
        return {
            status: "success",
            data: {
                blog
            }
        }
    } catch (err: any) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message,
        });
    }
}

export const getBlogsHandler = async ({ ctx }: { ctx: Context }) => {
    try {
        const blogs = await getBlogs();
        return {
            status: "success",
            data: {
                blogs
            }
        }
    } catch (err: any) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message,
        });
    }
}

