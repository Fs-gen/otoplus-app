// Image
import GroupStroke from "@/assets/images/illustration/group-stroke.png";
import CardPerson from "@/assets/images/illustration/car-person.png";
import NotificationBar from "@/components/NotificationBar";
import Navbar from "@/components/Navbar";
import { Copy } from "lucide-react";

import BoxItem from "@/components/Box";
import CardBig from "@/components/Card/CardBig";
import Amount from "./Amount";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getNews, getUserHome, getKatalog } from "../api/api";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";
import { useRouter } from "next/router";
import { ClipboardText } from "@/utils/utils";
import { CardNewsSwiper } from "@/components/Card/CardNews";
import CardCar from "@/components/Card/CardCar";
import CardInstall from "@/components/PopUp/CardInstall";
import CardOffer from "@/components/Card/CardOffer";
import InputCopy from "./InputCopy";

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

const CardSkeleton = () => {
  return (
    <div className="rounded-xl shadow-sm">
      <Skeleton count={1} height={120} highlightColor={highlightSkeleton} />
      <div className="p-4">
        <Skeleton count={1} height={15} highlightColor={highlightSkeleton} />
        <Skeleton count={1} height={15} highlightColor={highlightSkeleton} />
        <Skeleton
          count={1}
          height={30}
          className="mt-6"
          highlightColor={highlightSkeleton}
        />
      </div>
    </div>
  );
};

const Home = () => {
  const [user, setUser] = useState([]);
  const [katalog, setKatalog] = useState([]);
  const [showOffers, setShowOffers] = useState(false);
  const [detailIndex, setDetailIndex] = useState(0);
  const [referral, setReferral] = useState("");
  const [referralOffers, setReferralOffers] = useState("");
  const [news, setNews] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");
  const [pwa, setPWA] = useState(false);
  const router = useRouter();
  const token = Cookies.get("token");
  const Loading = [];

  for (let i = 0; i <= 6; i++) {
    Loading.push(<CardSkeleton />);
  }

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

  const fetchDataUser = async () => {
    const res = await getUserHome();
    const resKatalog = await getKatalog();
    Cookies.set("referralUser", res?.kode_referral);
    setUser(res);
    setKatalog(resKatalog);
    setReferral(`${window.location.origin}/ref/${res?.kode_referral}`);
    setReferralOffers(`${window.location.origin}/offers/${res?.kode_referral}`);
    if (res?.message == "Unauthorized" || !token) {
      TopMessage(
        "Silahkan Login Terlebih Dahulu. Mengalihkan ke halaman login!",
      );
      Cookies.remove("token");
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    } else {
      return;
    }
  };

  const fetchDataNews = async () => {
    const res = await getNews();
    setNews(res);
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(display-mode: standalone)").matches;
    if (isMobile) {
      setPWA(true);
    }
    fetchDataUser();
    fetchDataNews();
  }, []);

  return (
    <section>
      <div
        className={`${showOffers ? "block" : "hidden"} overflow-y-hidden fixed top-0 left-0 right-0 w-full min-h-dvh bg-black/50 z-20`}
      ></div>
      <CardOffer show={showOffers} hideClick={() => setShowOffers(false)} />
      <div className="section-box">
        {!pwa ? <CardInstall navbar /> : null}
        <NotificationBar showNotif={showNotif} text={text} success={success} />
        <Header props={user} />
        <Amount props={user} />
        {user && user?.type_akun == "freelance" ? (
          <div className="my-8.5"></div>
        ) : (
          <div>
            <InputCopy
              title="Bagikan Link kamu dan Dapatkan Reward!"
              desc="Link Undangan"
              props={referral}
              id="referral"
              copy={() => {
                ClipboardText(
                  referral,
                  TopMessage("berhasil salin!", setSuccess(true)),
                );
              }}
            />
            <div className="border-b-2 border-gray-200 mx-4"></div>
            <InputCopy
              title="Dapatkan Reward dari seseorang membeli mobil!"
              desc="Link Undangan"
              props={referralOffers}
              id="share"
              copy={() => {
                ClipboardText(
                  referralOffers,
                  TopMessage("berhasil salin!", setSuccess(true)),
                );
              }}
            />
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
        {/* Katalog */}
        <BoxItem
          text="Katalog Mobil"
          subtext="Temukan mobil impian anda dari koleksi terbaik kami!"
          components={
            katalog && katalog.length == 0 ? (
              <div className="grid grid-cols-2 gap-4">{Loading}</div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {katalog &&
                  katalog?.katalog.map((item, index) => {
                    return (
                      <CardCar
                        props={item}
                        key={index}
                        offersClick={() => setShowOffers(true)}
                        detailClick={() => {
                          setDetailIndex(index);
                          setShowDetail(true);
                        }}
                      />
                    );
                  })}
              </div>
            )
          }
        />
        {/* Katalog */}

        <div className="mt-8"></div>

        {/* News */}
        <BoxItem
          text="News"
          isMore
          href={"/News"}
          components={
            news && news.length == 0 ? (
              <div className="flex overflow-x-hidden gap-6 items-center">
                <SkeletonNews />
                <SkeletonNews />
              </div>
            ) : (
              <CardNewsSwiper props={news} />
            )
          }
        />
        {/* News */}
        {/* BoxItem */}
        {!pwa ? <div className="mt-32"></div> : <div className="mt-20"></div>}
        <Navbar />
      </div>
    </section>
  );
};
export default Home;
