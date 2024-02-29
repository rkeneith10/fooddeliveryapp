import { CldImage } from "next-cloudinary";
import { FaLocationDot } from "react-icons/fa6";
import { IoPhonePortraitOutline } from "react-icons/io5";

const RestaurantComponent = ({
  restaurant_name,
  adress,
  telephone,
  imageUrl,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full flex h-[200px]  transition-transform transform hover:-translate-x-1">
      <div className="w-1/3">
        <CldImage className="object-cover h-full w-full" src={imageUrl} />
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-2">{restaurant_name}</h2>
        <div className="flex items-center mb-2">
          <FaLocationDot className="h-5 w-5 text-gray-800 mr-2" />
          <p className="text-gray-700">{adress}</p>
        </div>
        <div className="flex items-center mb-2">
          <IoPhonePortraitOutline className="h-5 w-5 text-gray-800 mr-2" />
          <p className="text-gray-700">{telephone}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantComponent;
