import HeaderBack from "@/components/Header/HeaderBack";
import { getHistoryWithdraw } from "@/pages/api/api";
import Withdraw from "@/pages/Withdraw";
import { BanknoteArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const HistoryWithdraw = () => {
  const [data, setData] = useState([]);

  console.log(data);

  const fetchData = async () => {
    const res = await getHistoryWithdraw();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack />
      <div className="section-box">
        <div className="flex flex-col gap-4">
          {data?.map((item, index) => {
            return (
              <Link
                href={`/Withdraw/Detail/${item.id_withdraw}`}
                key={index}
                className="p-4 bg-white shadow-lg rounded-xl"
              >
                <div className="text-sm flex justify-between">
                  <div>
                    <h1 className="font-semibold">{item.nama_bank}</h1>
                    <p className="font-medium text-text-gray">
                      {item.atas_nama}
                    </p>
                  </div>
                  <h1 className="font-semibold text-xs text-text-gray">
                    {item.tanggal_withdraw}
                  </h1>
                </div>
                <div className="flex justify-between mt-4 flex-wrap gap-2">
                  <div className="flex gap-4">
                    <div className="text-sm">
                      <h3 className="font-medium text-text-gray">Jumlah</h3>
                      <h1 className="font-bold text-blue-semi">
                        Rp {new Intl.NumberFormat("de-DE").format(item.jumlah)}
                      </h1>
                    </div>
                    <div className="text-sm">
                      <h3 className="font-medium text-text-gray">No. Rek</h3>
                      <h1 className="font-bold text-blue-semi">
                        {item.no_rekening}
                      </h1>
                    </div>
                  </div>
                  <div className="text-sm">
                    <h3 className="font-medium text-text-gray">Status</h3>
                    <h1
                      className={`font-bold capitalize ${
                        item.status == "pending"
                          ? "text-yellow-semi"
                          : "text-blue-semi"
                      }`}
                    >
                      {item.status}
                    </h1>
                  </div>
                </div>
                {item.status == "success" ? (
                  <button
                    type="button"
                    className="text-sm font-semibold  bg-blue-semi w-full mt-4 p-2 rounded-xl text-white"
                  >
                    Lihat Detail
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-sm font-semibold  bg-red-semi w-full mt-4 p-2 rounded-xl text-white"
                  >
                    Batalkan Penarikan
                  </button>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistoryWithdraw;
