import CardHistory from "@/components/Card/CardHistory";
import HeaderText from "@/components/Header/HeaderText";
import Navbar from "@/components/Navbar";
import { getHistoryTransaction } from "@/pages/api/api";
import { highlightSkeleton } from "@/styles/style";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { BanknoteArrowDown } from "lucide-react";
import { Car } from "lucide-react";
import { ShoppingCart } from "lucide-react";

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
                          item?.status_type == "pending"
                            ? "text-yellow-semi"
                            : item?.status_type == "menunggu konfirmasi"
                            ? "text-blue-semi"
                            : "text-green-semi"
                        }
                        icon={
                          item.nama_transaksi == "Upgrade ke Agen Plus" ? (
                            <ShoppingCart size={25} color="white" />
                          ) : item.nama_transaksi == "Withdraw" ? (
                            <BanknoteArrowDown size={25} color="white" />
                          ) : (
                            <Car size={25} color="white" />
                          )
                        }
                        props={item}
                        key={index}
                        href={
                          item && item?.type == "upgrade_akun"
                            ? `/Detail/order/transaksi/${item.id}`
                            : item && item?.type == "withdraw"
                            ? `/Withdraw/${item.id}`
                            : `/InputJual/${item.id}`
                        }
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
