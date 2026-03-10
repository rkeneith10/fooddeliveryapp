"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AnimatePresence, motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ProgressLoader } from "nextjs-progressloader";

import "tailwindcss/tailwind.css";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
});

const Layout = ({ children }) => {
  return (
    <div className={`${jakarta.className} min-h-screen flex flex-col bg-[#F8FAFC]`}>
      <ProgressLoader color="#10B981" showSpinner={false} />
      <Navbar />
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
