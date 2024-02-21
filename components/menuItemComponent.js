import { CldImage } from "next-cloudinary";
import { FaStar } from "react-icons/fa";

export default function MenuItemComponent({
  imageUrl,
  item_name,
  description,
  price,
  randomRating,
}) {
  const renderStarRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`${
            i < randomRating ? "text-yellow-500" : "text-gray-300"
          }inline-block`}
        />
      );
    }
    return stars;
  };
  return (
    <div className="container mx-auto px-4 -y-8 bg-white shadow-md transition-transform transform hover:-translate-x-1 rounded-md cursor-pointer">
      <div className="flex flex-col items-center">
        <CldImage
          src={imageUrl}
          className="h-32 w-32 object-cover rounded-full mt-5"
        />
      </div>
      <div className="flex flex-col items-start">
        <h5 className="text-md font-semibold mb-1">{item_name}</h5>
        <div className="flex justify-between">
          <p className="text-gray-800 font-semibold">
            <span className="text-[#4CAF50]">HTG </span> {price}
          </p>
          <div className="flex items-center">{renderStarRating()}</div>
        </div>
      </div>
    </div>

    // <div className="cursor-pointer  transition-transform transform hover:-translate-x-1">
    //   <div className="bg-white  rounded-lg shadow-md p-1 mb-2">
    //     <div className="h-[200px] w-full relative overflow-hidden  mb-1">
    //       <CldImage
    //         src={imageUrl}
    //         alt={item_name}
    //         className="h-full w-full object-cover object-center"
    //         priority
    //         fill={true}
    //       />
    //     </div>
    //     <div className="p-3">
    //       <h5 className="text-md font-semibold mb-1">{item_name}</h5>

    //       <p className="text-gray-800 font-semibold">
    //         <span className="text-[#4CAF50]">HTG </span> {price}
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}
