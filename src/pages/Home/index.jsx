import BoxItem from "@/components/Box";
import CardBig from "@/components/Card/CardBig";
import CardNews from "@/components/Card/CardNews";
import dataDummy from "@/pages/api/dummy.json";

// Image
import GroupStroke from "@/assets/images/illustration/group-stroke.png";
import CardPerson from "@/assets/images/illustration/car-person.png";
import Header from "./Header";
import Amount from "./Amount";

const Home = () => {
  return (
    <section>
      <div className="section-box">
        <Header />
        <Amount />
        <div className="mt-8"></div>

        {/* Button Big */}
        <CardBig
          title="Input Penjualan"
          desc="Input penjualan, Setelah disetujui dapatkan reward"
          src={CardPerson}
          href={"/InputJual"}
        />
        <CardBig
          title="Upgrade ke Agen Plus"
          desc="Dapatkan Fasilitas dan Voucher Lebih Banyak!"
          src={GroupStroke}
          href={`/Detail/produk/`}
        />
        {/* Button Big */}

        {/* BoxItem */}
        {/* News */}
        <BoxItem
          text="News"
          isMore
          href={"/"}
          components={<CardNews href={"/"} props={dataDummy} />}
        />
        {/* News */}
        {/* BoxItem */}
      </div>
    </section>
  );
};
export default Home;
