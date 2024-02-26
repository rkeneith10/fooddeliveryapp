import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../layout";

export default function Orders() {
  const [cart, setCart] = useState([]);

  const [isLog, setIsLog] = useState(false);
  const [infouser, setInfoUser] = useState({});
  const [fullName, setFullName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const tcheklog = localStorage.getItem("isLogin");
    if (tcheklog) {
      setIsLog(true);
    }

    const storeInfoUser = localStorage.getItem("userinfo");
    if (storeInfoUser) {
      setInfoUser(JSON.parse(storeInfoUser));
      const { firstName, lastName } = JSON.parse(storeInfoUser);
      setFullName(`${firstName} ${lastName}`);
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new CustomEvent("cartItemRemoved"));
  };
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalprice = calculateTotalPrice();

  const handlerPayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlerOrder = async (e) => {
    e.preventDefault();
    if (!isLog) {
      toast.warning("You have to login to place your order");
    } else {
      if (paymentMethod === "cash") {
        try {
          const response = await axios.post(
            "https://fooddelivery-kappa.vercel.app/api/orders",
            {
              restaurant_name: "boukanye code",
              menu_item_name: "manje",
              quantity: 12,
              price: 12,
              delivery_adress: "userinfo.adress",
            }
          );
          if (response.status === 200) {
            toast.success("Order place");
          } else {
            toast.error("Error placing order");
          }
        } catch (error) {
          toast.error("Error internal");
        }
      } else if (paymentMethod === "moncash") {
        toast.success("Moncash Payment-Function to be implemented soon");
      }
    }
  };

  return (
    <div>
      <Layout>
        <div>
          <ToastContainer />
        </div>

        <div className="bg-gray-50 min-h-screen">
          <div className="pt-10 pl-5 pr-5 lg:pl-20 lg:pr-20">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Restaurants
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
                  {cart.length === 0 ? (
                    <div className="flex justify-center ">
                      <p className="text-center font-semibold text-md italic">
                        No Item yet in the cart
                      </p>
                    </div>
                  ) : (
                    cart.map((item, index) => (
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
                          {item.restaurant}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          {item.quantity}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          <span>HTG</span> {item.price * item.quantity}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          <FaRegTrashCan
                            className="h-5 w-5 cursor-pointer text-red-600"
                            onClick={() => removeFromCart(index)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {totalprice !== 0 && (
                <p className="total-price font-bold text-md mt-4 float-right mr-5">
                  Total Price: <span>HTG</span> {totalprice}
                </p>
              )}
            </div>

            {cart.length !== 0 && (
              <>
                <div className="bg-white shadow-md rounded-sm mt-5 p-4">
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
                        value={fullName}
                        placeholder="Enter your FullName"
                        id="fullnaame"
                        name="fullname"
                        className="border rounded-md w-full p-2"
                        readonly
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
                        value={infouser.telephone}
                        placeholder="Enter your Phone Number"
                        id="phonenumber"
                        name="phonenumber"
                        readonly
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
                        value={infouser.adress}
                        placeholder="Enter your address"
                        id="address"
                        name="address"
                        className="border rounded-md w-full p-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mb-5 items-center ">
                    <h2 className="mr-4 font-semibold ">Payment method:</h2>
                    <div className="flex mr-4">
                      <input
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={() =>
                          handlerPayment({ target: { value: "cash" } })
                        }
                      />
                      <label for="cash">Cash on delivery</label>
                    </div>
                    <div className="flex">
                      <input
                        type="radio"
                        id="moncash"
                        name="paymentMethod"
                        value="moncash"
                        checked={paymentMethod === "moncash"}
                        onChange={() =>
                          handlerPayment({ target: { value: "moncash" } })
                        }
                      />
                      <label for="moncash">
                        <div className="h-[40px] w-[120px]  relative overflow-hidden ">
                          <CldImage
                            src="https://res.cloudinary.com/dpiizfdue/image/upload/v1708454667/x7yarfuns4bsvt8ogcra.jpg"
                            className="h-full w-full object-cover object-center"
                            priority
                            fill={true}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className=" items-end justify-end flex mb-10">
                    <button
                      type="submit"
                      className={`bg-[#4CAF50] text-white px-4 py-2 rounded `}
                      onClick={handlerOrder}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
