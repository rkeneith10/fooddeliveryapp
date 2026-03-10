import axios from "axios";
import { Info, MessageSquare, Minus, Plus, ShoppingCart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";

function MenuItem({ data, error }) {
  const [count, setCount] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const addToCart = () => {
    const cartItem = {
      id: data._id,
      name: data.item_name,
      restaurant: data.restaurant_name,
      imageUrl: data.imageUrl,
      price: data.price,
      quantity: count,
      specialRequest: specialRequest,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartItemAdded"));

    setCount(1);
    setSpecialRequest("");
    toast.success(`${data.item_name} ajouté au panier !`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      // Logic for cart update if needed
    };
    window.addEventListener("cartItemAdded", handleCartUpdate);
    return () => window.removeEventListener("cartItemAdded", handleCartUpdate);
  }, []);

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-8 bg-white rounded-[2rem] shadow-xl border border-red-100 max-w-md">
            <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Erreur de chargement</h2>
            <p className="text-slate-500 mb-8 font-medium">Nous n'avons pas pu récupérer les détails de ce plat. Veuillez réessayer plus tard.</p>
            <button onClick={() => window.location.reload()} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
              Réessayer
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
           Chargement en cours...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="min-h-screen bg-slate-50/50 pt-24 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-emerald-900/5 border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Image Section */}
              <div className="relative h-[400px] lg:h-full min-h-[500px] bg-slate-100">
                <CldImage 
                  src={data.imageUrl} 
                  className="w-full h-full object-cover"
                  alt={data.item_name}
                  width={800}
                  height={800}
                />
                <div className="absolute top-8 left-8">
                   <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                      {data.restaurant_name}
                   </div>
                </div>
              </div>

              {/* Right: Details Section */}
              <div className="p-8 lg:p-16 flex flex-col justify-center">
                <div className="mb-10">
                  <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                    {data.item_name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-black text-emerald-600 flex items-baseline gap-1">
                      <span className="text-sm">HTG</span> {data.price}
                    </div>
                    <div className="h-4 w-[1px] bg-slate-200" />
                    <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                      Disponible
                    </div>
                  </div>
                </div>

                {/* Description - Assuming data.description exists or defaulting */}
                <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                  {data.description || "Un délice préparé avec amour par nos meilleurs chefs. Ingrédients frais et saveurs authentiques garanties."}
                </p>

                <div className="space-y-10">
                  {/* Special Request */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-slate-900">
                      <MessageSquare size={18} className="text-emerald-500" />
                      <span className="font-black uppercase text-xs tracking-widest">Instructions spéciales</span>
                    </div>
                    <textarea
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="Ex: Pas d'oignons, bien cuit..."
                      className="w-full h-24 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-300"
                    />
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-4">
                    <div className="flex items-center bg-slate-100 rounded-2xl p-1 shrink-0">
                      <button 
                        onClick={decrement}
                        className="h-14 w-14 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-emerald-600 transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-16 text-center font-black text-xl text-slate-800">{count}</span>
                      <button 
                        onClick={increment}
                        className="h-14 w-14 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-emerald-600 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <button 
                      onClick={addToCart}
                      className="flex-grow h-16 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-4 shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all"
                    >
                      <ShoppingCart size={18} />
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { menuItemId } = query || {};

  let data = null;
  let error = null;

  try {
    const response = await axios.get(
      `https://fooddelivery-kappa.vercel.app/api/menus/menuId?menuItemId=${menuItemId}`
    );
    data = response.data;
  } catch (err) {
    console.error("Fetch error:", err.message);
    error = err.message;
  }

  return {
    props: {
      data,
      error,
    },
  };
}

export default MenuItem;
