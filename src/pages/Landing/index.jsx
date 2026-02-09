import { useEffect, useState } from "react";
import Hero from "./Hero";
import { getKatalog, getNews } from "../api/api";
import Cookies from "js-cookie";
import BoxItem from "@/components/Box";
import CardCar from "@/components/Card/CardCar";
import Header from "./Header";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";
import { CardNewsBasic } from "@/components/Card/CardNews";
import CardInstall from "@/components/PopUp/CardInstall";
import CardOffer from "@/components/Card/CardOffer";

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

const Landing = () => {
  const [katalog, setKatalog] = useState([]);
  const [showOffers, setShowOffers] = useState(false);
  const [news, setNews] = useState([]);
  const [pwa, setPWA] = useState(false);
  const referral = Cookies.get("referral");
  const Loading = [];

  for (let i = 0; i <= 6; i++) {
    Loading.push(<CardSkeleton />);
  }

  const fetchData = async () => {
    const resKatalog = await getKatalog();
    const resNews = await getNews();
    setKatalog(resKatalog);
    setNews(resNews);
  };

  useEffect(() => {
    fetchData();
    const isMobile = window.matchMedia("(display-mode: standalone)").matches;
    if (isMobile) {
      setPWA(true);
    }
  }, []);

  return (
    <section>
      <div
        className={`${showOffers ? "block" : "hidden"} overflow-y-hidden fixed top-0 left-0 right-0 w-full min-h-dvh bg-black/50 z-20`}
      ></div>
      <CardOffer
        show={showOffers}
        hideClick={() => setShowOffers(false)}
        kode_referral={referral}
      />
      <Hero />
      <div className="section-box">
        <div className="pb-20">
          {!pwa ? <CardInstall /> : null}
          <Header />
          <BoxItem
            text="Katalog Mobil"
            subtext="Temukan mobil impian anda dari koleksi terbaik kami!"
            components={
              katalog && katalog.length == 0 ? (
                <div className="grid grid-cols-2 gap-4">{Loading}</div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {katalog?.katalog.map((item, index) => {
                    return (
                      <CardCar
                        props={item}
                        key={index}
                        offersClick={() => setShowOffers(true)}
                        detail={`/Detail/car/${item?.model}`}
                      />
                    );
                  })}
                </div>
              )
            }
          />
          <div className="mt-12"></div>
          <BoxItem
            text="News"
            isMore
            href={"/News"}
            components={
              (news && news.length == 0) || news == null ? (
                <div className="grid grid-cols-2 gap-4">{Loading}</div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {news &&
                    news.map((item, index) => {
                      return <CardNewsBasic props={item} key={index} />;
                    })}
                </div>
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Landing;
