import React from "react"
import MainLayout from "../layouts/mainLayout"
import { UserContext } from "../contexts/UserContext"
import ProductCard from "../components/productCard"

import { AiFillRightCircle } from "react-icons/ai"

const Home = () => {
    const { state } = React.useContext(UserContext)
    return (
        <MainLayout>
            <div className="lg:flex ">
                <div className="lg:w-3/4 ">
                    {state.isAuth && <p className="text-2xl font-medium">Hello, {state.user?.email.split("@")[0]}</p>}
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