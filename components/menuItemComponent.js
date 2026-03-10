import { motion } from "framer-motion";
import { Clock, Flame, ShoppingCart, Star } from "lucide-react";
import { CldImage } from "next-cloudinary";

export default function MenuItemComponent({
  imageUrl,
  item_name,
  description,
  price,
}) {
  const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
  const prepTime = Math.floor(Math.random() * (45 - 15) + 15);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 overflow-hidden"
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full flex items-center gap-1 uppercase tracking-wider backdrop-blur-sm">
          <Flame size={12} fill="currentColor" /> Populaire
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-emerald-50/30">
        <CldImage
          src={imageUrl}
          alt={item_name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 leading-tight group-hover:text-emerald-600 transition-colors">
            {item_name}
          </h3>
          <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg">
            <Star size={12} className="text-emerald-600 fill-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">{rating}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {description || "Déliicieux plat préparé avec soin par nos chefs experts."}
        </p>

        {/* Info Row */}
        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-medium mb-4">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{prepTime} min</span>
          </div>
          <div className="h-1 w-1 bg-slate-300 rounded-full" />
          <span>Livraison Gratuite</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">Prix</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-emerald-600">HTG {price}</span>
            </div>
          </div>
          
          <button className="h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:scale-110 active:scale-90 transition-all shadow-lg shadow-slate-200">
            <ShoppingCart size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
