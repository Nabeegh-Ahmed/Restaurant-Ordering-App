import React from "react";
import SideNav from "../components/sidenav";
import BottomBar from "../components/bottomBar";
import SearchBar from "../components/searchBar";
import GlassBox from "../components/glassBox";
import { UserContext } from "../contexts/UserContext";

import {BsBell, BsPerson, BsShop} from "react-icons/bs"
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdPointOfSale  } from "react-icons/md"
import { BiHelpCircle } from "react-icons/bi";

const MainLayout: React.FC<any> = ({ children }) => {
    const {state} = React.useContext(UserContext)
    return (
        <div className="bg-secondary text-white relative flex ">
            <div className="hidden lg:block lg:w-[20%] fixed">
                <SideNav 
                    items={[
                        {text: "Dashboard", icon: <RxDashboard size={22} color="white" />, link: "/dashboard"},
                        {text: "Marketplace", icon: <BsShop size={22} color="white" />, link: "/marketplace"},
                        {text: "Point of Sale", icon: <MdPointOfSale size={22} color="white" />, link: "/pos"},
                    ]}
                    bottomItems={[
                        {text: "Help & Support", icon: <BiHelpCircle size={22} color="white" />, link: "/support"},
                    ]}
                />
            </div>
            <div className="lg:ml-[21%] lg:w-[80%] w-full m-4">
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
};

export default MainLayout;