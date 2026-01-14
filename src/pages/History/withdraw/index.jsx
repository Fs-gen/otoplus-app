import CardWithdraw from "@/components/Card/CardWithdraw";
import HeaderBack from "@/components/Header/HeaderBack";
import { getHistoryWithdraw } from "@/pages/api/api";
import Link from "next/link";
import { useEffect, useState } from "react";

const HistoryWithdraw = () => {
  const [data, setData] = useState([]);

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
            return <CardWithdraw key={index} props={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default HistoryWithdraw;
