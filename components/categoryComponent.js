import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ imageUrl, category }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-2 my-2 h-[240px]  transition-transform transform hover:-translate-x-1">
      <div className="h-[200px] w-full  relative overflow-hidden  mb-1 p-20">
        <CldImage
          src={imageUrl}
          className="h-full w-full object-cover object-center"
          priority
          fill={true}
        />
      </div>
      <div className="px-6 py-2">
        <div className="font-normal text-medium mb-1 text-center">
          {category}
        </div>
      </div>
    </div>
  );
}
