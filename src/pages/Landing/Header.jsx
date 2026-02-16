import Image from "next/image";
import Logo from "../../assets/images/icons/logo.png";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";

const ButtonAuth = ({ href, icon, text }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <Link
      className="px-3 py-2 rounded-lg font-semibold text-xs bg-blue-semi text-white flex gap-2 items-center"
      href={href}
    >
      {width >= 360 ? icon : null}
      {text}
    </Link>
  );
};

const Header = ({ login }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const ButtonStyle =
    "px-3 py-2 rounded-lg font-semibold text-xs bg-blue-semi text-white flex gap-2 items-center";
  return (
    <div className="container py-3 px-5 max-w-125 bg-white/75 backdrop-blur-sm flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="flex gap-1 items-center">
        <Image src={Logo} width={34} height={34} priority alt="Logo" />
        <h1 className="text-xs font-bold">OTOPLUSID</h1>
      </div>
      <div className="flex gap-2 items-center">
        <button className={ButtonStyle} onClick={login}>
          {width >= 360 ? <LogIn size={15} strokeWidth={2} /> : null}
          <p>Login</p>
        </button>
        <Link className={ButtonStyle} href={"/Auth/Register"}>
          {width >= 360 ? <UserRoundPlus size={15} strokeWidth={2} /> : null}
          Register
        </Link>
      </div>
    </div>
  );
};

export default Header;
