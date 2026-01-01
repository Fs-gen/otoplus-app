import BoxItem from "@/components/Box";
import CardBig from "@/components/Card/CardBig";
import CardNews from "@/components/Card/CardNews";
import dataDummy from "@/pages/api/dummy.json";
import Amount from "./Amount";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getUserHome } from "../api/api";

// Image
import GroupStroke from "@/assets/images/illustration/group-stroke.png";
import CardPerson from "@/assets/images/illustration/car-person.png";

const Home = () => {
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    const res = await getUserHome();
    setUser(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <div className="section-box">
        <Header props={user} />
        <Amount props={user} />
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
          href={"/Home"}
          components={<CardNews href={"/Home"} props={dataDummy} />}
        />
        {/* News */}
        {/* BoxItem */}
      </div>
    </section>
  );
};
export default Home;
