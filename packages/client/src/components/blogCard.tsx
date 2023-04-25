import React from "react"

interface BlogCardProps {
    title: string
    content: string,
    photo: string,
    author: string
}
const BlogCard: React.FC<BlogCardProps> = ({ title, content, photo, author }) => {
    return (
        <div className="p-2 lg:mr-2 mt-2 bg-sub-text hover:bg-opacity-30 bg-opacity-10 rounded-lg group transition-all ease-in-out delay-20 shadow-lg">

                <img src={photo} className="w-full bg-sub-text rounded-lg h-[240px] shadow-md"/>

            <h1 className="text-2xl mt-3 font-medium">{title}</h1>

            
            <div className="text-sub-text">{author}</div>
            <div dangerouslySetInnerHTML={{__html: content.slice(0,100)}}></div>

        </div>
    )
}

export default BlogCard