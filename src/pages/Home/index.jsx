import BoxItem from "@/components/Box";
import CardBig from "@/components/Card/CardBig";
import CardNews from "@/components/Card/CardNews";
import dataDummy from "@/pages/api/dummy.json";
import Amount from "./Amount";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getUserHome } from "../api/api";
import Cookies from "js-cookie";

// Image
import GroupStroke from "@/assets/images/illustration/group-stroke.png";
import CardPerson from "@/assets/images/illustration/car-person.png";
import NotificationBar from "@/components/NotificationBar";
import Navbar from "@/components/Navbar";
import { Copy } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";

const Home = () => {
  const [user, setUser] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [text, setText] = useState("");
  const token = Cookies.get("token");

  const cekToken = () => {
    if (!token) {
      setShowNotif(true);
      setText("Silahkan Login Terlebih Dahulu. Mengalihkan ke halaman login!");
      setTimeout(() => {
        window.location.href = "/Auth/Login";
      }, 3000);
    }
  };

  const fetchData = async () => {
    const res = await getUserHome();
    setUser(res);
  };

  useEffect(() => {
    cekToken();
    fetchData();
  }, []);

  return (
    <section className="section-box">
      <NotificationBar showNotif={showNotif} text={text} />
      <Header props={user} />
      <Amount props={user} />
      <div className="mx-6 my-8.5">
        <h1 className="font-semibold mb-4">
          Bagikan Link kamu dan Dapatkan Reward!
        </h1>
        <p className="font-semibold text-xs text-text-gray">Link Undangan</p>
        <div className="flex justify-between gap-4 items-center mt-1.5">
          {user && user.length == 0 ? (
            <Skeleton
              borderRadius={10}
              count={1}
              containerClassName="w-full"
              height={30}
              highlightColor={highlightSkeleton}
            />
          ) : (
            <input
              disabled
              className="text-sm font-medium placeholder:text-black py-1.5 px-3 border border-gray-semi rounded-lg w-full"
              value={`https://test-otoplus.vercel.app/ref/${user.kode_referral}`}
            />
          )}
          <button type="button">
            <Copy size={25} />
          </button>
        </div>
      </div>

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
        components={<CardNews href={"/Home"} props={dataDummy.dataNews} />}
      />
      {/* News */}
      {/* BoxItem */}
      <Navbar />
    </section>
  );
};
export default Home;
