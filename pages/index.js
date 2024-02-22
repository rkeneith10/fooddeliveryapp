import CategoryComponent from "@/components/categoryComponent";
// import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";
import RestaurantComponent from "@/components/restaurantsComponent";
import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import BackImage1 from "../public/images/foodapp.PNG";
import Layout from "./layout";
export async function getStaticProps() {
  const response = await fetch(
    "https://fooddelivery-kappa.vercel.app/api/categories"
  );

  const response1 = await fetch(
    "https://fooddelivery-kappa.vercel.app/api/restaurants"
  );
  try {
    const responseData = await response.json();
    const responseData1 = await response1.json();
    return {
      props: {
        categories: responseData.all,
        restaurants: responseData1.all,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.log("Error fetch data", error);
    return {
      props: {
        categories: [],
        restaurants: [],
      },
      revalidate: 3600,
    };
  }
}

export default function index({ categories, restaurants }) {
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
            {/* Add other meta tags here */}
          </Head>
          {/* <Navbar /> */}
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
          <div className="p-10 bg-gray-100">
            <div className="text-xl font-semibold text-center mb-3">
              <span>Popular Categories</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <div key={cat._id}>
                  {/* <Link
                    href={`/categories/menuByCategory?menuCategory=${cat.category}`}
                  > */}
                  <CategoryComponent
                    category={cat.category}
                    imageUrl={cat.imageUrl}
                  />
                  {/* </Link> */}
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 bg-gray-50">
            <div className="text-xl font-semibold text-center mb-3">
              <span>Nearby Restaurants</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {restaurants.map((resto) => (
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
          </div>
          {/* <Footer /> */}
        </div>
      </Layout>
    </>
  );
}
