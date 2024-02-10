"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function navbar() {
  const [menuIcon, setIcon] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);

  const toggleMenu = () => {
    setIsDropDown(!isDropDown);
  };

  const handleSmalleNavigation = () => {
    setIcon(!menuIcon);
  };

  return (
    <header className="w-full bg-[#1D4851] text-white">
      <nav className="max-w-[1366px] h-[100px] flex justify-between p-4 items-center">
        <div className="italic font-bold">
          <Link href="/">FOOD APP</Link>
        </div>

        <ul className="hidden md:flex uppercase font-semibold text-1xl ">
          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">Home</Link>
          </li>

          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">Restaurants</Link>
          </li>
        </ul>

        <div onClick={handleSmalleNavigation} className="flex md:hidden ">
          {menuIcon ? (
            <XMarkIcon className="h-9 w-9 text-white" />
          ) : (
            <Bars3Icon
              className="
                  text-white
               h-9 w-9"
            />
          )}
        </div>

        <div
          className={
            menuIcon
              ? "md:hidden  pl-11 z-10 absolute top-[100px] right-0 bottom-0 left-0 flex justify-start  items-start w-3/4 h-screen bg-[#1D4851] text-white ease-in duration-300 "
              : "md:hidden pl-11 z-10 absolute top-[100px] right-0 bottom-0 left-[-100%] flex justify-start items-start w-3/4 h-screen bg-[#1D4851] text-white ease-in duration-300 "
          }
        >
          <div className="w-full">
            <ul className=" font-bold text-2xl ">
              <li className="py-5 cursor-pointer">
                <Link href="/" onClick={handleSmalleNavigation}>
                  Home
                </Link>
              </li>

              <li className="py-5 mt-[-30px] cursor-pointer">
                <Link href="/" onClick={handleSmalleNavigation}>
                  Restaurants
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
