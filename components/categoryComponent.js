//import { CldImage } from "next-cloudinary";
import Image from "next/image";

export default function CategoryComponent(imageUrl, category) {
  return (
    <div className="bg-white rounded shadow-md justify-center items-center h-[100px] w-[100px] p-5 flex flex-col">
      <Image src={imageUrl} className="w-full h-[70px] rounded-full " />
      <p className="text-sm mt-5">{category}</p>
    </div>
  );
}
