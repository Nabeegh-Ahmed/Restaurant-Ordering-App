import React from "react";
import SideNav from "../components/sidenav";
import BottomBar from "../components/bottomBar";
import SearchBar from "../components/searchBar";
import GlassBox from "../components/glassBox";
import { UserContext } from "../contexts/UserContext";

import {BsBell, BsPerson, BsFacebook, BsShop, BsMenuButtonWideFill, BsTwitter, BsGithub} from "react-icons/bs"
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdPointOfSale  } from "react-icons/md"
import { BiHelpCircle } from "react-icons/bi";
import {FaLinkedinIn} from "react-icons/fa"

const MainLayout: React.FC<any> = ({ children }) => {
    const {state} = React.useContext(UserContext)
    return (
        <div className="bg-secondary text-white">
            <div className=" relative flex ">
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
            </div>
            <footer className="lg:ml-[20%] lg:pb-4 pb-[80px] lg:w-[80%] w-full text-white bg-primary p-4">
                <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold">Find the best product</div>
                    <h1 className="text-white text-4xl font-bold flex items-center space-x-4 px-3"> 
                        <span><BsMenuButtonWideFill size={32} color="white" /></span> 
                        <span>FiFi</span>
                    </h1>
                </div>

                <p className="lg:w-3/4 w-full my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sit totam doloremque tempora optio autem inventore nesciunt, maxime suscipit id molestias omnis tempore necessitatibus repellendus error nam maiores, perferendis sunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae hic autem harum dignissimos animi quae. Eveniet odio minima delectus, suscipit cupiditate odit nemo iure numquam quod commodi voluptas quo recusandae.</p>

                <Link to="/team"><button className="rounded-2xl text-lg my-4 px-6 py-2 bg-secondary shadow-lg">Meet the team</button></Link>

                <div className="flex items-center space-x-2 mb-4">
                    <Link to={"https://www.twitter.com/nabeegh08"} target="_blank">
                        <div className="bg-secondary p-3 box-content rounded-full"><BsTwitter size={22}  /></div>
                    </Link>
                    <Link to={"https://www.linkedin.com/in/nabeeghahmed/"} target="_blank">
                        <div className="bg-secondary p-3 box-content rounded-full"><FaLinkedinIn size={22}  /></div>
                    </Link>
                    <Link to={"https://www.github.com/nabeegh-ahmed"} target="_blank">
                        <div className="bg-white rounded-full"><BsGithub size={40} className="text-secondary" /></div>
                    </Link>                    
                </div>
            </footer>
            <BottomBar />
        </div>
    );
};

export default MainLayout;