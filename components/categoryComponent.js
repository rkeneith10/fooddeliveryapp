import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ imageUrl, category }) {
  return (
    <div className="container mx-auto px-4 -y-8 bg-white  transition-transform transform hover:-translate-x-1 shadow-md  rounded-md">
      <div className="flex flex-col items-center">
        <CldImage
          src={imageUrl}
          className="h-20 w-20 object-cover rounded-full mt-3"
        />
        <div className="text-center mt-2 mb-1">
          <p className="font-normal text-md">{category}</p>
        </div>
      </div>
    </div>
  );
}
