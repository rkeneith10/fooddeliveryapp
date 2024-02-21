import Head from "next/head";
import Link from "next/link";
import RestaurantComponent from "../../components/restaurantsComponent";
import Layout from "../layout";

export async function getStaticProps() {
  const response1 = await fetch(
    "https://fooddelivery-kappa.vercel.app/api/restaurants"
  );
  try {
    const responseData1 = await response1.json();
    return {
      props: {
        restaurants: responseData1.all,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.log("Error fetch data", error);
    return {
      props: {
        restaurants: [],
      },
      revalidate: 3600,
    };
  }
}

export default function Restaurant({ restaurants }) {
  return (
    <>
      <Layout>
        <div>
          <Head>
            <title>Restaurants</title>
            <meta
              name="description"
              content="The best restaurants in the city"
            />
            {/* Add other meta tags here */}
          </Head>
          <div className="min-h-screen bg-gray-50">
            <div className="p-10">
              <div className="flex justify-center mb-6">
                <p className="text-center font-medium text-md">
                  The best restaurants in the city
                </p>
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
          </div>
        </div>
      </Layout>
    </>
  );
}
