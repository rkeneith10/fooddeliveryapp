import { CldImage } from "next-cloudinary";

const RestaurantComponent = ({
  restaurant_name,
  adress,
  telephone,
  imageUrl,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full flex h-[200px]">
      <div className="w-1/3">
        <CldImage className="object-cover h-full w-full" src={imageUrl} />
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-2">{restaurant_name}</h2>
        <p className="text-gray-700 mb-2">{adress}</p>
        <p className="text-gray-700 mb-2">{telephone}</p>
      </div>
    </div>
  );
};

export default RestaurantComponent;
