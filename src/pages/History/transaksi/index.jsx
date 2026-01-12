import CardHistory from "@/components/Card/CardHistory";
import HeaderText from "@/components/Header/HeaderText";
import Navbar from "@/components/Navbar";
import { getHistoryTransaction } from "@/pages/api/api";
import { highlightSkeleton } from "@/styles/style";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import CartBlue from "@/assets/images/icons/shopping/cart-blue.svg";
import ArrowDown from "@/assets/images/icons/arrow/arrow-circle-blue-down.svg";
import Image from "next/image";

const HistoryTransaction = () => {
  const [transaksi, setTransaksi] = useState([]);

  const fetchData = async () => {
    const res = await getHistoryTransaction();
    setTransaksi(res);
  };

  console.log(transaksi);

  useEffect(() => {
    fetchData();
  }, []);

  const LoadingCard = () => {
    return (
      <Skeleton
        count={1}
        height={80}
        borderRadius={20}
        highlightColor={highlightSkeleton}
      />
    );
  };

  return (
    <sectin>
      <HeaderText text="Riwayat Transaksi" />
      <div className="section-box">
        {transaksi && transaksi.length == 0 ? (
          <div className="flex flex-col gap-2">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <div>
            {transaksi && transaksi.message == "Data Tidak Ditemukan" ? (
              <h1 className="text-center">Tidak Ada Transaksi</h1>
            ) : (
              <div className="flex flex-col">
                {transaksi
                  ?.slice()
                  .reverse()
                  .map((item, index) => {
                    return (
                      <CardHistory
                        status={
                          item?.status == "belum dibayar"
                            ? "text-yellow-semi"
                            : item?.status == "menunggu konfirmasi"
                            ? "text-blue-semi"
                            : "text-green-semi"
                        }
                        icon={
                          item.nama_transaksi == "Upgrade ke Agen Plus" ? (
                            <Image
                              src={CartBlue}
                              width={20}
                              height={20}
                              alt="icon"
                            />
                          ) : (
                            <Image
                              src={ArrowDown}
                              width={20}
                              height={20}
                              alt="icon"
                            />
                          )
                        }
                        props={item}
                        key={index}
                        href={`/Detail/order/transaksi/${item.kode_aktivasi}`}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>
      <Navbar />
    </sectin>
  );
};

export default HistoryTransaction;
