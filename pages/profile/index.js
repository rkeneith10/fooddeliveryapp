"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
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
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center">
                  <CldImage
                    src={`https://res.cloudinary.com/dpiizfdue/image/upload/v1709246890/tfgmdtyuqxy9hzoj9esy.png`}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{fullname}</h2>
                    <p className="text-gray-600">{userinfo.telephone}</p>
                    <p className="text-gray-600">{userinfo.email}</p>
                    <p className="text-gray-600">{userinfo.adress}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="#">
                    <div className="px-4 py-2 bg-[#4CAF50] text-white rounded-md">
                      Orders
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
