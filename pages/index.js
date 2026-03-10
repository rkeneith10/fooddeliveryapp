import CategoryComponent from "@/components/categoryComponent";
import MenuItemComponent from "@/components/menuItemComponent";
import RestaurantComponent from "@/components/restaurantsComponent";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ChevronRight,
    Search,
    ShieldCheck,
    Star,
    Users,
    Zap
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import Layout from "./layout";

// Mock data fetch - in production this would be refined
export async function getServerSideProps() {
  const baseUrl = "https://fooddelivery-kappa.vercel.app/api";
  try {
    const [catRes, restRes, menuRes] = await Promise.all([
      fetch(`${baseUrl}/categories`),
      fetch(`${baseUrl}/restaurants`),
      fetch(`${baseUrl}/menus`)
    ]);

    const catData = await catRes.json();
    const restData = await restRes.json();
    const menuData = await menuRes.json();

    const categories = catData.all.map((c) => ({
      _id: c._id,
      category: c.category,
      imageUrl: c.imageUrl,
    }));

    return {
      props: {
        categories,
        restaurants: restData.all || [],
        menus: menuData.all || [],
      },
    };
  } catch (error) {
    console.error("Data fetch failed:", error);
    return { props: { categories: [], restaurants: [], menus: [] } };
  }
}

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm"
  >
    <div className="h-12 w-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-2 leading-none tracking-tight">{title}</h3>
    <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Home({ categories, restaurants, menus }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <Head>
        <title>Premium Food Delivery | Goûtez l'excellence</title>
        <meta name="description" content="Découvrez les meilleurs restaurants avec la livraison la plus rapide sur FOOD APP." />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-40">
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-gradient-to-l from-emerald-50/50 to-transparent rounded-bl-[10rem]" />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 h-96 w-96 bg-emerald-200/20 blur-3xl rounded-full -z-20" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 right-20 h-[30rem] w-[30rem] bg-amber-100/30 blur-[100px] rounded-full -z-20" 
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-50 text-emerald-700 text-sm font-black rounded-full uppercase tracking-tighter border border-emerald-100 animate-pulse">
              <Zap size={14} fill="currentColor" /> Nouveau: Livraison express en 15min
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter">
              Savourez Le <span className="text-emerald-600">Bonheur</span> À Votre Porte.
            </h1>

            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
              Plongez dans l'univers culinaire le plus riche. Commandez vos plats préférés auprès de centaines de restaurants soigneusement sélectionnés.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
              <div className="relative bg-white p-2 rounded-2xl flex items-center gap-4 shadow-xl border border-slate-100">
                <div className="pl-4 text-emerald-500">
                  <Search size={22} strokeWidth={2.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Quel restaurant ou plat cherchez-vous ?" 
                  className="flex-grow bg-transparent border-none focus:ring-0 text-slate-700 font-bold placeholder:text-slate-300 py-4"
                />
                <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-tighter shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors">
                  Trouver
                </button>
              </div>
            </div>

            <div className="flex items-center gap-10 pt-4">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-slate-900 leading-none">50k+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Utilisateurs</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-slate-900 leading-none">200+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Restaurants</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-950/20 border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
                alt="Excellent Food" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl space-y-3 border border-slate-50 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <Star fill="currentColor" size={20} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">Score Moyen</div>
                  <div className="text-lg font-black text-slate-900 leading-none">4.9 / 5.0</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ x: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-slate-900 p-6 rounded-3xl shadow-2xl flex items-center gap-4 z-20 text-white"
            >
              <div className="h-12 w-12 bg-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Paiement</div>
                <div className="text-md font-bold text-white">Sécurisé & Garanti</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories & High-Sellings */}
      <section className="bg-slate-50 py-32 rounded-[5rem] -mt-10 relative z-10 border-t border-slate-100 shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div>
              <div className="text-emerald-600 font-black uppercase tracking-[0.3em] mb-4 text-xs">Menu Select</div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Popular Categories</h2>
            </div>
            <Link href="/categories" className="flex items-center gap-3 text-slate-900 group font-black uppercase tracking-tighter text-sm">
              Toutes les categories <div className="h-10 w-10 border-2 border-slate-200 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white transition-all"><ArrowRight size={18} /></div>
            </Link>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex overflow-x-auto pb-10 gap-6 no-scrollbar"
          >
            {categories.map((cat) => (
              <motion.div key={cat._id} variants={item} className="shrink-0">
                <Link href={`/categories/menuByCategory?menuCategory=${cat.category}`}>
                  <CategoryComponent category={cat.category} imageUrl={cat.imageUrl} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-32">
            <div className="flex flex-col md:items-center text-center max-w-2xl mx-auto mb-16 space-y-6">
              <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs">Le choix du chef</span>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Top-Sellers en Haiti</h2>
              <p className="text-lg text-slate-500 font-medium">Découvrez les plats qui font vibrer les papilles de nos clients les plus exigeants.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {menus.slice(0, 8).map((menu, index) => (
                <motion.div 
                  key={menu._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/menu/menuItem?menuItemId=${menu._id}`}>
                    <MenuItemComponent
                      item_name={menu.item_name}
                      imageUrl={menu.imageUrl}
                      description={menu.description}
                      price={menu.price}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
            <div>
              <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs">Près de chez vous</span>
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-tight mt-6 mb-8">
                Les Meilleurs Restaurants <br />À Votre Portée.
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                Nous avons sélectionné pour vous l'élite de la gastronomie locale. Du street-food authentique au fine-dining sophistiqué.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <FeatureCard icon={Users} title="Partenaire Elite" desc="Seuls les meilleurs restaurants sont admis." />
              <FeatureCard icon={Zap} title="Vitesse Éclair" desc="Livraison moyenne garantie en 30min." />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {restaurants.slice(0, 4).map((resto) => (
              <RestaurantComponent
                key={resto._id}
                restaurant_name={resto.restaurant_name}
                telephone={resto.telephone}
                imageUrl={resto.imageUrl}
                adress={resto.adress}
              />
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Link href="/restaurants">
              <div className="group flex items-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all scale-100 hover:scale-105">
                Voir tous les restaurants <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA / Promo */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-emerald-600 rounded-[4rem] overflow-hidden relative p-12 lg:p-24 shadow-2xl shadow-emerald-200">
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full -z-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-emerald-500/30 text-emerald-50 rounded-lg text-sm font-black uppercase tracking-widest">
                Offre Exceptionnelle
              </div>
              <h2 className="text-6xl font-black text-white leading-none tracking-tighter">
                Faites Partie De La <br />Révolution Culinaire.
              </h2>
              <p className="text-xl text-emerald-50 font-medium">Libérez votre gourmandise. Premier repas ? Économisez 500 HTG avec le code <span className="bg-white/20 px-3 py-1 rounded-lg">FOODIE</span></p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link href="/app-store" className="bg-white text-emerald-800 px-8 py-4 rounded-2xl font-black flex items-center gap-3 justify-center shadow-lg hover:bg-orange-50 transition-colors">
                  App Store <div className="h-6 w-[1px] bg-emerald-100" /> <ChevronRight size={18} />
                </Link>
                <Link href="/play-store" className="bg-emerald-800 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 justify-center shadow-lg hover:bg-emerald-950 transition-colors">
                  Google Play <div className="h-6 w-[1px] bg-emerald-700" /> <ChevronRight size={18} />
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400 blur-[120px] rounded-full opacity-50" />
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop" 
                  alt="Delicious Pizza" 
                  className="rounded-[3rem] shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </Layout>
  );
}
