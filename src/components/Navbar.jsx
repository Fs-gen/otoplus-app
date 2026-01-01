import { ReceiptText } from "lucide-react";
import { HandCoins } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = usePathname();

  const NavLink = ({ icon, pages, text }) => {
    return (
      <Link
        href={pages}
        className={`text-sm flex flex-col items-center ${
          router === pages ? "text-blue-semi" : "text-black"
        }`}
      >
        {icon} {text}
      </Link>
    );
  };

  if (
    router === "/Home" ||
    router === "/History/transaksi" ||
    router === "/History/reward" ||
    router === "/Profile"
  ) {
    return (
      <div className="flex justify-between fixed left-0 right-0 bg-white bottom-0 py-4 px-8 shadow-box-primary max-w-125 mx-auto h-max">
        <NavLink pages={"/Home"} text="Beranda" icon={<House />} />
        <NavLink
          pages={"/History/transaksi"}
          text="Transaksi"
          icon={<ReceiptText />}
        />
        <NavLink pages={"/History/reward"} text="Reward" icon={<HandCoins />} />
        <NavLink pages={"/Profile"} text="Profile" icon={<CircleUserRound />} />
      </div>
    );
  }
  return null;
};

export default Navbar;
