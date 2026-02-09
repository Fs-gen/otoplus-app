import { mainURL } from "@/pages/api/api";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonDetailCar from "./Skeleton";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronRight } from "lucide-react";
import { Cog } from "lucide-react";
import CardOffer from "@/components/Card/CardOffer";
import Cookies from "js-cookie";

const TextDetail = ({ title, desc }) => {
  return (
    <div>
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm font-medium">{desc}</p>
    </div>
  );
};

const DetailCar = ({ model }) => {
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [showSpec, setShowSpec] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
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
        className={`${showOffers ? "bg-black/25 z-10" : "-z-10"} fixed top-0 left-0 right-0 h-full w-full`}
      ></div>
      <CardOffer
        show={showOffers}
        hideClick={() => setShowOffers(false)}
        kode_referral={referral}
      />
      <div
        className={`fixed max-w-125 top-0 ${scroll > 50 ? "bg-white shadow-md" : "bg-black/25 text-white"} left-0 right-0 mx-auto px-3 flex items-center gap-2 py-3 z-10 transition-all duration-100`}
      >
        <Link href={"/"}>
          <ArrowLeft size={25} />
        </Link>
        <h1 className="text-lg font-semibold">{data?.model}</h1>
      </div>
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
            <div className="flex flex-wrap gap-2">
              {data &&
                data?.warna_tersedia.map((item, index) => {
                  return (
                    <div
                      className="flex items-center gap-2 px-2 py-1 rounded-full shadow-sm"
                      key={index}
                    >
                      <div className="w-4 h-4 rounded-full bg-red-200"></div>
                      <p className="text-xs">{item}</p>
                    </div>
                  );
                })}
            </div>
            {/* Spesifikasi */}
            <button
              className="border-2 border-blue-semi rounded-xl"
              onClick={() => setShowSpec(!showSpec)}
            >
              <div className="flex items-center justify-between bg-blue-semi p-4 rounded-lg text-white ">
                <div className="flex gap-2 items-center">
                  <div className={`bg-white p-1 rounded-lg`}>
                    <Cog
                      size={30}
                      color="#00529c"
                      className={`${showSpec ? "rotate-90" : ""} transition`}
                    />
                  </div>
                  <p className="font-semibold">Spesifikasi</p>
                </div>
                <ChevronRight
                  size={25}
                  color="white"
                  className={`${showSpec ? "rotate-90" : ""} transition`}
                />
              </div>
              <div className={`${showSpec ? "block" : "hidden"} p-4`}>
                <div className="flex flex-col text-left gap-4">
                  <TextDetail
                    title="Dimensi"
                    desc={data?.spesifikasi.dimensi}
                  />
                  <TextDetail
                    title="Fitur Utama"
                    desc={data?.spesifikasi.fitur_utama}
                  />
                  <TextDetail
                    title="Keselamatan"
                    desc={data?.spesifikasi.keselamatan}
                  />
                  <TextDetail title="Lainnya" desc={data?.lainnya} />
                </div>
              </div>
            </button>
            {/* Spesifikasi */}
            <div className="flex flex-col gap-4">
              <h1 className="font-semibold text-xl">
                Dapatkan Varian{" "}
                {data?.model.replace("All", "").replace("New ", "")} Impianmu
              </h1>
              {data &&
                data?.varian.slice(0, 3).map((item, index) => {
                  const nama = data?.model.replace("All", "");
                  return (
                    <div
                      key={index}
                      className="px-4 py-5 border-2 border-blue-semi rounded-xl"
                    >
                      <h1 className="text-xl font-semibold">
                        {nama} {item.nama}
                      </h1>
                      <div className="py-1">
                        <p className="font-medium text-sm">
                          Jakarta Harga - {item.harga}
                        </p>
                        <p className="font-medium text-sm">
                          Harga Makssaar - {item.harga_makassar}
                        </p>
                      </div>
                      <p className="font-medium text-sm"></p>
                      <p className="text-xs font-semibold text-text-gray">
                        Kapasitas: {item.kapasitas}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      <button
        className="bg-blue-semi border-2 border-blue-semi w-full py-4 text-sm font-semibold text-white fixed bottom-0 left-0 right-0 max-w-125 mx-auto"
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
