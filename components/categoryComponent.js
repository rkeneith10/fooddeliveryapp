import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ imageUrl, category }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-2 my-2 h-[250px] md:h-[240px]">
      <div className="px-6 py-2 mt-2">
        <CldImage
          src={imageUrl}
          width={150}
          height={150}
          className="rounded-lg"
        />
      </div>
      <div className="px-6 py-2">
        <div className="font-medium text-medium mb-1 text-center">
          {category}
        </div>
      </div>
    </div>
  );
}
