import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import Layout from "../layout";

function MenuItem({ data, error }) {
  const [count, setCount] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const addToCart = () => {
    const cartItem = {
      id: data._id, // Ajoutez ici l'identifiant unique de l'élément
      name: data.item_name,
      price: data.price,
      quantity: count,
      specialRequest: specialRequest,
    };

    // Récupérez le panier existant depuis le stockage local
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ajoutez le nouvel élément au panier
    const updatedCart = [...existingCart, cartItem];

    // Mettez à jour le panier dans le stockage local
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Réinitialisez les champs
    setCount(1);
    setSpecialRequest("");

    alert("Item added to cart!");
  };

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
                <div className="flex flex-row justify-between mb-4">
                  <h4 className="font-bold ">Price</h4>
                  <p className="font-bold">
                    <span className="text-[#4CAF50]">HTG </span>
                    {data.price}
                  </p>
                </div>

                <div class="border-t border-gray-300 mb-4"></div>

                <div className="text-md font-semibold">Special request</div>

                <div className="mb-3">
                  <textarea
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Your preferences or requests"
                    class="w-full h-32 px-3 py-2 text-base placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-[#4CAF50]"
                  ></textarea>
                </div>

                <div className="flex flex-row justify-between mb-4">
                  <button
                    onClick={decrement}
                    className="bg-gray-300 px-4 py-2 text-white text-xl  rounded-sm"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="px-4 py-2 w-16 text-center border border-gray-300 focus:outline-none"
                    value={count}
                    readOnly
                  />
                  <button
                    onClick={increment}
                    className="bg-[#4CAF50] px-4 py-2 text-white text-xl rounded-sm"
                  >
                    +
                  </button>
                </div>

                <div className="items-center">
                  <button className="bg-[#4CAF50] w-full py-2 text-white ">
                    Add to Cart
                  </button>
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
