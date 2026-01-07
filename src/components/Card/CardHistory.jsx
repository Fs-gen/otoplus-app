import Image from "next/image";
import Link from "next/link";

// Image
import ArrowDown from "@/assets/images/icons/arrow/arrow-circle-blue-down.svg";
import CartBlue from "@/assets/images/icons/shopping/cart-blue.svg";
import Rupiah from "@/assets/images/icons/shopping/rupiah-line.svg";
import Coin from "@/assets/images/icons/shopping/coin-blue.svg";
import { House } from "lucide-react";

const CardHistory = ({ href, props }) => {
  const fontSemi = "text-xs font-semibold";
  return (
    <Link
      className="flex justify-between items-center px-3.75 py-2.5 border border-[#e3e3e3] rounded-[20px] mb-2.5"
      href={href}
    >
      <div className="flex gap-2">
        <div className="p-2 bg-gray-semi rounded-full h-max">
          <House size={20} color="#FFFFFF" />
        </div>
        <div className="flex flex-col gap-1.5 text-xs capitalize">
          <h1 className="font-semibold">{props.nama_transaksi || props.jenis_transaksi}</h1>
          <h2 className="text-text-gray">{props.tanggal_bayar || props.created_at}</h2>
          <h2 className="font-semibold">
            Rp. {new Intl.NumberFormat("de-DE").format(props.jumlah)}
          </h2>
        </div>
      </div>
      <h1 className="text-xs font-semibold capitalize">{props.status}</h1>
    </Link>
  );
};

export default CardHistory;

{
  /* <div>
      {props.map((item, index) => {
        const iconStatus =
          item.title == "Withdraw"
            ? ArrowDown
            : item.title == "Upgrade ke Agen Plus"
            ? CartBlue
            : item.title == "Fee Edukasi"
            ? Rupiah
            : Coin;
        const statusColor = `${
          item.status == "Sukses"
            ? "text-green-semi"
            : item.status == "Pending"
            ? "text-yellow-semi"
            : "text-red-semi"
        }`;
        return (
          <Link
            href={href}
            className="flex justify-between items-center px-3.75 py-2.5 border border-[#e3e3e3] rounded-[20px] mb-2.5"
            key={index}
          >
            <div className="flex gap-2.5">
              <div className="p-1.5 bg-gray-light h-max rounded-full">
                <Image
                  src={iconStatus}
                  width={15}
                  height={15}
                  alt=""
                  className=""
                />
              </div>
              <div className="flex flex-col gap-1.25">
                <h1 className={fontSemi}>{item.title}</h1>
                <p className="text-xs text-text-gray">{item.date}</p>
                <h2
                  className={`${
                    reward ? "text-green-semi" : "text-text-gray"
                  } ${fontSemi}`}
                >
                  Rp {item.price}
                </h2>
              </div>
            </div>
            {status ? (
              <h1 className={`${statusColor} ${fontSemi}`}>{item.status}</h1>
            ) : null}
          </Link>
        );
      })}
    </div> */
}
