import CardHistory from "@/components/Card/CardHistory";
import HeaderText from "@/components/Header/HeaderText";
import Navbar from "@/components/Navbar";
import { getHistoryTransaction } from "@/pages/api/api";
import { highlightSkeleton } from "@/styles/style";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

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
                {transaksi.map((item, index) => {
                  return (
                    <CardHistory
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
