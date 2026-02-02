import Logo from "@/assets/images/icons/logo.png";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CardInstall = ({ navbar }) => {
  const [hide, setHide] = useState(false);
  const [size, setSIze] = useState(0);

  useEffect(() => {
    setSIze(window.innerWidth);
  }, []);
  return (
    <div
      className={`${hide ? "hidden" : "flex"} justify-between p-4 inset-shadow-sm bg-white fixed mx-auto ${navbar ? "bottom-18" : "bottom-0"} z-10 right-0 left-0 max-w-125`}
    >
      <div className="flex items-center gap-2">
        <button onClick={() => setHide(true)}>
          <X size={30} />
        </button>
        {size < 320 ? null : (
          <Image src={Logo} width={45} height={45} alt="Logo" />
        )}
        <div>
          <h1 className="text-sm font-semibold">OtoplusID</h1>
          <p className="text-text-gray text-xs">
            Dapatkan kemudahan melalui aplikasi!
          </p>
        </div>
      </div>
      <button className="px-3 py-1 bg-blue-semi text-sm text-white rounded-sm font-medium">
        Install
      </button>
    </div>
  );
};

export default CardInstall;
