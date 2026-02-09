import Image from "next/image";
import Link from "next/link";

const CardCar = ({ props, detail, offersClick }) => {
  return (
    <div className="rounded-xl shadow-lg" target="_blank">
      <div className="min-h-30 flex justify-center">
        <Image
          src={props.gambar[0]}
          alt={props.nama}
          width={320}
          height={320}
          className="rounded-t-xl object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4 min-h-34 md:min-h-max justify-between">
        <div className="">
          <h1 className="font-semibold">{props.model}</h1>
          <h1 className="text-[11px] font-semibold min-h-8">
            {props.harga_mulai_dari}
          </h1>
          <h1 className="text-[11px] font-semibold min-h-8 mt-2">
            {props.harga_mulai_dari_makassar}
          </h1>
        </div>
        <Link
          className="border-2 border-blue-semi w-full py-2 text-[10px] font-semibold text-blue-semi rounded-md flex gap-1 items-center justify-center"
          href={detail}
        >
          Detail
        </Link>
        <button
          className="bg-blue-semi border-2 border-blue-semi w-full py-2 text-[10px] font-semibold text-white rounded-md flex gap-1 items-center justify-center"
          onClick={offersClick}
        >
          Dapatkan Penawaran
        </button>
      </div>
    </div>
  );
};

export default CardCar;
