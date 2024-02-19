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

        <div className="bg-gray-100">
          <div className="pt-10 pl-5 pr-5 lg:pl-20 lg:pr-20">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50">
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
              <p className="total-price font-bold text-md mt-4 float-right mr-5">
                Total Price: <span>HTG</span> {calculateTotalPrice()}
              </p>
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="nom"
                    className="block  text-medium font-normal"
                  >
                    FullName
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your FullName"
                    id="fullnaame"
                    name="fullname"
                    className="border rounded-md w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nom"
                    className="block text-medium font-normal"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Phone Number"
                    id="phonenumber"
                    name="phonenumber"
                    className="border rounded-md w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nom"
                    className="block text-medium font-normal"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    id="address"
                    name="address"
                    className="border rounded-md w-full p-2"
                  />
                </div>
              </div>
            </div>
            <div className=" justify-end mb-10">
              <button
                type="submit"
                className={`bg-[#4CAF50] text-white px-4 py-2 rounded `}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
