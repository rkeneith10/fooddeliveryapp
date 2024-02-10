import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ imageUrl, category }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-2 my-4 h-[150px]">
      <div className="px-6 py-2">
        <CldImage src={imageUrl} className="w-full h-[100px] rounded-full" />
      </div>
      <div className="px-6 py-4">
        <div className="font-normal text-xl mb-1">{category}</div>
      </div>
    </div>
  );
}
