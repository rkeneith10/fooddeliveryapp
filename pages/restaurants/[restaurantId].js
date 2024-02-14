"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function RestaurantDetail() {
  const router = useRouter();
  const { restaurantId } = router.query;

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
      <h1>{data.restaurant_name}</h1>
      <p>{data.adress}</p>
      {/* ... display other fields */}
    </div>
  );
}
export default RestaurantDetail;
