import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/pagination";
import font from "@/styles/fonts.module.css";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }) {
  const router = usePathname();
  const pageAuth = [
    "/Auth/Login",
    "/Auth/Register",
    "/Auth/NewPassword",
    "/Auth/Forgot",
    "/Auth/otp/OTPRegister",
    "/Auth/otp/OTPForgot",
  ];

  const dashboard = ["/History/transaksi", "/History/reward", "/Profile"];

  return (
    <div className={font.root}>
      <Component {...pageProps} />
      {pageAuth.includes(router) ||
      dashboard.includes(router) === false ? null : (
        <div className="mt-20"></div>
      )}
    </div>
  );
}
