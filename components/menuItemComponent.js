import { CldImage } from "next-cloudinary";
import { useRouter } from "next/router";

export default function MenuItemComponent({
  imageUrl,
  item_name,
  description,
  price,
  item_id,
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`../menu/${item_id}`);
  };
  return (
    <div onClick={handleClick}>
      <div className="bg-white rounded-lg shadow-md p-1 mb-2">
        <CldImage
          src={imageUrl}
          alt={item_name}
          className="w-full h-[130px] mb-1 "
        />
        <h5 className="text-xl font-semibold mb-1">{item_name}</h5>
        <p className="text-gray-700 mb-1">{description}</p>
        <p className="text-gray-800 font-semibold">HTG {price}</p>
        <p className="hidden">{item_id}</p>
      </div>
    </div>
  );
}
