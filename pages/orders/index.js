import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../layout";

export default function Orders() {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fooddelivery-kappa.vercel.app/api/orderByUser"
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.data;
        setOrdersData(jsonData.all);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
  };

  return (
    <div>
      <Layout>
        <div>
          <Head>
            <title>Orders</title>
            <meta
              name="description"
              content="The App that will change your life"
            />
          </Head>
          <div className="pt-10 pl-5 pr-5 lg:pl-20 lg:pr-20">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Restaurants
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
                      Delivery Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date & Time
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Action</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {ordersData.length === 0 ? (
                    <div className="flex justify-center ">
                      <p className="text-center font-semibold text-md italic">
                        no oe
                      </p>
                    </div>
                  ) : (
                    ordersData.map((item, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          {item.restaurant_name.join(", ")}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          {item.menu_item_name.join(", ")}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          {item.quantity}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          {item.price}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          {item.delivery_adress}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          {item.paymentMethod}
                        </td>

                        <td className="text-left py-3 px-4 border-b border-gray-200">
                          {formatDateTime(item.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
