import Image from "next/image";
import ProfileUser from "@/assets/images/icons/logo.png";

const Header = () => {
  return (
    <div className="flex gap-2.5 px-3.75 pt-2.5 pb-2.5">
      <Image src={ProfileUser} alt="User Profile" width={50} height={50} />
      <div>
        <h1 className="font-bold">Dr. Joseph Brostito</h1>
        <p className="text-sm text-text-gray">Agen Plus</p>
      </div>
    </div>
  );
};

export default Header;
