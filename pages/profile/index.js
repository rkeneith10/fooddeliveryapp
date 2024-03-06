"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../layout";

export default function Profile() {
  const [userinfo, setUserInfo] = useState({});
  //   <CldImage
  //   src={`https://res.cloudinary.com/dpiizfdue/image/upload/v1709340659/uwost15aq98rhgkgqni1.png`}
  //   width={100}
  //   height={100}
  // />

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
                    className="rounded-full h-48 w-48 object-cover border border-gray-200"
                    src={`https://res.cloudinary.com/dpiizfdue/image/upload/v1709340659/uwost15aq98rhgkgqni1.png`} // Replace with your profile image
                    alt="Profile picture"
                  />
                </div>
                <div className="w-full sm:w-2/3 mt-6 sm:mt-0 pl-4 sm:pl-8">
                  <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
                  <p className="text-gray-600">{fullname}</p>
                  <p className="text-gray-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc eget urna et elit gravida blandit.
                  </p>
                  <div className="mt-4 flex items-center space-x-4">
                    <a
                      href="mailto:johndoe@example.com"
                      className="inline-flex px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 15a4 4 0 0 0 0-8 4 4 0 0 0 0  8zM3 21a6 6 0 0 1 6 6h9a6 6"
                        />
                      </svg>
                      johndoe@example.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
