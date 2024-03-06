"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import Head from "next/head";
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
          <div className="bg-gray-100 min-h-screen font-sans pb-20">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="w-full sm:w-1/3 flex justify-center items-center">
                  <CldImage
                    className="rounded-full h-48 w-48 object-cover border border-white"
                    src={`https://res.cloudinary.com/dpiizfdue/image/upload/v1709340659/uwost15aq98rhgkgqni1.png`} // Replace with your profile image
                    alt="Profile picture"
                  />
                </div>
                <div className="w-full sm:w-2/3 mt-6 sm:mt-0 pl-4 sm:pl-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {fullname}
                  </h1>
                  <p className="text-gray-600">{fullname}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
