"use client";
import {
  Bars3Icon,
  ChevronDownIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuIcon, setIcon] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  const toggleMenu = () => {
    setIsDropDown(!isDropDown);
  };
  const logout = async () => {
    try {
      const response = await fetch(
        "https://fooddelivery-kappa.vercel.app/api/users/logout",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        setIsLogin(false);
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userinfo");
      } else {
        console.error("Logout failed. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSmalleNavigation = () => {
    setIcon(!menuIcon);
  };

  useEffect(() => {
    const tcheckLogin = localStorage.getItem("isLogin");
    if (tcheckLogin) {
      setIsLogin(true);
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));

    window.addEventListener("cartItemAdded", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
    });
    window.addEventListener("cartItemRemoved", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
    });

    return () => {
      window.removeEventListener("cartItemAdded", null);
    };
  }, []);

  return (
    <header className="w-full bg-white text-[#4CAF50]">
      <nav className="max-w-[1366px] h-[100px] flex justify-between p-4 items-center">
        <div className="italic font-bold">
          <Link href="/">FOOD APP</Link>
        </div>

        <ul className="hidden md:flex md:pl-25  font-normal text-md">
          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="../restaurants">Restaurants</Link>
          </li>

          <li className="mr-4 lg:mr-8 cursor-pointer">
            <Link href="/">Contact</Link>
          </li>

          <li className="mr-4 lg:mr-8 cursor-pointer relative">
            <div onClick={toggleMenu}>
              Account
              <svg
                className="w-4 h-4 ml-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414-1.414L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {isDropDown && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl z-10">
                {isLogin ? (
                  <>
                    <li>
                      <Link
                        href="../profile"
                        className="block px-4 py-2 text-[#4CAF50] hover:bg-gray-300"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="../"
                        className="block px-4 py-2 text-[#4CAF50] hover:bg-gray-300"
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="../login"
                        className="block px-4 py-2 text-[#4CAF50] hover:bg-gray-300"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="../register"
                        className="block px-4 py-2 text-[#4CAF50] hover:bg-gray-300"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
        <Link href="../cart">
          <div className="pl-[80px]  cursor-pointer md:pr-10">
            <ShoppingCartIcon className="text-[#4CAF50] h-9 w-9" />
            {cartItemCount > 0 && (
              <span className="absolute top-10 right-22 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#4CAF50] rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>
        </Link>

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
            <ul className="  font-normal text-md ">
              <li className="py-5 cursor-pointer">
                <Link href="/" onClick={handleSmalleNavigation}>
                  Home
                </Link>
              </li>

              <li className="py-5 mt-[-30px] cursor-pointer">
                <Link href="../restaurants" onClick={handleSmalleNavigation}>
                  Restaurants
                </Link>
              </li>

              <li className="py-5 mt-[-30px] cursor-pointer">
                <Link href="/" onClick={handleSmalleNavigation}>
                  Contact
                </Link>
              </li>

              <li className="py-5 mt-[-30px] cursor-pointer relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center justify-center"
                >
                  Account
                  <ChevronDownIcon className="h-5 w-5 ml-1" />
                </button>
                {isDropDown && (
                  <div className="absolute top-0 mt-12 w-full bg-white rounded-lg shadow-lg">
                    {isLogin ? (
                      <>
                        <li>
                          <Link
                            href="../profile"
                            className="block px-4 py-2 text-[#4CAF50] hover:bg-gray-300"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="../"
                            className="block px-4 py-2 text-[#4CAF50] hover:bg-gray-300"
                            onClick={logout}
                          >
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            href="../login"
                            className="block px-4 py-2 text-[#4CAF50] hover:bg-gray-300"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="../register"
                            className="block px-4 py-2 text-[#4CAF50] hover:bg-gray-300"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
