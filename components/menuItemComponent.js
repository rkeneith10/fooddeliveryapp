import { CldImage } from "next-cloudinary";

export default function MenuItemComponent({
  imageUrl,
  item_name,
  description,
  price,
  item_id,
}) {
  return (
    <div className="cursor-pointer  transition-transform transform hover:-translate-x-1 w-[170px]">
      <div className="bg-white  rounded-lg shadow-md p-1 mb-2">
        <div className="h-[200px] w-full relative overflow-hidden  mb-1">
          <CldImage
            src={imageUrl}
            alt={item_name}
            className="h-full w-full object-cover object-center"
            priority
            fill={true}
          />
        </div>
        <div className="p-3">
          <h5 className="text-md font-semibold mb-1">{item_name}</h5>

          <p className="text-gray-800 font-semibold">
            <span className="text-[#4CAF50]">HTG </span> {price}
          </p>
        </div>
      </div>
    </div>
  );
}
