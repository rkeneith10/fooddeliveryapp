import axios from "axios";
import Head from "next/head";
import Layout from "../layout";

export default function Profile({ userinfo }) {
  const fullname = userinfo?.firstName
    ? `${userinfo.firstName} ${userinfo.lastName}`
    : ""; // Handle missing firstName

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

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "https://fooddelivery-kappa.vercel.app/api/users/userinfo"
    );

    const userinfo = response.data.info;

    console.log(userinfo);
    return {
      props: {
        userinfo,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        userinfo: {}, // Return an empty object in case of errors
      },
    };
  }
}
