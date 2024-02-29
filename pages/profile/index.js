import Head from "next/head";
//import Link from "next/link";

import Layout from "../layout";
export default function Profile({ userinfo }) {
  const fullname = `${userinfo.firstName} ${userinfo.lastName}`;
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
          <div>{userinfo.firstName}</div>
          <div>{userinfo.telephone}</div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      "https://fooddelivery-kappa.vercel.app/api/users/userinfo"
    );
    const responseData = await response.json();
    console.log(responseData);
    return {
      props: {
        userinfo: responseData.info,
      },
    };
  } catch (error) {
    console.log("Error fetch data", error);
    return {
      props: {
        userinfo: {},
      },
    };
  }
}
