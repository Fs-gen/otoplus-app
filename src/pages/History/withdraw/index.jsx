import CardWithdraw from "@/components/Card/CardWithdraw";
import HeaderBack from "@/components/Header/HeaderBack";
import { getHistoryWithdraw } from "@/pages/api/api";
import { highlightSkeleton } from "@/styles/style";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Skeletons = () => {
  return (
    <Skeleton
      count={1}
      borderRadius={15}
      height={120}
      highlightColor={highlightSkeleton}
    />
  );
};

const HistoryWithdraw = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getHistoryWithdraw();
    setData(res);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Histori Withdraw" />
      <div className="section-box">
        {data && data?.message == "Withdraw Tidak Ditemukan" ? (
          <h1 className="text-center">Tidak Ada Penarikan</h1>
        ) : (
          <div>
            {data && data.length == 0 ? (
              <div className="flex flex-col gap-4">
                <Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {data?.map((item, index) => {
                  return <CardWithdraw key={index} props={item} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HistoryWithdraw;
