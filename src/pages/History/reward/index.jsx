import CardHistory from "@/components/Card/CardHistory";
import Navbar from "@/components/Navbar";
import { getHistoryReward } from "@/pages/api/api";
import dataReward from "@/pages/api/dummy.json";
import { highlightSkeleton } from "@/styles/style";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const { default: HeaderText } = require("@/components/Header/HeaderText");

const HistoryReward = () => {
  const [reward, setReward] = useState([]);

  const fetchData = async () => {
    const res = await getHistoryReward();
    setReward(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const LoadingCard = () => {
    return (
      <Skeleton
        count={1}
        borderRadius={20}
        height={80}
        highlightColor={highlightSkeleton}
      />
    );
  };

  return (
    <section>
      <HeaderText text="Riwayat Reward" />
      <div className="section-box">
        {reward && reward.length == 0 ? (
          <div className="flex flex-col gap-2">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <div className="flex flex-col">
            {reward.map((item, index) => {
              return <CardHistory props={item} href={"/"} key={index} />;
            })}
          </div>
        )}
      </div>
      <Navbar />
    </section>
  );
};

export default HistoryReward;
