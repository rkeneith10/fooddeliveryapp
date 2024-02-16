import { CldImage } from "next-cloudinary";

export default function MenuItemComponent({
  imageUrl,
  item_name,
  description,
  price,
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-2 my-2 h-[250px] md:h-[240px]">
      <div className="px-6 py-2 mt-2">
        <CldImage src={imageUrl} className="w-[150px] h-[150px] rounded-lg" />
      </div>
      <div className="px-6 py-2">
        <div className=" mb-1 text-center flex">
          <h5>{item_name}</h5>
          <p>{description}</p>
          <p>HTG{price}</p>{" "}
        </div>
      </div>
    </div>
  );
}
