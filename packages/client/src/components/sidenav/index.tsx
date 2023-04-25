import { BsMenuButtonWideFill } from "react-icons/bs";

import React from "react";
import { Link } from "react-router-dom";

interface SideNavProps {
    items: SideNavItemProps[],
    bottomItems?: SideNavItemProps[],
    className?: string
}

const SideNav: React.FC<SideNavProps> = ({ items, bottomItems, className }) => {
    return (
        <div className={`bg-primary h-screen py-4 px-4 relative ${className ?? ""}`}>
            <Link to={"/"}>
                <h1 className="text-white text-4xl font-bold flex items-center space-x-4 px-3"> 
                    <span><BsMenuButtonWideFill size={32} color="white" /></span> 
                    <span>FiFi</span>
                </h1>
            </Link>

            <div className="mt-8">
                {
                    items.map((item, index) => <SideNavItem key={index} text={item.text} icon={item.icon} link={item.link} />)
                }
            </div>
            
            <div className="absolute bottom-6 w-[90%]"> 
                {
                    bottomItems?.map((item, index) => {
                        return (
                            <SideNavItem key={index} text={item.text} icon={item.icon} link={item.link} />
                        )
                    })
                }
            </div>
            
        </div>
    )
}

interface SideNavItemProps {
    text: string,
    icon: React.ReactNode,
    link: string
}

const SideNavItem: React.FC<SideNavItemProps> = ({ text, icon, link  }) => {
    return (
        <Link to={link}>
            <h1 className="text-white text-xl font-bold flex items-center space-x-4 hover:bg-secondary p-3 rounded-md"> 
                <span>{icon}</span> 
                <span>{text}</span>
            </h1>
        </Link>
    )
}

export default SideNav