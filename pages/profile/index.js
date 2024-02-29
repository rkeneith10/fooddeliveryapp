"use client";
import axios from "axios";
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
          <div className="min-h-screen">
            <div>{userinfo?.firstName || "No First Name Available"}</div>
            <div>{userinfo?.telephone || "No Telephone Available"}</div>
          </div>
        </div>
      </Layout>
    </>
  );
}
