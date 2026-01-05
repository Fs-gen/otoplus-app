import CardHistory from "@/components/Card/CardHistory";
import Navbar from "@/components/Navbar";
import dataReward from "@/pages/api/dummy.json";

const { default: HeaderText } = require("@/components/Header/HeaderText");

const HistoryReward = () => {
  return (
    <section>
      <HeaderText text="Riwayat Reward" />
      <div className="section-box">
        <CardHistory props={dataReward.dataHistoryReward} href={"/"} reward />
      </div>
      <Navbar />
    </section>
  );
};

export default HistoryReward;
