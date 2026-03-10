"use client";
import axios from "axios";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    Loader2,
    Lock,
    Mail,
    MapPin,
    Phone,
    User,
    UserPlus
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    adress: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { firstName, lastName, email, telephone, adress, password } = formData;

    if (!firstName || !lastName || !email || !telephone || !adress || !password) {
      toast.error("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (!validator.isEmail(email)) {
      toast.error("Veuillez entrer un email valide");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://fooddelivery-kappa.vercel.app/api/users/register", formData);
      if (response.data.success) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userinfo", JSON.stringify(response.data.datauser));
        toast.success("Compte créé avec succès !");
        setTimeout(() => router.push("/"), 2000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 font-sans">
      <ToastContainer position="top-right" theme="colored" />
      
      {/* Left Decoration */}
      <div className="hidden lg:flex relative overflow-hidden bg-emerald-600 items-center justify-center p-20">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="url(#grid)" />
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
          </svg>
        </div>
        
        <div className="relative z-10 text-white space-y-12 max-w-lg">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
              <UserPlus size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-6xl font-black leading-[0.9] tracking-tighter">
              Commencez <br /><span className="text-emerald-200 underline decoration-4 underline-offset-8">Vôtre Aventure</span> Gastronomique.
            </h1>
          </div>

          <div className="space-y-8">
            {[
              { title: "Accès Illimité", desc: "Plus de 200 restaurants partenaires à Haiti." },
              { title: "Livraison Priority", desc: "Les membres bénéficient de livraisons plus rapides." },
              { title: "Offres Exclusives", desc: "Promotions hebdomadaires réservées aux membres." }
            ].map((feature, i) => (
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex gap-4"
              >
                <div className="mt-1 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="font-black text-lg text-white mb-1 uppercase tracking-tighter">{feature.title}</h4>
                  <p className="text-emerald-100 text-sm font-medium">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-8 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-xl space-y-12 py-10">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Créer votre profil</h2>
            <p className="text-slate-500 font-medium">Rejoignez la plus grande communauté de foodies en Haiti.</p>
          </div>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Prénom</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input name="firstName" onChange={handleChange} placeholder="Jean" className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300" />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nom</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input name="lastName" onChange={handleChange} placeholder="Dupont" className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input name="email" type="email" onChange={handleChange} placeholder="jean.dupont@email.com" className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300" />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Adresse de livraison</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input name="adress" onChange={handleChange} placeholder="123 Rue de la Boucherie, Delmas" className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Téléphone</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input name="telephone" onChange={handleChange} placeholder="+509 XXXX XXXX" className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mot de passe</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input name="password" type="password" onChange={handleChange} placeholder="••••••••" className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300" />
              </div>
            </div>

            <button disabled={loading} className="md:col-span-2 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 mt-4">
              {loading ? <Loader2 className="animate-spin" /> : <>Créer mon compte <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="text-center pt-8 border-t border-slate-200">
            <p className="text-sm font-bold text-slate-500">
              Déjà membre ? {" "}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-4">Connectez-vous</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
