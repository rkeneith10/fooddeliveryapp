import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ imageUrl, category }) {
  return (
    <div className="container mx-auto px-4 -y-8 bg-white  transition-transform transform hover:-translate-x-1 shadow-md  rounded-md">
      <div className="flex flex-col items-center">
        <CldImage
          src={imageUrl}
          className="h-32 w-32 object-cover rounded-full mt-5"
        />
        <div className="text-center mt-4">
          <p className="font-normal text-md">{category}</p>
        </div>
      </div>
    </div>
  );
}
