import Image from "next/image";
import ArrowDown from "@/assets/images/icons/arrow/alt-arrow-down.svg";

const ButtonInput = ({ click, icon, title, text }) => {
  return (
    <button
      type="button"
      onClick={click}
      className="flex justify-between items-center w-full bg-white p-4 rounded-lg shadow-md"
    >
      <div className="flex items-center gap-2 text-start">
        <Image
          src={icon}
          width={40}
          height={40}
          alt="icon"
          className="p-2 bg-blue-semi rounded-lg"
        />
        <div>
          <h1 className="text-sm font-semibold">{title}</h1>
          <h1 className="text-sm font-medium">{text}</h1>
        </div>
      </div>
      <Image src={ArrowDown} width={20} height={20} alt="arrow Right" />
    </button>
  );
};

export default ButtonInput;
