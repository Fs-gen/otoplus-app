import { ReceiptText } from "lucide-react";
import { HandCoins } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { House } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [color, setColor] = useState(true);
  const router = usePathname();

  const BoxNav = "flex flex-col justify-center items-center relative";
  const BoxBG = "-z-10 py-8 px-10 transition-all duration-1000 rounded-xl";
  const title = "transition-all duration-1000 text-white`";

  if (
    router === "/Home" ||
    router === "/History/transaksi" ||
    router === "/History/reward" ||
    router === "/Profile"
  ) {
    return (
      <div className="grid grid-cols-4 fixed left-0 right-0 bg-white bottom-0 py-4 px-12 shadow-box-primary h-max">
        <Link
          href={"/Home"}
          className={`${BoxNav} ${
            router === "/Home" ? "text-white" : "text-black"
          }`}
        >
          <div
            className={`absolute ${
              router === "/Home" ? "bg-blue-semi" : "bg-white"
            } ${BoxBG}`}
          ></div>
          <House />
          <h1
            className={`${
              router === "/Home" ? "h-1/2 opacity-100" : "h-0 opacity-0"
            } ${title}`}
          >
            Beranda
          </h1>
        </Link>
        <Link
          href={"/History/transaksi"}
          className={`${BoxNav} ${
            router === "/History/transaksi" ? "text-white" : "text-black"
          }`}
        >
          <div
            className={`absolute ${
              router === "/History/transaksi" ? "bg-blue-semi" : "bg-white"
            } ${BoxBG}`}
          ></div>
          <ReceiptText />
          <h1
            className={`${
              router === "/History/transaksi"
                ? "h-1/2 opacity-100"
                : "h-0 opacity-0"
            } ${title}`}
          >
            Beranda
          </h1>
        </Link>
        <Link
          href={"/History/reward"}
          className={`${BoxNav} ${
            router === "/History/reward" ? "text-white" : "text-black"
          }`}
        >
          <div
            className={`absolute ${
              router === "/History/reward" ? "bg-blue-semi" : "bg-white"
            } ${BoxBG}`}
          ></div>
          <HandCoins />
          <h1
            className={`${
              router === "/History/reward"
                ? "h-1/2 opacity-100"
                : "h-0 opacity-0"
            } ${title}`}
          >
            Beranda
          </h1>
        </Link>
        <Link
          href={"/Profile"}
          className={`${BoxNav} ${
            router === "/Profile" ? "text-white" : "text-black"
          }`}
        >
          <div
            className={`absolute ${
              router === "/Profile" ? "bg-blue-semi" : "bg-white"
            } ${BoxBG}`}
          ></div>
          <CircleUserRound />
          <h1
            className={`${
              router === "/Profile" ? "h-1/2 opacity-100" : "h-0 opacity-0"
            } ${title}`}
          >
            Profile
          </h1>
        </Link>
      </div>
    );
  }
  return null;
};

export default Navbar;
