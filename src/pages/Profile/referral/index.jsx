import CardReferral from "@/components/Card/CardReferral";
import HeaderBack from "@/components/Header/HeaderBack";
import { getListReferral } from "@/pages/api/api";
import DataReferral from "@/pages/api/dummy.json";
import { useEffect, useState } from "react";

const Referral = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getListReferral();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Referral Saya" />
      <div className="section-box">
        <div className="flex flex-col gap-3">
          {data.map((item, index) => {
            return <CardReferral props={item} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Referral;
