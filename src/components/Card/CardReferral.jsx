import CardUser from "@/components/Card/CardUser";
import Image from "next/image";

// image
import CartCheckout from "@/assets/images/icons/shopping/cart-checkout-yellow.svg";
import Clock from "@/assets/images/icons/system/clock-blue.svg";

const Card = ({ color, icon, text }) => {
  return (
    <div className={`flex items-center px-4 gap-1 ${color}`}>
      <Image src={icon} width={20} height={20} alt="" />
      <p className="text-xs">{text}</p>
    </div>
  );
};

const CardReferral = ({ props }) => {
  return (
    <div className="px-4 py-5 rounded-xl shadow-box-primary">
      <CardUser props={props} />
      <div className="border-b border-gray-light my-5"></div>
      <div className="flex justify-between items-center">
        <Card
          icon={CartCheckout}
          text={`${props.sale} Penjualan`}
          color="text-yellow-semi"
        />
        <Card
          icon={Clock}
          text={`Terdaftar ${props.joinDate}`}
          color="text-[#4894FE]"
        />
      </div>
    </div>
  );
};

export default CardReferral;
