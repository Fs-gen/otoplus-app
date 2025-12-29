import CardHistory from "@/components/Card/CardHistory";
import HeaderText from "@/components/Header/HeaderText";
import historyData from "@/pages/api/dummy.json";

const HistoryTransaction = () => {
  const datas = historyData.dataHistoryTransaksi;
  return (
    <section>
      <HeaderText text="Riwayat Transaksi" />
      <div className="section-box">
        <CardHistory
          props={datas}
          href={"/"}
          status
        />
      </div>
    </section>
  );
};

export default HistoryTransaction;
