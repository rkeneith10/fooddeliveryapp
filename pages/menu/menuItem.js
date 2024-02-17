import axios from "axios";
import { CldImage } from "next-cloudinary";
import Layout from "../layout";

function MenuItem({ data, error }) {
  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (!data) {
    return <p>Restaurant not found</p>; // Handle non-existent post as well
  }

  return (
    <div>
      <Layout>
        <div className=" h-auto  max-w-screen-2xl mx-auto flex flex-col justify-center items-center  ">
          <div className="pt-5 pl-10 pr-5 bg-gray-200 rounded-md shadow-sm sm:w-full lg:w-[440px]  h-auto flex flex-col">
            <div>
              <CldImage src={data.imageUrl} className="w-full h-[200px] mb-4" />

              <div className="p-7 lg:p-20">
                <h3 className="font-bold text-xl text-gray-900">
                  Information about the order
                </h3>

                <p className="font-normal text-md">
                  You are placing an order with {data.restaurant_name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="p-20">
          <p>{data.restaurant_name}</p>
          <p>{data.item_name}</p>
          <p>{data.price}</p>
        </div> */}
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { menuItemId } = query || {};

  let data = null;
  let error = null;

  try {
    const response = await axios.get(
      `https://fooddelivery-kappa.vercel.app/api/menus/menuId?menuItemId=${menuItemId}`
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

export default MenuItem;
