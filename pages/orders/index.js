import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";

export default function Orders() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Layout>
        <div className="toast-container">
          <ToastContainer />
        </div>
        <div className="max-w-screen-lg mx-auto p-10">
          <table className="w-full sm:overflow-x-auto mx-auto bg-white rounded-sm">
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
        <p className="total-price font-bold text-md mt-4 float-right">
          Total Price: <span>HTG</span> {calculateTotalPrice()}
        </p>
      </Layout>
    </div>
  );
}
