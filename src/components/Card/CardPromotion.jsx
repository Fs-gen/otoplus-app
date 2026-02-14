import Image from "next/image";
import Link from "next/link";

const CardPromotion = ({ props }) => {
  return (
    <Link href={`/Detail/promo/${props?.id}`}>
      <Image
        src={props.image_url}
        alt={props?.title}
        width={400}
        height={400}
        className="max-h-32 rounded-xl mx-auto"
      />
      <div className="py-2 px-4">
        <h1 className="font-semibold mb-2">{props?.title}</h1>
        <p className="text-text-gray text-xs">{props?.created_at}</p>
      </div>
    </Link>
  );
};

export default CardPromotion;
