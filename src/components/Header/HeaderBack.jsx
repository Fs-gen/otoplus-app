import ArrowBack from "@/assets/images/icons/arrow/arrow-line-left.svg";
import { History } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderBack = ({ click, href, link, text }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center p-5 shadow-md bg-white">
      <button
        type="button"
        className="w-6.25 cursor-pointer flex-1"
        onClick={click ? click : () => router.back()}
      >
        <Image src={ArrowBack} width={25} height={25} alt="Back" />
      </button>
      <h1 className="text-sm text-center font-medium flex-3">{text}</h1>
      {link ? (
        <Link
          href={href}
          className="font-semibold text-blue-dark whitespace-nowrap text-sm flex-1 flex items-center gap-0.5 justify-end"
        >
          <History size={20} color="#132248" />
          {link}
        </Link>
      ) : (
        <span className="flex-1"></span>
      )}
    </div>
  );
};

export default HeaderBack;
