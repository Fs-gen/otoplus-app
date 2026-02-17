// Image
import GroupStroke from "@/assets/images/illustration/group-stroke.png";
import CardPerson from "@/assets/images/illustration/car-person.png";
import NotificationBar from "@/components/NotificationBar";
import Navbar from "@/components/Navbar";

import BoxItem from "@/components/Box";
import CardBig from "@/components/Card/CardBig";
import Amount from "./Amount";
import Header from "./Header";
import { useEffect, useState } from "react";
import {
  getListNews,
  getUserHome,
  getListKatalog,
  getListPromotion,
  getPelunasan,
} from "../api/api";
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
import { Swiper, SwiperSlide } from "swiper/react";
import CardPromotion from "@/components/Card/CardPromotion";
import { Autoplay, Pagination } from "swiper/modules";
import CardCS from "@/components/Card/CardCS";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

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
  const [promotion, setPromotion] = useState([]);
  const [katalog, setKatalog] = useState([]);
  const [pelunasan, setPelunasan] = useState([]);
  const [showKatalog, setShowKatalog] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
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

  const fetchData = async () => {
    const res = await getUserHome();
    const resPelunasan = await getPelunasan(token);
    const resPromotion = await getListPromotion();
    const resKatalog = await getListKatalog();
    const resNews = await getListNews();
    setPelunasan(resPelunasan);
    setPromotion(resPromotion);
    setNews(resNews);
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
      }, 2000);
    } else {
      return;
    }
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(display-mode: standalone)").matches;
    if (isMobile) {
      setPWA(true);
    }
    fetchData();
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
        {pelunasan && pelunasan.length == 0 ? (
          <div className="mt-4">
            <Skeleton count={1} height={80} borderRadius={10} />
          </div>
        ) : (
          <div
            className={
              pelunasan.belum_upload_dp == 0 &&
              pelunasan.belum_upload_pelunasan == 0
                ? "hidden"
                : ""
            }
          >
            <div className="text-white text-xs font-semibold bg-blue-semi py-4 rounded-[10px] mt-4 px-4 ">
              <p className="mb-4">
                Kamu memiliki penjualan yang belum upload{" "}
                {pelunasan.belum_upload_dp != 0 ? (
                  <span className="text-yellow-semi font-bold">
                    Bukti DP <span>{pelunasan?.belum_upload_dp}</span>
                  </span>
                ) : null}{" "}
                {pelunasan.belum_upload_dp == 0 ||
                pelunasan.belum_upload_pelunasan == 0
                  ? null
                  : "dan"}{" "}
                {pelunasan.belum_upload_pelunasan != 0 ? (
                  <span>
                    <span className="text-yellow-semi font-bold">
                      Bukti Pelunasan{" "}
                      <span>{pelunasan?.belum_upload_pelunasan}</span>
                    </span>
                  </span>
                ) : null}
              </p>
              <div>
                <Link
                  className="text-center bg-white text-black py-2 rounded-[10px] text-sm w-max px-4"
                  href={"/History/input-jual"}
                >
                  Lihat Histori Penjualan
                </Link>
              </div>
            </div>
          </div>
        )}
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
              title="Bagikan katalog dan dapatkan reward dari setiap pembelian mobil melalu link ini!"
              desc="Link Katalog"
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
        {user && user?.type_akun == "agen plus" ? null : user &&
          user.length == 0 ? (
          <Skeleton count={1} height={100} borderRadius={20} />
        ) : (
          <CardBig
            title="Upgrade ke Agen Plus"
            desc="Dapatkan Fasilitas dan Voucher Lebih Banyak!"
            src={GroupStroke}
            href={`/Detail/produk/`}
          />
        )}
        {/* Button Big */}

        {/* BoxItem */}
        {/* Promo */}
        <BoxItem
          text="Promo"
          components={
            promotion && promotion.length == 0 ? (
              <div className="flex overflow-x-hidden gap-6">
                <SkeletonNews />
                <SkeletonNews />
              </div>
            ) : (
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                autoplay={{ delay: 2000 }}
                pagination={true}
                loop={true}
                modules={[Autoplay, Pagination]}
              >
                {promotion.map((item, index) => {
                  return (
                    <SwiperSlide key={index} className="px-4">
                      <CardPromotion props={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )
          }
        />
        {/* Promo */}
        {/* Katalog */}
        <BoxItem
          text="Katalog Mobil"
          subtext="Temukan mobil impian anda dari koleksi terbaik kami!"
          components={
            katalog && katalog.length == 0 ? (
              <div className="grid grid-cols-1 gap-4">{Loading}</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {katalog &&
                  katalog?.katalog
                    .slice(0, showKatalog ? katalog?.katalog.length : 2)
                    .map((item, index) => {
                      return (
                        <CardCar
                          props={item}
                          key={index}
                          offersClick={() => setShowOffers(true)}
                          detail={`/Detail/car/${item.model}`}
                        />
                      );
                    })}
                <button
                  className="mt-4 flex justify-center gap-2 items-center"
                  onClick={() => setShowKatalog(!showKatalog)}
                >
                  <h1 className="font-semibold text-blue-semi">
                    {showKatalog ? "Lebih Sedikit" : "Lihat Semua Katalog"}
                  </h1>
                  <ChevronDown
                    size={20}
                    strokeWidth={2.5}
                    color="#00529c"
                    className={showKatalog ? "rotate-180" : "rotate-0"}
                  />
                </button>
              </div>
            )
          }
        />
        {/* Katalog */}

        <div className="my-8">
          <CardCS />
        </div>

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
