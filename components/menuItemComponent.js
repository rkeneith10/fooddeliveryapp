import { CldImage } from "next-cloudinary";

export default function MenuItemComponent({
  imageUrl,
  item_name,
  description,
  price,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-1 mb-2">
      <CldImage
        src={imageUrl}
        alt={item_name}
        className="w-full h-[160px] mb-1 rounded-lg"
      />
      <h3 className="text-xl font-semibold mb-1">{item_name}</h3>
      <p className="text-gray-700 mb-1">{description}</p>
      <p className="text-gray-800 font-semibold">HTG{price}</p>
    </div>
  );
}
