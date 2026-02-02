import { useEffect, useState } from "react";
import Hero from "./Hero";
import { getKatalog, getNews } from "../api/api";
import BoxItem from "@/components/Box";
import CardCar from "@/components/Card/CardCar";
import Header from "./Header";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";
import { CardNewsBasic } from "@/components/Card/CardNews";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CardInstall from "@/components/PopUp/CardInstall";

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
  const [news, setNews] = useState([]);
  const [pwa, setPWA] = useState(false);
  const Loading = [];

  console.log(pwa);

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
    const isMobile = window.matchMedia("(display-mode: standalone)").matches;
    if (isMobile) {
      setPWA(true);
    }
    fetchData();
  }, []);

  return (
    <section className="section-box">
      {!pwa ? <CardInstall /> : null}
      <Header />
      <Hero />
      <BoxItem
        text="Katalog Mobil"
        subtext="Temukan mobil impian anda dari koleksi terbaik kami!"
        isMore
        href={"https://daihatsu.co.id/"}
        direct
        components={
          katalog && katalog.length == 0 ? (
            <div className="grid grid-cols-2 gap-4">{Loading}</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {katalog.map((item, index) => {
                return <CardCar props={item} key={index} />;
              })}
            </div>
          )
        }
        />
      <BoxItem
        text="News"
        isMore
        href={"/News"}
        components={
          news && news.length == 0 ? (
            <div className="grid grid-cols-2 gap-4">{Loading}</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {news.map((item, index) => {
                return <CardNewsBasic props={item} key={index} />;
              })}
            </div>
          )
        }
      />
    </section>
  );
};

export default Landing;
