import CardUser from "@/components/Card/CardUser";
import Image from "next/image";

// image
import Clock from "@/assets/images/icons/system/clock-blue.svg";

const Card = ({ color, icon, text }) => {
  return (
    <div className={`flex items-center px-4 gap-1 ${color}`}>
      {icon ? <Image src={icon} width={20} height={20} alt="" /> : null}
      <p className="text-xs capitalize">{text}</p>
    </div>
  );
};

const CardReferral = ({ props }) => {
  return (
    <div className="px-2 py-5 rounded-xl shadow-box-primary">
      <CardUser props={props} />
      <div className="border-b mx-4 border-gray-light my-5"></div>
      <div className="flex justify-between items-center">
        <Card
          text={`Status : ${props.status}`}
          color="text-yellow-semi whitespace-nowrap"
        />
        <Card
          icon={Clock}
          text={`Terdaftar ${props.created_at}`}
          color="text-[#4894FE]"
        />
      </div>
    </div>
  );
};

export default CardReferral;
