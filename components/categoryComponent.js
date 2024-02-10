//import { CldImage } from "next-cloudinary";
// import Image from "next/image";

// export default function CategoryComponent(imageUrl, category) {
//   return (
//     <div className="bg-white rounded shadow-md justify-center items-center h-[100px] w-[100px] p-5 flex flex-col">
//       <Image src={imageUrl} className="w-full h-[70px] rounded-full " />
//       <p className="text-sm mt-5">{category}</p>
//     </div>
//   );
// }
import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ imageUrl, category }) {
  //const url_download = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/fl_attachment/${cloudinary_id}`;
  return (
    <div className="bg-white rounded overflow-hidden shadow-lg mx-2 my-4 h-[350px]">
      <div className="px-6 py-4">
        <div className="font-medium text-xl mb-1">{category}</div>
      </div>

      <div className="px-6 py-2">
        <CldImage src={imageUrl} className="w-full h-[200px]" />
      </div>
    </div>
  );
}
