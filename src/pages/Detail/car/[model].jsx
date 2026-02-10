import { mainURL } from "@/pages/api/api";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonDetailCar from "./Skeleton";
import { Autoplay, Pagination } from "swiper/modules";
import CardOffer from "@/components/Card/CardOffer";
import Cookies from "js-cookie";
import BoxModel from "./BoxModel";
import CardSpec from "./CardSpec";
import { ChevronRight } from "lucide-react";

const DetailCar = ({ model }) => {
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [showSpec, setShowSpec] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const referral = Cookies.get("referral");
  const handlerScroll = () => {
    setScroll(window.pageYOffset);
  };

  const getDetailCar = async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: mainURL(`home/get-produk-detail?model=${model}`),
    };

    await axios
      .request(config)
      .then((response) => {
        setData(response?.data?.data);
        console.log(response?.data?.data);
      })
      .catch((e) => {
        alert("Terjadi Kesalahan");
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", handlerScroll);
    getDetailCar();
    return () => window.removeEventListener("scroll", handlerScroll);
  }, []);
  return (
    <section>
      <div
        className={`fixed max-w-125 top-0 ${scroll > 50 ? "bg-white shadow-md" : "bg-black/25 text-white"} left-0 right-0 mx-auto px-3 flex items-center gap-2 py-3 z-10 transition-all duration-100`}
      >
        <Link href={"/"}>
          <ArrowLeft size={25} />
        </Link>
        <h1 className="text-lg font-semibold">{data?.model}</h1>
      </div>
      {/* Bckground Black */}
      <div
        className={`${showOffers || showModel ? "bg-black/25 z-10" : "-z-10"} fixed top-0 left-0 right-0 h-full w-full`}
      ></div>
      {/* Bckground Black */}
      <div
        className={`${showModel ? "bottom-0 z-50" : "-bottom-120 z-20"} fixed w-full px-4 py-6 max-w-125 bg-white rounded-t-xl flex flex-col gap-4 transition-all duration-300`}
      >
        <h1 className="font-semibold text-lg">
          Pilih transmisi mobil{" "}
          <span className="text-blue-semi font-bold">{data?.model}</span> sesuai
          kebutuhanmu
        </h1>
        <div className="max-h-80 scrollbar-hide overflow-y-scroll ">
          <BoxModel props={data?.varian} scroll />
        </div>
        <button
          onClick={() => setShowModel(!showModel)}
          className="bg-blue-dark rounded-xl text-white p-3 font-semibold"
        >
          Kembali
        </button>
      </div>
      <CardOffer
        show={showOffers}
        hideClick={() => setShowOffers(false)}
        kode_referral={referral}
      />
      {data && data.length == 0 ? (
        <SkeletonDetailCar />
      ) : (
        <div className="mb-20">
          {
            <Swiper
              autoplay={{ delay: 2000 }}
              pagination={true}
              spaceBetween={20}
              loop={true}
              modules={[Autoplay, Pagination]}
            >
              {data &&
                data?.gambar.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        src={item}
                        width={1280}
                        height={480}
                        alt={data?.model}
                      />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          }
          <div className="flex flex-col gap-4 mt-6 px-5">
            <p className="text-text-gray text-sm font-medium">
              {data?.tagline}
            </p>
            {/* Warna */}
            <div>
              <h1 className="text-xl font-semibold mb-2">Varian Warna</h1>
              <div className="flex flex-wrap gap-2">
                {data &&
                  data?.warna_tersedia.map((item, index) => {
                    return (
                      <div
                        className="flex items-center gap-2 px-2 py-1 rounded-full shadow-sm"
                        key={index}
                      >
                        <div
                          className={`w-4 h-4 rounded-full`}
                          style={{ backgroundColor: item.code }}
                        ></div>
                        <p className="text-xs">{item.warna}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* Warna */}
            {/* Spesifikasi */}
            <CardSpec
              props={data?.spesifikasi}
              show={showSpec}
              click={() => setShowSpec(!showSpec)}
            />
            {/* Spesifikasi */}
            <BoxModel
              props={data?.varian.slice(0, 3)}
              title={`Dapatkan Varian ${data?.model} Impianmu`}
            />
            <button
              className="mt-4 flex justify-center gap-2 items-center"
              onClick={() => setShowModel(true)}
            >
              <h1 className="font-semibold text-blue-semi">Lihat Semua</h1>
              <ChevronRight size={20} strokeWidth={2.5} color="#00529c" />
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-blue-semi border-2 border-blue-semi w-full py-4 text-sm font-semibold text-white fixed bottom-0 left-0 right-0 max-w-125 mx-auto z-20"
        onClick={() => setShowOffers(true)}
      >
        Dapatkan Penawaran
      </button>
    </section>
  );
};

export default DetailCar;

export const getServerSideProps = async (context) => {
  const { model } = context.query;
  return {
    props: {
      model,
    },
  };
};
