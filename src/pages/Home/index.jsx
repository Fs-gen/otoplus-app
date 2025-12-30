import BoxItem from "@/components/Box";
import CardBig from "@/components/Card/CardBig";
import CardNews from "@/components/Card/CardNews";
import dataDummy from "@/pages/api/dummy.json";
import Skeleton from "react-loading-skeleton";

// Image
import GroupStroke from "@/assets/images/illustration/group-stroke.png";
import CardPerson from "@/assets/images/illustration/car-person.png";
import Header from "./Header";
import Amount from "./Amount";
import { useEffect, useState } from "react";
import { getUser } from "../api/api";

const Home = () => {
  const [user, setUser] = useState([]);
  // const header = Cookies.get("token");
  // const getUser = async () => {
  //   const config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: mainURL("profile/get-data"),
  //     headers: {
  //       Authorization: "Bearer " + header,
  //     },
  //   };

  //   await axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(response.data.data.data);
  //       setUser(response.data.data.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       console.log(header);
  //     });
  // };

  const fetchData = async () => {
    const res = await getUser();
    setUser(res);
  };

  console.log(user);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <div className="section-box">
        <Header props={user} />
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
