import ArrowBack from "@/assets/images/icons/arrow/arrow-line-left.svg"
import Image from "next/image";
import { useRouter } from "next/router";

const HeaderBack = ({ click, text }) => {
  const router = useRouter()
  return (
    <div className="flex justify-between items-center p-5 shadow-md bg-white">
      <button type="button" className="w-6.25 cursor-pointer" onClick={click ? click : () => router.back()}>
        <Image src={ArrowBack} width={25} height={25} alt="Back"/>
      </button>
      <h1 className="text-sm font-medium">{text}</h1>
      <span className="w-6.25"></span>
    </div>
  );
};

export default HeaderBack;
