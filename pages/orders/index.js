"use client";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
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
          <div className="p-10 bg-white mt-10 mb-20">
            <table className="w-full overflow-x-scroll max-width-1000px bg-white rounded-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-weight-bold">
                    Image
                  </th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-weight-bold">
                    Items
                  </th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-weight-bold">
                    Quantity
                  </th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-weight-bold">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-weight-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      <div className="h-[50px] w-[50px]  relative overflow-hidden ">
                        <CldImage
                          src={item.imageUrl}
                          className="h-full w-full object-cover object-center rounded-full"
                          priority
                          fill={true}
                        />
                      </div>
                    </td>
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      {item.name}
                    </td>
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      {item.quantity}
                    </td>
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      {item.price * item.quantity}
                    </td>

                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      <FaRegTrashCan className="h-5 w-5 cursor-pointer text-red-600" />
                    </td>
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
