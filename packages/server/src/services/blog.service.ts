import blogModel, { Blog } from "../models/blog.model";

export const createBlog = async (input: Partial<Blog>) => {
    const blog = await blogModel.create(input);
    return blog.toJSON();
};

export const getBlogById =async (id:string) => {
    const blog = await blogModel.findById(id)
    return blog?.toJSON();
}

export const getBlogs = async() => {
    const blogs = await blogModel.find()
    return blogs
}