import { CldImage } from "next-cloudinary";
import { FaStar } from "react-icons/fa";

export default function MenuItemComponent({
  imageUrl,
  item_name,
  description,
  price,
}) {
  const generateRandomRating = () => {
    return (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  };
  const randomRating = generateRandomRating();

  return (
    <div className="container mx-auto px-4 -y-8 bg-white shadow-md transition-transform transform hover:-translate-x-1 rounded-md cursor-pointer">
      <div className="flex flex-col items-center">
        <CldImage
          src={imageUrl}
          className="h-32 w-32 object-cover rounded-full mt-5"
        />
        <h6 className="text-sm font-semibold mb-1">{item_name}</h6>
        <div className="flex flex-row justify-between ">
          <div className="flex items-center mr-10">
            <p className="text-gray-800 font-semibold text-sm">
              <span className="text-[#4CAF50]">HTG </span> {price}
            </p>
          </div>
          <div className="flex items-center justify-end">
            <FaStar className="text-yellow-500 w-3 h-3" />
            <span className="text-yellow-500 font-semibold text-sm ml-1">
              {randomRating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
