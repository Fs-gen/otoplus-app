import CardHistory from "@/components/Card/CardHistory";
import HeaderText from "@/components/Header/HeaderText";
import Navbar from "@/components/Navbar";
import historyData from "@/pages/api/dummy.json";

const HistoryTransaction = () => {
  const datas = historyData.dataHistoryTransaksi;
  return (
    <sectin>
      <HeaderText text="Riwayat Transaksi" />
      <div className="section-box">
        <CardHistory props={datas} href={"/"} status />
      </div>
      <Navbar />
    </sectin>
  );
};

export default HistoryTransaction;
