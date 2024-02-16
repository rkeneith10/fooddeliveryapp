import { CldImage } from "next-cloudinary";

export default function MenuItemComponent({
  imageUrl,
  item_name,
  description,
  price,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <CldImage
        src={imageUrl}
        alt={item_name}
        className="w-full h-auto mb-4 rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2">{item_name}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-800 font-bold">HTG{price}</p>
    </div>
  );
}
