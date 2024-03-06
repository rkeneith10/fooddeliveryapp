import axios from "axios";
import { CldImage } from "next-cloudinary";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
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
                <div className="w-full lg:mb-4 sm:w-1/3 flex justify-center items-center mb-4">
                  <CldImage
                    className="rounded-full h-48 w-48 object-cover border-2 border-gray-700"
                    src={`https://res.cloudinary.com/dpiizfdue/image/upload/v1709340659/uwost15aq98rhgkgqni1.png`} // Replace with your profile image
                    alt="Profile picture"
                  />
                </div>
                <div className="w-full sm:w-2/3 mt-6 sm:mt-0 pl-4 sm:pl-8 sm:items-center sm:justify-center">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {fullname}
                  </h1>
                  <div className="mb-4">
                    <div className="relative flex items-center mb-2">
                      <FaEnvelope className="absolute left-4 text-gray-700 h-4 w-4 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={userinfo.email}
                        id="email"
                        name="email"
                        readOnly
                        className="border rounded-md pl-10 w-full p-2 text-gray-700 " // Adjust left padding for icon
                      />
                    </div>
                    <div className="relative flex items-center mb-2">
                      <FaMapMarkerAlt className="absolute left-4 text-gray-700 h-4 w-4 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={userinfo.adress}
                        id="address"
                        name="address"
                        readOnly
                        className="border rounded-md pl-10 w-full p-2 text-gray-700 "
                      />
                    </div>
                    <div className="relative flex items-center">
                      <FaPhone className="absolute left-4 text-gray-700 h-4 w-4 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={userinfo.telephone}
                        id="telephone"
                        name="telephone"
                        readOnly
                        className="border rounded-md pl-10 w-full p-2 text-gray-700"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-5">
                    <Link href="/orders">
                      <div className="px-4 py-2 bg-[#4CAF50] text-white rounded-md">
                        See all orders
                      </div>
                    </Link>
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
