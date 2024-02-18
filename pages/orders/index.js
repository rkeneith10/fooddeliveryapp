"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";

export default function Orders() {
  const getCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
  };
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
              <div className="p-4">
                <h2>Information about the Order</h2>
                {/* <h3>You are currenly placing an order with{}</h3> */}

                <div>
                  {getCartItems().map((item, index) => (
                    <div key={index}>
                      <h2>{item.name}</h2>
                      <div className="flex flex-row justify-between">
                        <h3>Price</h3>
                        {item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                  <div className="items-center">
                    <button className="bg-[#4CAF50] w-full py-2 text-white ">
                      Place your Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
