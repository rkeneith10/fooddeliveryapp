import { motion } from "framer-motion";
import { ArrowRight, Filter, MapPin, Search, Utensils } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import RestaurantComponent from "../../components/restaurantsComponent";
import Layout from "../layout";

export async function getStaticProps() {
  const response1 = await fetch("https://fooddelivery-kappa.vercel.app/api/restaurants");
  try {
    const responseData1 = await response1.json();
    return {
      props: { restaurants: responseData1.all || [] },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    return { props: { restaurants: [] }, revalidate: 3600 };
  }
}

export default function RestaurantPage({ restaurants }) {
  return (
    <Layout>
      <Head>
        <title>Tous nos Restaurants | FOOD APP</title>
        <meta name="description" content="Explorez les meilleurs restaurants de la ville avec FOOD APP." />
      </Head>

      <div className="min-h-screen bg-slate-50/50 pt-20 pb-32">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-widest border border-emerald-100">
                <Utensils size={14} /> Elite Dining
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                L'Élite Des <br /><span className="text-emerald-600">Saveurs.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed pt-2">
                Découvrez plus de {restaurants.length} établissements d'exception sélectionnés par nos soins.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-6 h-full">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=rest${i}`} alt="user" />
                  </div>
                ))}
                <div className="h-12 w-12 rounded-full border-4 border-white bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                  +2K
                </div>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Recommandé par la communauté</p>
            </div>
          </motion.div>
        </section>

        {/* Filters/Search Bar */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="bg-white p-4 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-slate-100 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-grow flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 group transition-all focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-500">
              <Search size={20} className="text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Chercher un restaurant, une cuisine..." 
                className="bg-transparent border-none focus:ring-0 w-full font-bold text-slate-700 placeholder:text-slate-300"
              />
            </div>
            
            <div className="w-full md:w-auto flex items-center gap-3">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black uppercase text-xs tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
                <MapPin size={18} /> Tout Haiti
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                Filtrer <Filter size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Restaurants Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 gap-12">
            {restaurants.length > 0 ? (
              restaurants.map((resto, index) => (
                <motion.div 
                  key={resto._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/restaurants/${resto._id}`}>
                    <RestaurantComponent
                      restaurant_name={resto.restaurant_name}
                      telephone={resto.telephone}
                      imageUrl={resto.imageUrl}
                      adress={resto.adress}
                    />
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-40 space-y-8">
                <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 opacity-50">
                  <Utensils size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-none">Aucun restaurant trouvé</h3>
                <p className="text-slate-500 font-medium">Réessayez avec d'autres critères de recherche.</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden text-center lg:text-left">
            <div className="absolute top-0 right-0 h-full w-1/3 bg-emerald-600 skew-x-[-20deg] translate-x-1/2 opacity-20" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-8">
                  Devenez Partenaire <br />Et Boostez Votre Restaurant.
                </h2>
                <p className="text-xl text-slate-400 font-medium mb-12 max-w-lg">
                  Rejoignez la plateforme n°1 à Haiti et touchez des milliers de nouveaux clients chaque jour.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-4 bg-emerald-600 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:bg-emerald-500 transition-all group">
                  Postuler maintenant <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" 
                  alt="Restaurant kitchen" 
                  className="rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
