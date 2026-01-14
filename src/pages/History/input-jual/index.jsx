import HeaderBack from "@/components/Header/HeaderBack";
import { getHistoryInputPenjualan } from "@/pages/api/api";
import { highlightSkeleton } from "@/styles/style";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Skeletons = () => {
  return(
    <Skeleton
      count={1}
      height={120}
      highlightColor={highlightSkeleton}
      borderRadius={10}
    />
  );
};

const HistoryInputJual = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getHistoryInputPenjualan();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Histori Input Penjualan" />
      <div className="section-box">
        {data && data.length == 0 ? (
          <div className="flex flex-col gap-4">
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.map((item, index) => {
              return (
                <Link
                  href={"/"}
                  key={index}
                  className="bg-white shadow-lg p-4 rounded-xl flex justify-between"
                >
                  <div className="flex-1">
                    <h1 className="font-semibold">{item.nama_lengkap}</h1>
                    <h3 className="text-sm text-text-gray font-semibold">
                      {item.merek_tipe_mobil}
                    </h3>
                    <div className="text-text-gray mt-4 text-sm">
                      <h1 className="font-medium">No. Hp</h1>
                      <h3 className="font-bold">{item.no_hp}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-end justify-between">
                    <h1
                      className={`px-4 w-max rounded-md font-semibold py-1 text-white text-sm ${
                        item.status == "pending"
                          ? "bg-yellow-semi"
                          : item.status == "rejected"
                          ? "bg-red-semi"
                          : "bg-blue-semi"
                      }`}
                    >
                      {item.status}
                    </h1>
                    <h1 className="font-semibold text-green-semi text-sm">
                      {item.jenis_pembayaran}
                    </h1>
                    <h1 className="text-text-gray text-sm font-semibold text-right">
                      {item.created_at}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default HistoryInputJual;
