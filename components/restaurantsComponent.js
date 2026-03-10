import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { CldImage } from "next-cloudinary";

export default function RestaurantComponent({
  restaurant_name,
  telephone,
  imageUrl,
  adress,
}) {
  const rating = (Math.random() * (5 - 4.5) + 4.5).toFixed(1);
  const reviews = Math.floor(Math.random() * 500 + 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col md:flex-row bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-950/5 transition-all duration-500 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative md:w-2/5 h-64 md:h-72 overflow-hidden bg-emerald-50">
        <CldImage
          src={imageUrl}
          alt={restaurant_name}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-emerald-600 text-[10px] font-black rounded-lg flex items-center gap-1.5 uppercase shadow-sm border border-emerald-100/50">
            <ShieldCheck size={14} fill="currentColor" className="text-emerald-500" /> Vérifié
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="md:w-3/5 p-8 flex flex-col">
        <div className="mb-auto">
          <div className="flex items-center gap-1.5 text-emerald-600 mb-2">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-black">{rating}</span>
            <span className="text-xs text-slate-400 font-medium">({reviews}+ avis)</span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">
            {restaurant_name}
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5 text-slate-500">
              <MapPin size={18} className="text-emerald-500 mt-1 shrink-0" />
              <p className="text-sm font-medium leading-relaxed">{adress}</p>
            </div>
            <div className="flex items-center gap-2.5 text-slate-500">
              <Phone size={18} className="text-emerald-500 shrink-0" />
              <p className="text-sm font-bold">{telephone}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${restaurant_name}${i}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <span className="ml-4 text-[10px] font-black text-slate-400">+2k Commandes</span>
          </div>

          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-tighter cursor-pointer"
          >
            Explorer <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
