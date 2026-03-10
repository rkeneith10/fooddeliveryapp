import { Plus_Jakarta_Sans } from "next/font/google";
import "tailwindcss/tailwind.css";
import "../app/globals.css";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={jakarta.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
