"use client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Lock, Mail, ShieldCheck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import validator from "validator";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      const timeOutId = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timeOutId);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }
    
    if (!validator.isEmail(email)) {
      setError("Veuillez entrer une adresse email valide");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://fooddelivery-kappa.vercel.app/api/users/login",
        { email, password }
      );
      
      if (response.status === 200) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userinfo", JSON.stringify(response.data.datauser));
        router.push("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 font-sans">
      {/* Left Decoration - Desktop Only */}
      <div className="hidden lg:flex relative overflow-hidden bg-emerald-600 items-center justify-center p-20">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 text-white space-y-8 max-w-lg">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-12"
          >
            <ShoppingBag size={32} strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-6xl font-black leading-tight tracking-tighter">
            L'Excellence <br /><span className="text-emerald-200 underline decoration-4 underline-offset-8">À Votre Porte.</span>
          </h1>
          <p className="text-xl text-emerald-50 font-medium leading-relaxed">
            Rejoignez des milliers de gourmets et profitez d'une expérience culinaire sans égale.
          </p>
          <div className="pt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-12 w-12 rounded-full border-2 border-emerald-500 overflow-hidden bg-emerald-700">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-emerald-100">+12k Membres Actifs</span>
          </div>
        </div>

        {/* Floating food image decoration */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"
        />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-md space-y-12">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="lg:hidden w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 mb-6">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Bienvenue de nouveau</h2>
            <p className="text-slate-500 font-medium">Entrez vos identifiants pour continuer votre voyage culinaire.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
              >
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Professionnel</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Mot de Passe</label>
                <Link href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Oublié ?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Connexion <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="flex flex-col items-center space-y-8 pt-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> Sécurisé par FOODAPP-AUTH
            </div>
            
            <div className="h-[1px] w-full bg-slate-200" />
            
            <p className="text-sm font-bold text-slate-500">
              Pas encore de compte ? {" "}
              <Link href="/register" className="text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-4">Créer un compte</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
