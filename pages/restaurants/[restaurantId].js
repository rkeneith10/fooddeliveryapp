"use client";

import MenuItemComponent from "@/components/menuItemComponent";

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import BackgoundImg from "../../public/images/resto.JPG";
import Layout from "../layout";

function RestaurantDetail({ data, error }) {
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (data && data.menus.length > 0) {
      setActiveCategory(data.menus[0].category);
    }
  }, [data]);
  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (!data) {
    return <p>Restaurant not found</p>; // Handle non-existent post as well
  }

  const categoriesWithMenus = data.menus.reduce((categories, menu) => {
    if (!categories.includes(menu.category)) {
      categories.push(menu.category);
    }
    return categories;
  }, []);
  // const getRandomRating = () => {
  //   Math.floor(Math.random() * 3) + 3;
  // };

  return (
    <div>
      <Layout>
        <Head>
          <title>{data.restaurant_name}</title>
          <meta name="description" content={data.restaurant_name} />
          {/* Add other meta tags here */}
        </Head>

        <div
          id="top"
          className="h-[220px] max-w-screen-2xl mx-auto flex flex-col justify-center p-7 lg:p-40 bg-center bg-cover bg-no-repeat relative "
          style={{
            backgroundImage: `url(${BackgoundImg.src})`,
          }}
        >
          <div
            className="absolute inset-0 bg-black opacity-50 p-5"
            aria-hidden="true"
          >
            <div className="max-w-sceen relative">
              <h1 className="text-3xl text-white font-bold ">
                {data.restaurant_name}
              </h1>
              <br />
              <h4 className="text-xl text-white font-normal ">{data.adress}</h4>
              <h4 className="text-xl text-white font-normal ">
                {data.telephone}
              </h4>
              <br />
            </div>
          </div>
        </div>

        <div className="min-h-screnn">
          {categoriesWithMenus.length === 0 ? (
            <div
              className={`bg-gray-100 p-4 text-center
            `}
            >
              This restaurant currently has no menu available.
            </div>
          ) : (
            <div className="flex overflow-x-auto space-x-4 p-4 ">
              {categoriesWithMenus.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`p-2 rounded ${
                    category === activeCategory
                      ? "bg-[#4CAF50] text-white"
                      : "border border-[#4CAF50] text-[#4CAF50] bg-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {activeCategory && (
            <div className="bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {data.menus
                  .filter((menu) => menu.category === activeCategory)
                  .map((menu, menuIndex) => (
                    <div key={menuIndex} className="p-8 ">
                      <Link href={`/menu/menuItem?menuItemId=${menu._id}`}>
                        <MenuItemComponent
                          item_name={menu.item_name.slice(0, 15)}
                          imageUrl={menu.imageUrl}
                          description={menu.description}
                          price={menu.price}
                        />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { restaurantId } = context.query || {};
  console.log("resto " + restaurantId);
  let data = null;
  let error = null;

  try {
    const response = await axios.get(
      `https://fooddelivery-kappa.vercel.app/api/restaurants/${restaurantId}`
    );

    data = response.data;
  } catch (err) {
    error = err.message;
  }

  return {
    props: {
      data,
      error,
    },
  };
}

export default RestaurantDetail;
