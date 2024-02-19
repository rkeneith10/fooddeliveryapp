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
          <div className="p-10 bg-white mt-10 mb-20 rounded-md overflow-x-scroll max-w-screen">
            <div className="">
              <table className="w-full bg-white rounded-sm">
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
                        <div className="h-16 w-16 relative overflow-hidden">
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
                        <span>HTG</span> {item.price * item.quantity}
                      </td>
                      <td className="text-left py-3 px-4 border-b border-gray-200">
                        <FaRegTrashCan className="h-5 w-5 cursor-pointer text-red-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="font-bold text-md mt-4 float-right">
              Total Price: <pan>HTG</pan> {calculateTotalPrice()}
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
}
