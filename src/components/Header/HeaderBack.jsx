import ArrowBack from "@/assets/images/icons/arrow/arrow-line-left.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const HeaderBack = ({ click, text }) => {
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
      <span className="flex-1"></span>
    </div>
  );
};

export default HeaderBack;
