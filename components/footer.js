"use client";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ShoppingBag,
  Twitter
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white relative mt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/10 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Col */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 group-hover:rotate-12 transition-transform">
                <ShoppingBag size={22} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                FOOD<span className="text-emerald-500">app</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              La destination ultime pour tous vos besoins culinaires. Livraison rapide, 
              délicieuse et sécurisée directement à votre porte.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="h-10 w-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Quick */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-emerald-500">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Restaurants', 'Categories', 'Contact'].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-slate-400 hover:text-emerald-400 font-bold transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all font-black" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-emerald-500">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-emerald-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm font-medium">xxx, Rue Méridien, Cité Chauvel, Cap-haitien, Haiti</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-emerald-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm font-medium">+509 3839 6075</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-emerald-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm font-medium">rkeneith10@yahoo.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-emerald-500">Newsletter</h4>
            <p className="text-slate-400 text-sm font-medium mb-6">Recevez les meilleures offres directement dans votre boite mail.</p>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Votre email" 
                className="w-full bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-slate-600 font-bold"
              />
              <button className="absolute right-2 top-2 h-10 w-10 bg-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-lg">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            &copy; {currentYear} FOOD APP — Tous droits réservés.
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Politique de Confidentialité</Link>
            <Link href="/terms" className="hover:text-emerald-500 transition-colors">Termes et Conditions</Link>
          </div>
          <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
            Build and Designed by <span className="text-slate-200">Keneith-Salnave Romain</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
