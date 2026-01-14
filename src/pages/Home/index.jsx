// Image
import GroupStroke from "@/assets/images/illustration/group-stroke.png";
import CardPerson from "@/assets/images/illustration/car-person.png";
import NotificationBar from "@/components/NotificationBar";
import Navbar from "@/components/Navbar";
import { Copy } from "lucide-react";

import BoxItem from "@/components/Box";
import CardBig from "@/components/Card/CardBig";
import CardNews from "@/components/Card/CardNews";
import Amount from "./Amount";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getNews, getUserHome } from "../api/api";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";
import { useRouter } from "next/router";

const SkeletonNews = () => {
  return (
    <div className="flex flex-col gap-2.5 max-w-75">
      <Skeleton
        count={1}
        width={300}
        height={200}
        highlightColor={highlightSkeleton}
      />
      <Skeleton count={3} width={300} highlightColor={highlightSkeleton} />
      <div className="flex justify-between">
        <Skeleton count={1} width={100} highlightColor={highlightSkeleton} />
        <Skeleton count={1} width={100} highlightColor={highlightSkeleton} />
      </div>
    </div>
  );
};

const Home = () => {
  const [user, setUser] = useState([]);
  const [news, setNews] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();
  const token = Cookies.get("token");

  const TopMessage = (text, success) => {
    setShowNotif(true);
    setText(text);
    {
      success;
    }
    setTimeout(() => {
      setShowNotif(false);
    }, 3000);
  };

  const cekToken = () => {
    if (!token) {
      TopMessage(
        "Silahkan Login Terlebih Dahulu. Mengalihkan ke halaman login!"
      );
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    } else if (user.message == "Unauthorized") {
      TopMessage(
        "Akun telah digunakan pada device berbeda! Mengalihkan otomatis"
      );
      Cookies.remove("token");
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  };

  const fetchDataUser = async () => {
    const res = await getUserHome();
    setUser(res);
  };

  const fetchDataNews = async () => {
    const res = await getNews();
    setNews(res);
  };

  useEffect(() => {
    cekToken();
    fetchDataUser();
    fetchDataNews();
  }, []);

  return (
    <section className="section-box">
      <NotificationBar showNotif={showNotif} text={text} />
      <Header props={user} />
      <Amount props={user} />
      {user.type_akun == "freelance" ? (
        <span className="my-8.5"></span>
      ) : (
        <div className="mx-4 my-8.5">
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
                value={`https://otoplus-app.vercel.app/ref/${user.kode_referral}`}
              />
            )}
            <button type="button">
              <Copy size={25} />
            </button>
          </div>
        </div>
      )}

      {/* Button Big */}
      <CardBig
        title="Input Penjualan"
        desc="Input penjualan, Setelah disetujui dapatkan reward"
        src={CardPerson}
        href={"/InputJual"}
      />
      {user && user?.type_akun == "agen plus" ? null : (
        <CardBig
          title="Upgrade ke Agen Plus"
          desc="Dapatkan Fasilitas dan Voucher Lebih Banyak!"
          src={GroupStroke}
          href={`/Detail/produk/`}
        />
      )}
      {/* Button Big */}

      {/* BoxItem */}
      {/* News */}
      <BoxItem
        text="News"
        isMore
        href={"/Home"}
        components={
          news && news.length == 0 ? (
            <div className="flex overflow-x-hidden gap-6 items-center">
              <SkeletonNews />
              <SkeletonNews />
            </div>
          ) : (
            <CardNews props={news} />
          )
        }
      />
      {/* News */}
      {/* BoxItem */}
      <div className="mt-20"></div>
      <Navbar />
    </section>
  );
};
export default Home;
