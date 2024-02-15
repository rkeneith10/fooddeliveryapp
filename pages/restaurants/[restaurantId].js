import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import axios from "axios";
import Head from "next/head";
import "tailwindcss/tailwind.css";

function RestaurantDetail({ data, error }) {
  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (!data) {
    return <p>Post not found</p>; // Handle non-existent post as well
  }

  return (
    <div>
      <Head>
        <title>{data.restaurant_name}</title>
        <meta name="description" content={data.restaurant_name} />
        {/* Add other meta tags here */}
      </Head>
      <Navbar />
      <div
        id="top"
        className="h-[220px] max-w-screen-2xl mx-auto flex flex-col justify-center p-7 lg:p-40 bg-center bg-cover bg-no-repeat relative"
        style={{
          backgroundImage: `url(${data.imageUrl})`,
        }}
      >
        {/* Overlay to improve text readability */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          aria-hidden="true"
        />

        <div className="max-w-sceen relative z-10">
          <h1 className="text-3xl text-white font-bold ">
            {data.restaurant_name}
          </h1>
          <br />
          <h4 className="text-xl text-white font-normal ">{data.adress}</h4>
          <h4 className="text-xl text-white font-normal ">{data.telephone}</h4>
          <br />
        </div>
      </div>

      {data.menus.length === 0 ? (
        <div className="bg-gray-100 p-4 text-center">
          This restaurant currently has no menu available.
        </div>
      ) : (
        data.menus.map((dt) => (
          <>
            <div className="p-5 bg-gray-100">
              {" "}
              <p>{dt.item_name}</p>
              <p>{dt.description}</p>
            </div>
          </>
        ))
      )}
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { restaurantId } = context.query || {};
  let data = null;
  let error = null;

  try {
    const response = await axios.get(
      `https://fooddelivery-kappa.vercel.app/api/restaurants/${restaurantId}`
    );

    data = response.data;
  } catch (err) {
    error = err.message;
  }

  return {
    props: {
      data,
      error,
    },
  };
}

export default RestaurantDetail;
