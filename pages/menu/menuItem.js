"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";

function MenuItem({ data, error }) {
  const [count, setCount] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);

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
      id: data._id,
      name: data.item_name,
      price: data.price,
      quantity: count,
      specialRequest: specialRequest,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = [...existingCart, cartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartItemAdded"));

    setCount(1);
    setSpecialRequest("");

    toast.success("Item added to cart!");
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
    window.addEventListener("cartItemAdded", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
    });

    return () => {
      window.removeEventListener("cartItemAdded", null);
    };
  }, []);

  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (!data) {
    return <p>Restaurant not found</p>; // Handle non-existent post as well
  }

  return (
    <div>
      <Layout>
        <div>
          {" "}
          <ToastContainer />
        </div>
        <div className=" h-auto  max-w-screen-2xl mx-auto flex flex-col justify-center items-center bg-gray-200  ">
          <div className="pt-5 pl-10 pr-5 bg-white rounded-md shadow-sm sm:w-full lg:w-[440px]  h-auto flex flex-col">
            <div>
              <CldImage src={data.imageUrl} className="w-full h-[200px] mb-2" />

              <div className="p-4">
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {data.item_name}
                </h3>
                <div className="flex flex-row justify-between mb-2">
                  <h4 className="font-bold ">Price</h4>
                  <p className="font-bold">
                    <span className="text-[#4CAF50]">HTG </span>
                    {data.price}
                  </p>
                </div>

                <div class="border-t border-gray-300 mb-2"></div>

                <div className="text-md font-semibold">Special request</div>

                <div className="mb-2">
                  <textarea
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Your preferences or requests"
                    class="w-full h-20 px-3 py-2 text-base placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-[#4CAF50]"
                  ></textarea>
                </div>

                <div className="flex flex-row justify-between mb-2">
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
                  <button
                    className="bg-[#4CAF50] w-full py-2 text-white "
                    onClick={addToCart}
                  >
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
