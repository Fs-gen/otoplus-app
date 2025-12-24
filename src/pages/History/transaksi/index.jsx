import CardHistory from "@/components/Card/CardHistory";
import HeaderText from "@/components/Header/HeaderText";
import Link from "next/link";
import historyData from "@/pages/api/dummy.json"

const HistoryTransaction = () => {
  return (
    <section>
      <HeaderText text="Riwayat Transaksi" />
      <Link href={'/'}>Home</Link>
      <div className="section-box">
        <CardHistory props={historyData.dataHistoryTransaksi} href={'/'} status/>
      </div>
    </section>
  );
};

export default HistoryTransaction;
