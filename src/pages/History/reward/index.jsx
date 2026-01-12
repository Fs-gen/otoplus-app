// Image
import Coin from "@/assets/images/icons/shopping/coin-blue.svg";

import CardHistory from "@/components/Card/CardHistory";
import Navbar from "@/components/Navbar";
import { getHistoryReward } from "@/pages/api/api";
import { highlightSkeleton } from "@/styles/style";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const { default: HeaderText } = require("@/components/Header/HeaderText");

const HistoryReward = () => {
  const [reward, setReward] = useState([]);

  const fetchData = async () => {
    const res = await getHistoryReward();
    setReward(res);
  };

  console.log(reward);

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
            {reward && reward?.message == "Data Tidak Ditemukan" ? (
              <h1 className="text-center">Tidak Histori Reward</h1>
            ) : (
              reward
                ?.slice()
                .reverse()
                .map((item, index) => {
                  return (
                    <CardHistory
                      reward
                      cursor
                      props={item}
                      href={""}
                      key={index}
                      icon={<Image src={Coin} alt="" width={20} height={20} />}
                    />
                  );
                })
            )}
          </div>
        )}
      </div>
      <Navbar />
    </section>
  );
};

export default HistoryReward;
