import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Montserrat } from "next/font/google";

import "tailwindcss/tailwind.css";

const montserrat = Montserrat({ subsets: ["latin"] });
const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
