import { CldImage } from "next-cloudinary";

export default function categoryComponent(cloudinary_id, category) {
  return (
    <div className="bg-white rounded shadow-md justify-center items-center h-[100px] w-[100px] p-5 flex flex-col">
      <CldImage src={cloudinary_id} className="w-full h-[70px] rounded-full " />
      <p className="text-sm mt-5">{category}</p>
    </div>
  );
}
