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
        <div className=" h-auto  max-w-screen-2xl mx-auto flex flex-col justify-center items-center bg-gray-200  ">
          <div className="pt-5 pl-10 pr-5 bg-white rounded-md shadow-sm sm:w-full lg:w-[440px]  h-auto flex flex-col">
            <div>
              <CldImage src={data.imageUrl} className="w-full h-[200px] mb-4" />

              <div className="p-4">
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {data.item_name}
                </h3>
                <div className="flex flex-row justify-between">
                  <h4>Price</h4>
                  <p>
                    <span>HTG</span>
                    {data.price}
                  </p>
                </div>

                <div className="text-md font-semibold">Special request</div>

                <div>
                  <textarea class="w-full h-32 px-3 py-2 text-base placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
                </div>
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