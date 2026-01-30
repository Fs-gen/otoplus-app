import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardCar = ({ props }) => {
  return (
    <Link className="rounded-xl shadow-sm" href={props.link} target="_blank">
      <div className="min-h-35 flex justify-center items-center">
        <Image src={props.gambar} alt={props.nama} width={320} height={320} />
      </div>
      <div className="flex flex-col gap-2 p-4 min-h-34 md:min-h-max justify-between">
        <div className="">
          <h1 className="font-semibold">{props.nama}</h1>
          <div className="text-[11px] font-semibold">
            <h1>Mulai Dari</h1>
            <h1>{props.harga_mulai}</h1>
          </div>
        </div>
        <Link
          className="bg-blue-semi w-full py-2 text-[10px] font-semibold text-white rounded-md flex gap-1 items-center justify-center"
          href={props.link}
          target="_blank"
        >
          Lihat Lengkap
          <ChevronRight size={15} strokeWidth={2} />
        </Link>
      </div>
    </Link>
  );
};

export default CardCar;
