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

  // Call the function to get a random rating
  const randomRating = generateRandomRating();

  return (
    <div className="container mx-auto px-4 -y-8 bg-white shadow-md transition-transform transform hover:-translate-x-1 rounded-md cursor-pointer">
      <div className="flex flex-col items-center">
        <CldImage
          src={imageUrl}
          className="h-32 w-32 object-cover rounded-full mt-5"
        />
      </div>
      <div className="flex flex-col items-start">
        <h6 className="text-sm font-semibold mb-1">{item_name}</h6>
        <div className="flex justify-between">
          <p className="text-gray-800 font-semibold text-sm">
            <span className="text-[#4CAF50]">HTG </span> {price}
          </p>
          <div className="flex items-center">
            {/* Display the random rating followed by star icon */}
            <span className="text-yellow-500 font-semibold text-sm mr-1">
              {randomRating}
            </span>
            <FaStar className="text-yellow-500 w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
