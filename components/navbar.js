"use client";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
    <header className="w-full bg-white text-[#4CAF50]">
      <nav className="max-w-[1366px] h-[100px] flex justify-between p-4 items-center">
        <div className="italic font-bold">
          <Link href="/">FOOD APP</Link>
        </div>

        <ul className="hidden md:flex md:pl-25  font-normal text-xl">
          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">Restaurants</Link>
          </li>
          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">About</Link>
          </li>{" "}
          {/* <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">Services</Link>
          </li> */}
          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">Contact</Link>
          </li>
        </ul>
        <div className="pl-[80px]   md:pr-10">
          <ShoppingCartIcon className="text-[#4CAF50] h-9 w-9" />
        </div>

        <div onClick={handleSmalleNavigation} className="flex md:hidden ">
          {menuIcon ? (
            <XMarkIcon className="h-9 w-9 text-[#4CAF50]" />
          ) : (
            <Bars3Icon
              className="
              text-[#4CAF50]
               h-9 w-9"
            />
          )}
        </div>

        <div
          className={
            menuIcon
              ? "md:hidden  pl-11 z-10 absolute top-[100px] right-0 bottom-0 left-0 flex justify-start  items-start w-3/4 h-screen bg-white text-[#4CAF50 ] ease-in duration-300 "
              : "md:hidden pl-11 z-10 absolute top-[100px] right-0 bottom-0 left-[-100%] flex justify-start items-start w-3/4 h-screen bg-white text-[#4CAF50 ] ease-in duration-300 "
          }
        >
          <div className="w-full">
            <ul className="  font-normal text-xl ">
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
              <li className="py-5 mt-[-30px] cursor-pointer">
                <Link href="/" onClick={handleSmalleNavigation}>
                  About
                </Link>
              </li>

              <li className="py-5 mt-[-30px] cursor-pointer">
                <Link href="/" onClick={handleSmalleNavigation}>
                  Services
                </Link>
              </li>

              <li className="py-5 mt-[-30px] cursor-pointer">
                <Link href="/" onClick={handleSmalleNavigation}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
