"use client";
import MenuItemComponent from "@/components/menuItemComponent";
import axios from "axios";
import Layout from "../layout";
export async function getServerSideProps({ query }) {
  const { menuCategory } = query || {};

  let data = null;
  let error = null;

  try {
    const response = await axios.get(
      `https://fooddelivery-kappa.vercel.app/api/categories/ctgr?menuCategory=${menuCategory}`
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

export default function MenuByCategory({ data, error }) {
  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (!data) {
    return <p>Restaurant not found</p>; // Handle non-existent post as well
  }
  return (
    <div>
      <Layout>
        <Head>
          <title>{data.category}</title>
          <meta name="description" content={data.category} />
          {/* Add other meta tags here */}
        </Head>
        <div className="min-h-screen bg-gray-50">
          <div className="p-15">
            <div className="flex justify-center mb-6">
              <p className="text-center font-medium text-md">
                Menu for the category...
              </p>
            </div>
            <div className="bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {data.ll.map((menuItem) => (
                  <Link
                    href={`/menu/menuItem?menuItemId=${menuItem.menuItemId}`}
                  >
                    <MenuItemComponent
                      item_name={menuItem.item_name}
                      price={menuItem.price}
                      imageUrl={menuItem.imageUrl}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
