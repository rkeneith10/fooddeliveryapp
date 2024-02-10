import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ imageUrl, category }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-2 my-2 h-[300px] md:h-[240px]">
      <div className="px-6 py-2 mt-4">
        <CldImage src={imageUrl} className="w-full h-[160px] rounded-full" />
      </div>
      <div className="px-6 py-4">
        <div className="font-medium text-xl mb-1 text-center">{category}</div>
      </div>
    </div>
  );
}
