import React from "react";
import { UserContext } from "../contexts/UserContext";
import SideNav from "../components/sidenav";
import GlassBox from "../components/glassBox";
import SearchBar from "../components/searchBar";
import BottomBar from "../components/bottomBar";
import { Link } from "react-router-dom";

import { BsBell, BsPerson } from "react-icons/bs";
import { BiFoodMenu } from "react-icons/bi";
import { RiTableLine } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";
import { AiOutlineAccountBook } from "react-icons/ai";

const POSLayout: React.FC<any> = ({ children }) => {
    const {state} = React.useContext(UserContext)
    return (
        <div className="bg-secondary text-white relative flex ">
            <div className="hidden lg:block lg:w-[18%] fixed">
                <SideNav items={[
                    {text: "Menu", icon: <BiFoodMenu size={22} color="white" />, link: "/pos/menu"},
                    {text: "Tables", icon: <RiTableLine size={22} color="white" />, link: "/pos/menu"},
                    {text: "Delivery", icon: <FiTruck size={22} color="white" />, link: "/pos/menu"},
                    {text: "Accounting", icon: <AiOutlineAccountBook size={22} color="white" />, link: "/pos/menu"},
                ]} />
            </div>
            <div className="lg:ml-[19%] lg:w-[90%] w-full m-4">
                <div className="flex space-x-4 items-center">
                    <div className="w-full">
                        <SearchBar />
                    </div>
                    <GlassBox className="!rounded-full hidden lg:block">
                        <div className="p-3 rounded-full">
                            <BsBell size={22} className="text-white"/>
                        </div>
                    </GlassBox>
                    
                    <Link to={state.isAuth ? "/profile" : "/auth"}>
                        <div>
                            <BsPerson size={32} className="text-white"/>
                        </div>
                    </Link>
                </div>             
                <div className="lg:pb-0 pb-[20%]">
                    {children}
                </div>    
            </div>
            <BottomBar />
        </div>
    );
}

export default POSLayout