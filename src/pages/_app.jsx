import "@/styles/globals.css";
import font from "@/styles/fonts.module.css";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  
  return (
    <div className={font.root}>
      <Component {...pageProps} />
      <div className="mt-15"></div>
      <Navbar />
    </div>
  );
}
