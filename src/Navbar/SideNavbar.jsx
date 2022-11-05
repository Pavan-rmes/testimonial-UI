// import { navigation, classNames } from "../Home/Home";
import { WallsSvg } from "../icons";
import {
  HomeIcon,
  UsersIcon,
  RectangleStackIcon,
  GlobeAltIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Api } from "../Apis/api";
import { useNavigate } from "react-router-dom";



export const navigation = [
  { name: "HomePage", href: "/home", icon: HomeIcon, current: true },
  { name: "Testimonial walls", href: "/testimonials", icon: RectangleStackIcon, current: false,testimonials:[]},
  { name: "My Account", href: "/my-account", icon: UsersIcon, current: false },
  { name: "Upgrade", href: "/upgrade", icon: GlobeAltIcon, current: false },
];


export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export function SideNavbar({navData,setNavData}) {

  const navigate = useNavigate()

  function handleNavgation(id){
    let dupNavData = [...navData];
    dupNavData.map((data,id)=>{dupNavData[id].current = false});
    dupNavData[id].current = true;
    navigate(dupNavData[id].href)
    setNavData(dupNavData);
  }
  // console.log

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" />
        </div>
        <div className="mt-5 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navData.map((item,id) => (
              <div className="cursor-pointer">
              <div
                className={classNames(
                  item.current
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
                onClick={()=>handleNavgation(id)}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true" />
                {item.name}
              </div>
              {id === 1 ?
                <div>
                  {item?.testimonialwalls?.map((testimonial)=>(
                  <p className="text-gray-600 pl-14 py-1 hover:text-gray-800" >
                    {testimonial.wallName}
                  </p>
                  ))}
                </div>
                : <> </> }
              </div>
            ))}
            <Logout />
          </nav>
        </div>
      </div>
    </div>
  );
}


function Logout(){
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/login")
  }
  return(
    <div 
    onClick={()=>handleLogout()}
    className="flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer">
      <ArrowLeftOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-600 hover:text-gray-800" />
      <p className="text-gray-600 hover:text-gray-800">logout</p>
    </div>
  )
}