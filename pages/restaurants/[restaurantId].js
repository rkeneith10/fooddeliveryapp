const restaurantDetails = ({ restaurant }) => {
  return (
    <div>
      {restaurant.map((restodetail) => (
        <div key={restodetail._id}>
          <p>{restodetail.restaurat_name}</p>
        </div>
      ))}
    </div>
  );
};
export default restaurantDetails;

export async function getServerSideProps(context) {
  const { params } = context;
  const { restaurantId } = params;

  try {
    const response = await fetch(
      `https://fooddelivery-kappa.vercel.app/api/restaurantdetails?restauantId=${restaurantId}`
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
