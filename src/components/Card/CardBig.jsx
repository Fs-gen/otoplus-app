import Link from "next/link";

const { default: Image } = require("next/image");

const CardBig = ({ desc, href, title, src }) => {
  return (
    <Link className="flex justify-between items-center rounded-[15px] shadow-box-primary p-4 mb-5" href={href}>
      <div className="w-1/2">
        <h1 className="text-[16px] font-semibold">{title}</h1>
        <p className="text-sm font-medium text-gray-semi">{desc}</p>
      </div>
      <div className="w-1/2">
        <Image src={src} width={100} height={100} alt="Illustration Image" className="ml-auto"/>
      </div>
    </Link>
  );
};

export default CardBig;
