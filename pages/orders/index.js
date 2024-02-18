"use client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";

export default function Orders() {
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
  };

  // Calcul du prix total
  const calculateTotalPrice = () => {
    const cartItems = getCartItems();
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  return (
    <div>
      <Layout>
        <div>
          <ToastContainer />
        </div>
        <div className="h-auto max-w-screen-2xl mx-auto flex flex-col justify-center items-center bg-gray-200">
          <div className="pt-5 pl-10 pr-5 bg-white rounded-md shadow-sm sm:w-full lg:w-[440px] h-auto flex flex-col">
            <div>
              <div className="p-4">
                <h2>Information about the Order</h2>
                {/* <h3>You are currently placing an order with {user}.</h3> */}
                {getCartItems().map((item, index) => (
                  <div key={index}>
                    <h2>{item.name}</h2>
                    <div className="flex flex-row justify-between">
                      <h3>Price</h3>
                      <span>{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
                <div className="items-center">
                  {totalPrice > 0 ? (
                    <button className="bg-[#4CAF50] w-full py-2 text-white">
                      Place your Order
                    </button>
                  ) : (
                    <p>Your cart is empty</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
