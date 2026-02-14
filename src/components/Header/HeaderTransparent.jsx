import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeaderTransparent = ({ text }) => {
  const [scroll, setScroll] = useState(0);
  const handlerScroll = () => {
    setScroll(window.pageYOffset);
  };
  useEffect(() => {
    window.addEventListener("scroll", handlerScroll);
    return () => window.removeEventListener("scroll", handlerScroll);
  }, []);
  return (
    <div
      className={`fixed max-w-125 top-0 ${scroll > 50 ? "bg-white shadow-md" : "bg-black/25 text-white"} left-0 right-0 mx-auto px-3 flex items-center gap-2 py-3 z-10 transition-all duration-100`}
    >
      <Link href={"/"}>
        <ArrowLeft size={25} />
      </Link>
      <h1 className="text-lg font-semibold">{text}</h1>
    </div>
  );
};

export default HeaderTransparent;
