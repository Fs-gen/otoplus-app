import Image from "next/image";
import Logo from "../../assets/images/icons/logo.png";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="section-box bg-linear-to-br from-gray-50 via-white to-blue-50 pb-6.25">
      <div className="flex flex-col gap-8 justify-center items-center mt-22">
        <div className="flex bg-white border-2 border-gray-light gap-2 itesm-center px-3 py-2 rounded-full shdow-sm">
          <Image src={Logo} alt="Logo" width={24} height={24} />
          <p className="text-sm font-medium mt-0.5">
            Platform Otomotif Terpercaya
          </p>
        </div>
        <h1 className="font-bold text-xl">OTOPLUSID</h1>
        <p className="text-gray-dark text-center">
          Temukan mobil impian Anda dan dapatkan reward jual unit ketika menjadi
          agen <span className="font-semibold">OTOPLUSID</span>
        </p>
        <Link
          href={"https://otoplusid.com"}
          target="_blank"
          className="mx-auto font-semibold text-sm text-blue-dark flex items-center gap-1"
        >
          Pelajari Selengkapnya
          <ChevronRight size={20} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
