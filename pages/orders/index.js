"use client";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";

export default function Orders() {
  const [cart, setCart] = useState([]);

  // Récupérer les éléments du panier au chargement du composant
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

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
          <div className="p-10">
            <table className="min-w-full bg-white border border-gray-300 rounded-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Items</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      <div className="flex flex-row justify-around">
                        <div className="h-[100px] w-full  relative overflow-hidden">
                          <CldImage
                            src={item.imageUrl}
                            className="h-full w-full object-cover object-center rounded-full"
                            priority
                            fill={true}
                          />
                        </div>
                        <div>{item.name}</div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-bold text-md">
              Total Price: {calculateTotalPrice()}
            </p>
          </div>

          {/* <div className="pt-5 pl-10 pr-5 bg-white rounded-md shadow-sm sm:w-full lg:w-[440px] h-auto flex flex-col">
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
                <p>Total Price: {calculateTotalPrice()}</p>
                <div className="items-center">
                  <button
                    className="bg-[#4CAF50] w-full py-2 text-white"
                    onClick={handleOrderPlacement}
                  >
                    Place your Order
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </Layout>
    </div>
  );
}
