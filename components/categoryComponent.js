import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";

export default function CategoryComponent({ category, imageUrl }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotate: -1 / 10 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-emerald-950/5 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden min-w-[120px]"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <CldImage
          src={imageUrl}
          width={80}
          height={80}
          className="grayscale-0 grayscale-100 contrast-125"
        />
      </div>

      <div className="relative mb-4 h-24 w-24 rounded-full overflow-hidden bg-emerald-50 p-2 shadow-inner group-hover:shadow-lg group-hover:shadow-emerald-100 transition-all duration-500">
        <CldImage
          src={imageUrl}
          alt={category}
          width={150}
          height={150}
          className="h-full w-full object-cover rounded-full transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12"
        />
      </div>
      
      <span className="text-sm font-bold text-slate-800 tracking-tighter uppercase text-center group-hover:text-emerald-600 transition-colors">
        {category}
      </span>

      <div className="mt-2 h-1 w-0 bg-emerald-600 group-hover:w-1/2 transition-all duration-500 rounded-full" />
    </motion.div>
  );
}
