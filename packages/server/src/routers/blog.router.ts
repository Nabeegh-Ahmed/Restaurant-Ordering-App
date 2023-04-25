

import { t } from "../app"
import { createBlogHandler, getBlogHandler, getBlogsHandler } from "../controllers/blog.controller";
import { isAuthorizedProcedure } from "../middleware/authorizedProcedure";
import { createBlogSchema, getBlogSchema } from "../schemas/blog.schema";

export const blogRouter = t.router({
    createBlog: isAuthorizedProcedure
        .input(createBlogSchema)
        .mutation(({ input, ctx }) => createBlogHandler({ input, ctx })),
    getBlog: t.procedure
        .input(getBlogSchema)
        .query(({ input, ctx }) => getBlogHandler({ input, ctx })),
    getBlogs: t.procedure
        .query(({ input, ctx }) => getBlogsHandler({ ctx }))
});