const restaurantDetails = ({ restaurantDetails }) => {
  if (!restaurantDetails) {
    return <div>Loading...</div>;
  }
  console.log(restaurantDetails);
  const { restaurant } = restaurantDetails;
  console.log(restaurant);
  s;
  return (
    <div>
      <p>{restaurant.restaurant_name}</p>
      <p>{restaurant.telephone}</p>

      <p>{restaurant.adress}</p>
    </div>
  );
};
export default restaurantDetails;

export async function getServerSideProps(context) {
  const { params } = context;
  const { restaurantId } = params;

  try {
    const response = await fetch(
      `https://fooddelivery-kappa.vercel.app/api/restaurantdetails?restaurantId=${restaurantId}`
    );
    const restaurantDetails = await response.json();
    return {
      props: {
        restaurantDetails,
      },
    };
  } catch (error) {
    console.error("Error fetching restaurant details", error);
    return {
      props: {
        restaurantDetails: null,
      },
    };
  }
}
