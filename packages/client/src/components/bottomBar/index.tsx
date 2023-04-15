import React from "react"
import { BsShop, BsMenuButtonWideFill, BsBell } from "react-icons/bs"
import { RxDashboard } from "react-icons/rx"
import { BiHelpCircle } from "react-icons/bi"

const BottomBar = () => {
    return (
        <div className="lg:hidden p-5 bg-primary fixed bottom-0 w-full flex justify-between rounded-3xl">
            <BsMenuButtonWideFill size={42} color="white" />
            <RxDashboard size={42} color="white" />
            <BsShop size={42} color="white" />
            <BsBell size={40} color="white" />
        </div>
    )
}

export default BottomBar