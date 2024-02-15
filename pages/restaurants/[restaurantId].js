"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

function RestaurantDetail() {
  const router = useRouter();
  const { restaurantId } = router.query || {};

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Reset error on new fetch

      try {
        const response = await axios.get(
          `https://fooddelivery-kappa.vercel.app/api/restaurants/${restaurantId}`
        );

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]); // Re-fetch on postId change

  if (error) {
    return <p>Error loading post: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Post not found</p>; // Handle non-existent post as well
  }

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <div
            id="top"
            className="h-[220px]  max-w-screen-2xl mx-auto flex flex-col justify-center p-7 lg:p-40  bg-center bg-cover bg-no-repeat "
            style={{ backgroundImage: `url(${data.imageUrl})` }}
          >
            <div className="max-w-sceen">
              <h1 className="text-3xl  text-white font-bold ">
                {data.restaurant_name}
              </h1>
              <br />
              <h4 className="text-xl   text-white font-normal ">
                {data.adress}
              </h4>
              <br />
            </div>
          </div>

          {data.menus.length === 0 ? (
            <div className="bg-gray-100">This restaurabt has no menu yet</div>
          ) : (
            data.menus.map((dt) => <p>{dt.menuItem}</p>)
          )}
        </>
      )}
      <Footer />
    </div>
  );
}
export default RestaurantDetail;
