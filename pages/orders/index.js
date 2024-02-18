"use client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";

export default function Orders() {
  const [cart, setCart] = useState([]);

  // Fonction pour récupérer les éléments du panier
  const getCartItems = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  // Mettre à jour le panier
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Calculer le prix total du panier
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Gérer le placement de la commande
  const handleOrderPlacement = () => {
    // Logique pour passer la commande
    console.log("Order placed!");
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
                {cart.map((item, index) => (
                  <div key={index}>
                    <h2>{item.name}</h2>
                    <div className="flex flex-row justify-between">
                      <h3>Price</h3>
                      <span>{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
                <div className="items-center">
                  <button className="bg-[#4CAF50] w-full py-2 text-white">
                    Place your Order
                  </button>
                  <p>Total Price: {calculateTotalPrice()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
