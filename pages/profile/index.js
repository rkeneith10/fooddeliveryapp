"use client";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Image
                  className="w-20 h-20 rounded-full mr-4"
                  src="https://res.cloudinary.com/dpiizfdue/image/upload/v1709246890/tfgmdtyuqxy9hzoj9esy.png" // Replace with your profile image URL
                  alt="Profile picture"
                />
                <div className="text-lg font-medium">{`${userinfo.firstName} ${userinfo.lastName}`}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-medium">Email:</div>
                <div>{userinfo.email}</div>
                <div className="font-medium">Address:</div>
                <div>{userinfo.adress}</div>s
                <div className="font-medium">Phone:</div>
                <div>{userinfo.telephone}</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
