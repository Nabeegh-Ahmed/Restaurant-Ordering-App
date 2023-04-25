import React from "react"
import MainLayout from "../layouts/mainLayout"
import { UserContext } from "../contexts/UserContext"
import ProductCard from "../components/productCard"

import { AiFillRightCircle } from "react-icons/ai"
import { trpc } from "../trpc"
import Loader from "../components/loader"
import BlogCard from "../components/blogCard"

const Home = () => {
    const { state } = React.useContext(UserContext)
    const { isLoading, isError, data: blogs, error } = trpc.getBlogs.useQuery()
    console.log(blogs)
    return (
        <MainLayout>
            <div className="lg:flex ">
                <div className="lg:w-3/4 ">
                    {state.isAuth && <p className="text-2xl font-medium mt-3">Hello, {state.user?.email.split("@")[0]}</p>}
                    <div className="lg:flex flex-wrap">
                        <div className="lg:w-[33%]"><ProductCard /></div>
                        <div className="lg:w-[33%]"><ProductCard /></div>
                        <div className="lg:w-[33%]"><ProductCard /></div>
                        <div className="lg:w-[33%]"><ProductCard /></div>
                        <div className="lg:w-[33%]"><ProductCard /></div>
                        <div className="lg:w-[33%]"><ProductCard /></div>
                    </div>
                    
                </div>
                <div className="lg:w-1/4 py-2">
                    <h1 className="text-xl font-medium">Top Restaurants</h1>
                    <TopRestaurantCard />
                    <TopRestaurantCard />
                    <TopRestaurantCard />
                </div>
            </div>

            <h1 className="text-3xl my-4 font-bold">Learn more about FiFi</h1>
            {
                isLoading ? <Loader /> : isError ? <p>{error.message!}</p> : (
                    blogs.data.blogs.map(blog => {
                        return <div className="w-1/3"><BlogCard title={blog.title} content={blog.content} photo={blog.photo} author={""} /></div>
                    })
                )
            }

        </MainLayout>
    )
}

const TopRestaurantCard = () => {
    return (
        <div className="group w-full my-2 rounded-lg shadow-xl p-2 bg-opacity-10 transition-all ease-in-out delay-20 hover:bg-opacity-30 bg-sub-text flex space-x-2 items-center justify-between">
            <div className="flex space-x-2">
                <div className="rounded-lg bg-sub-text h-[50px] w-[50px]"></div>
                <div>
                    <p className="font-medium text-md">Monal Rooftop</p>
                    <p className="text-sm text-sub-text">Gulberg, Lahore</p>
                </div>
            </div>
            <div><AiFillRightCircle size={28} className="text-sub-text group-hover:text-white transition ease-in-out delay-20" /></div>
        </div>
    )
}

export default Home