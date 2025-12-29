import { ReceiptText } from "lucide-react";
import { HandCoins } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = usePathname();

  const BoxStyle = "flex items-center transition-all text-xs gap-2 duration-700";

  if (
    router === "/Home" ||
    router === "/History/transaksi" ||
    router === "/History/reward" ||
    router === "/Profile"
  ) {
    return (
      <div className="flex justify-between items-center fixed left-0 right-0 bg-white bottom-0 p-4 shadow-box-primary rounded-t-xl">
        <Link
          href={"/Home"}
          className={`${
            router === "/Home" ? "text-blue-semi" : "text-[#BBBBBB]"
          } ${BoxStyle}`}
        >
          <House />
          Beranda
        </Link>
        <Link
          href={"/History/transaksi"}
          className={`${
            router === "/History/transaksi"
              ? "text-blue-semi"
              : "text-[#BBBBBB]"
          } ${BoxStyle} ${router === "/History/transaksi" ? "bg-red-200" : "bg-white"}`}
        >
          <ReceiptText />
          <h1 className={`${ router === "/History/transaksi" ? "flex" : "transform" }`}>Transaksi</h1>
        </Link>
        <Link
          href={"/History/reward"}
          className={`${
            router === "/History/reward" ? "text-blue-semi" : "text-[#BBBBBB]"
          } ${BoxStyle}`}
        >
          <HandCoins />
          Reward
        </Link>
        <Link
          href={"/Profile"}
          className={`${
            router === "/Profile" ? "text-blue-semi" : "text-[#BBBBBB]"
          } ${BoxStyle}`}
        >
          <CircleUserRound />
          Profile
        </Link>
      </div>
    );
  }
  return null;
};

export default Navbar;
