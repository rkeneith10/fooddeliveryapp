"use client";
import axios from "axios";
import Image from "next/image";
//import { CldImage } from "next-cloudinary";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import avatar from "../../public/images/avatarr.png";
import Layout from "../layout";

export default function Profile() {
  const [userinfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://fooddelivery-kappa.vercel.app/api/users/userinfo"
        );
        const userinfoData = response.data.info;
        setUserInfo(userinfoData);
      } catch (error) {
        console.log("Error fetching data:", error);
        // Handle errors here
      }
    };

    fetchUserInfo();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const fullname = userinfo?.firstName
    ? `${userinfo.firstName} ${userinfo.lastName}`
    : "";

  return (
    <>
      <Layout>
        <div>
          <Head>
            <title>{fullname}</title>
            <meta
              name="description"
              content="The App that will change your life"
            />
          </Head>
          <div className="min-h-screen">
            <div className=" h-screen  max-w-screen-2xl mx-auto flex flex-col justify-center items-center p-7 lg:p-40  ">
              <div className="pt-5 pl-10 pr-5 bg-white rounded-md shadow-sm sm:w-full lg:w-[440px]  h-[500px] flex flex-col ">
                <div className="flex items-center border-b border-[#4CAF50] py-2">
                  <Image src={avatar} width={150} height={150} loader={lazy} />
                </div>

                <div className=" flex items-center  py-2">
                  <h2 className="text-lg font-medium">{fullname}</h2>
                </div>

                <div className=" flex items-center border-b border-[#4CAF50] py-2">
                  <p className="text-sm text-gray-500">{userinfo.email}</p>
                </div>

                <div className=" flex items-center border-b border-[#4CAF50] py-2">
                  <p className="text-sm text-gray-500">{userinfo.telephone}</p>
                </div>

                <div className=" flex items-center border-b border-[#4CAF50] py-2">
                  <p className="text-sm text-gray-500">{userinfo.adress}</p>
                </div>

                <Link href="/">
                  <div className="mt-6 bg-[#4CAF50] hover:bg-[#2D8A34] text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline text-center">
                    See all orders
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
