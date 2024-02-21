import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ imageUrl, category }) {
  return (
    <div className="container mx-auto px-4 -y-8 bg-white shadow-md transition-transform transform hover:-translate-x-1 rounded-md">
      <div className="flex flex-col items-center">
        <CldImage
          src={imageUrl}
          className="h-32 w-48 object-cover rounded-lg mt-5"
        />
        <div className="text-center mt-4">
          <p className="font-normal text-md">{category}</p>
        </div>
      </div>
    </div>

    // <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-2 my-2 h-[240px]  transition-transform transform hover:-translate-x-1">
    //   <div className="h-[200px] w-full  relative overflow-hidden  mb-1 p-20">
    //     <CldImage
    //       src={imageUrl}
    //       className="h-full w-full object-cover object-center"
    //       priority
    //       fill={true}
    //     />
    //   </div>
    //   <div className="px-6 py-2">
    //     <div className="font-normal text-medium mb-1 text-center">
    //       {category}
    //     </div>
    //   </div>
    // </div>
  );
}
