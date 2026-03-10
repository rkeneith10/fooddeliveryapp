import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  Menu,
  ShoppingBag,
  User,
  X
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const checkLogin = localStorage.getItem("isLogin");
    if (checkLogin) setIsLogin(true);

    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    updateCart();
    window.addEventListener("cartItemAdded", updateCart);
    window.addEventListener("cartItemRemoved", updateCart);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartItemAdded", updateCart);
      window.removeEventListener("cartItemRemoved", updateCart);
    };
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("https://fooddelivery-kappa.vercel.app/api/users/logout");
      if (response.ok) {
        setIsLogin(false);
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userinfo");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
            <ShoppingBag size={22} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
            FOOD<span className="text-emerald-600 uppercase">app</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link href="/restaurants" className="hover:text-emerald-600 transition-colors">Restaurants</Link>
          {/* <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link> */}
          
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group">
              <ShoppingBag className="text-slate-800 group-hover:text-emerald-600 transition-colors" size={24} />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>

            <div className="relative">
              <button 
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-emerald-600/30 hover:bg-emerald-50 transition-all text-slate-700"
              >
                <User size={18} />
                <span className="text-sm">Account</span>
                <ChevronDown size={14} className={cn("transition-transform", isAccountOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isAccountOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden"
                  >
                    {isLogin ? (
                      <>
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors">
                          <User size={18} className="text-emerald-600" />
                          <span>My Profile</span>
                        </Link>
                        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors">
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50 text-slate-700 transition-colors group">
                          <User size={18} className="group-hover:text-emerald-600" />
                          <span>Login</span>
                        </Link>
                        <Link href="/register" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50 text-slate-700 transition-colors group">
                          <User size={18} className="group-hover:text-emerald-600" />
                          <span>Create Account</span>
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="relative p-2">
            <ShoppingBag className="text-slate-800" size={24} />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-900 bg-slate-100 rounded-lg"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 font-semibold text-lg">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/restaurants" onClick={() => setIsMenuOpen(false)}>Restaurants</Link>
              {/* <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link> */}
              
              <div className="h-[1px] bg-slate-100 w-full" />
              
              {isLogin ? (
                <>
                  <Link href="/profile" className="flex items-center gap-3 text-emerald-600">
                    <User size={20} /> Profile
                  </Link>
                  <button onClick={logout} className="flex items-center gap-3 text-red-600">
                    <LogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login" className="w-full py-4 text-center rounded-2xl bg-slate-100" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link href="/register" className="w-full py-4 text-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
