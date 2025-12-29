import Image from "next/image";
import Link from "next/link";

// Image
import ArrowDown from "@/assets/images/icons/arrow/arrow-circle-blue-down.svg";
import CartBlue from "@/assets/images/icons/shopping/cart-blue.svg";
import Rupiah from "@/assets/images/icons/shopping/rupiah-line.svg";
import Coin from "@/assets/images/icons/shopping/coin-blue.svg";

const CardHistory = ({ href, props, reward, status }) => {
  const fontSemi = "text-xs font-semibold";
  return (
    <div>
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
    </div>
  );
};

export default CardHistory;
