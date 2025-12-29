import CardHistory from "@/components/Card/CardHistory";
import dataReward from "@/pages/api/dummy.json";

const { default: HeaderText } = require("@/components/Header/HeaderText");

const HistoryReward = () => {
  return (
    <section>
      <HeaderText text="Riwayat Reward" />
      <div className="section-box">
        <CardHistory props={dataReward.dataHistoryReward} href={"/"} reward />
      </div>
    </section>
  );
};

export default HistoryReward;
