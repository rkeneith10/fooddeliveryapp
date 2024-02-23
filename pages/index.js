import CategoryComponent from "@/components/categoryComponent";

import MenuItemComponent from "@/components/menuItemComponent";
import RestaurantComponent from "@/components/restaurantsComponent";
import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import BackImage1 from "../public/images/foodapp.PNG";
import Layout from "./layout";
export async function getServerSideProps() {
  const response = await fetch(
    "https://fooddelivery-kappa.vercel.app/api/categories"
  );

  const response1 = await fetch(
    "https://fooddelivery-kappa.vercel.app/api/restaurants"
  );
  const response2 = await fetch(
    "https://fooddelivery-kappa.vercel.app/api/menus"
  );
  try {
    const responseData = await response.json();
    const responseData1 = await response1.json();
    const responseData2 = await response2.json();

    const categories = responseData.all.map((category) => ({
      category: category.category,
      imageUrl: category.imageUrl,
    }));
    return {
      props: {
        categories,
        restaurants: responseData1.all,
        menus: responseData2.all,
      },
    };
  } catch (error) {
    console.log("Error fetch data", error);
    return {
      props: {
        categories: [],
        restaurants: [],
        menus: [],
      },
    };
  }
}

export default function index({ categories, restaurants, menus }) {
  return (
    <>
      <Layout>
        <div>
          <Head>
            <title>Food App Delivery</title>
            <meta
              name="description"
              content="The App that will change your life"
            />
          </Head>

          <div
            id="top"
            className="h-[400px]  max-w-screen-2xl mx-auto flex flex-col justify-center p-7 lg:p-40  bg-center bg-cover bg-no-repeat "
            style={{ backgroundImage: `url(${BackImage1.src})` }}
          >
            <div className="max-w-sceen">
              <h1 className="text-3xl  text-white font-bold ">
                FOOD APP DELIVERY
              </h1>
              <br />
              <h1 className="text-xl   text-white font-normal ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                cursus enim dapibus enim faucibus laoreet vel at sapien.
                Pellentesque hendrerit, ligula eget dignissim sagittis, nisi
                ipsum facilisis dolor, quis ultrices orci leo dignissim ligula.
              </h1>
              <br />
            </div>
          </div>
          <div className="p-10 bg-gray-50">
            <div className="text-xl font-semibold text-center mb-3">
              <span>Popular Categories</span>
            </div>
            <div className="flex overflow-x-auto">
              {categories.map((cat) => (
                <div key={cat._id} className=" flex-shrink-0 mr-2">
                  <Link
                    href={`/categories/menuByCategory?menuCategory=${cat.category}`}
                  >
                    <CategoryComponent
                      category={cat.category}
                      imageUrl={cat.imageUrl}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 bg-gray-100 mb-4">
            <div className="text-xl font-semibold text-center mb-3">
              <span>Top-sellings Menu items</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {menus.slice(0, 12).map((menu) => (
                <div key={menu._id}>
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

          <div className="p-10 bg-gray-50">
            <div className="text-xl font-semibold text-center mb-3">
              <span>Nearby Restaurants</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {restaurants.slice(0, 4).map((resto) => (
                <div key={resto._id}>
                  <Link href={`/restaurants/${resto._id}`}>
                    <RestaurantComponent
                      restaurant_name={resto.restaurant_name}
                      telephone={resto.telephone}
                      imageUrl={resto.imageUrl}
                      adress={resto.adress}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end mt-5">
              <Link href="/restaurants">
                <div className="px-4 py-2 bg-[#4CAF50] text-white rounded-md">
                  See more
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
