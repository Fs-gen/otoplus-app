import { useEffect, useState } from "react";
import Hero from "./Hero";
import { getKatalog, getNews, mainURL } from "../api/api";
import BoxItem from "@/components/Box";
import CardCar from "@/components/Card/CardCar";
import Header from "./Header";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";
import { CardNewsBasic } from "@/components/Card/CardNews";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CardInstall from "@/components/PopUp/CardInstall";
import FormLine from "@/components/Form/FormLine";
import axios from "axios";
import CardDetailCard from "@/components/Card/CardDetailCar";
import NotificationBar from "@/components/NotificationBar";

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
  const [showDetail, setShowDetail] = useState(false);
  const [detailIndex, setDetailIndex] = useState(0);
  const [no_tlp, setNo_tlp] = useState("");
  const [nama, setNama] = useState("");
  const [domisil, setDomisil] = useState("");
  const [kode_referral, setKodeReferral] = useState("");
  const [news, setNews] = useState([]);
  const [showNotif, setShowNotif] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pwa, setPWA] = useState(false);
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

  const postWhatsapp = async (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      no_tlp,
      nama,
      domisil,
      kode_referral,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("contact/get-offers"),
      data: data,
    };

    if (no_tlp.trim() == "" || nama.trim() == "" || domisil.trim() == "") {
      setShowNotif(true);
      setText("Harap isi kolom yang masih kosong ( Kecuali kode referral )");
      setTimeout(() => {
        setShowNotif(false);
      }, 2000);
    } else {
      setLoading(true);
      await axios
        .request(config)
        .then((response) => {
          window.location.href = `${response?.data?.data?.url}`;
        })
        .catch((e) => {
          alert(e);
        });
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
      <NotificationBar showNotif={showNotif} text={text} />
      <div
        className={`${showDetail || showOffers ? "" : "hidden"} bg-black/25 max-w-125 h-dvh z-20 mx-auto top-0 left-0 right-0 fixed flex justify-center items-center px-4 py-12`}
      >
        {showDetail ? (
          <div className="w-full">
            <CardDetailCard
              props={katalog?.katalog[detailIndex]}
              close={() => setShowDetail(false)}
              offersClick={() => {
                setShowDetail(false);
                setShowOffers(true);
              }}
            />
          </div>
        ) : null}
        <div
          className={`${showOffers ? "" : "hidden"} bg-white p-4 w-full flex flex-col gap-4 rounded-xl`}
        >
          <h1 className="text-xl font-semibold">Masukkan Data Diri Anda</h1>
          <FormLine
            value={no_tlp}
            change={(e) => setNo_tlp(e.target.value)}
            title="No Whatsapp"
          />
          <FormLine
            value={nama}
            change={(e) => setNama(e.target.value)}
            title="Nama"
          />
          <FormLine
            value={domisil}
            change={(e) => setDomisil(e.target.value)}
            title="Domisili / Area"
          />
          <FormLine
            value={kode_referral}
            change={(e) => setKodeReferral(e.target.value)}
            title="Kode Referral"
          />
          <div className="flex font-medium text-sm gap-4">
            <button
              className="flex-1 border-2 border-blue-semi text-blue-semi px-4 py-2 rounded-md"
              onClick={() => setShowOffers(false)}
            >
              Kembali
            </button>
            <button
              className="flex-1 border-2 border-blue-semi bg-blue-semi text-white px-4 py-2 rounded-md"
              onClick={postWhatsapp}
            >
              {loading ? <div className="spinner-small"></div> : "Kirim"}
            </button>
          </div>
        </div>
      </div>
      <Hero />
      <div className="section-box">
        <div className="pb-20">
          {!pwa ? <CardInstall /> : null}
          <Header />
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
                  {katalog?.katalog.map((item, index) => {
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
          <div className="mt-12"></div>
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
        </div>
      </div>
    </section>
  );
};

export default Landing;
