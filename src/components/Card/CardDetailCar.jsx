import { X } from "lucide-react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ButtonForm } from "../Button";

const TextDetail = ({ title, desc }) => {
  return (
    <div>
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm font-medium">{desc}</p>
    </div>
  );
};

const CardDetailCard = ({ props, show, close, showOffers }) => {
  const titleDesc =
    "w-max border-b-3 border-blue-semi text-xl font-semibold mt-4";
  const listDesc = "flex flex-col gap-4 mt-3";
  console.log(props);
  return (
    <div
      className={`${show ? "bottom-0" : "-bottom-130"} fixed left-0 right-0 bg-white p-6 max-w-125 z-20 mx-auto rounded-t-xl transition-all duration-300`}
    >
      <div className="flex justify-between">
        <h1 className="text-xl text-blue-semi font-semibold">{props?.model}</h1>
        <button onClick={close}>
          <X size={30} />
        </button>
      </div>
      <p className="text-text-gray text-sm mt-2 font-medium">
        {props?.tagline}
      </p>
      <div className="overflow-y-scroll scrollbar-hide max-h-80 mb-4 py-4">
        {/* Gambar */}
        <Swiper
          className="mb-4"
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={true}
          autoplay={{ delay: 2000 }}
          modules={[Autoplay, Pagination]}
        >
          {props &&
            props?.gambar.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    src={item}
                    width={1280}
                    height={480}
                    alt="Gambar"
                    className="rounded-xl"
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
        {/* Gambar */}
        {/* Spesifikasi */}
        <div>
          <h1 className={titleDesc}>Spesifikasi</h1>
          <div className={listDesc}>
            <TextDetail
              title="Transmisi"
              desc={props?.spesifikasi?.transmisi}
            />
            <TextDetail title="Dimensi" desc={props?.spesifikasi?.dimensi} />
            <TextDetail
              title="Fitur Utama"
              desc={props?.spesifikasi?.fitur_utama}
            />
            <TextDetail
              title="Keselamatan"
              desc={props?.spesifikasi?.keselamatan}
            />
            <TextDetail title="Lainnya" desc={props?.lainnya} />
          </div>
        </div>
        {/* Spesifikasi */}
        {/* Warna */}
        <div>
          <h1 className={titleDesc}>Warna</h1>
          <div className={listDesc}>
            <TextDetail desc={props?.warna_tersedia} />
          </div>
        </div>
        {/* Warna */}
        {/* Mesin */}
        <div>
          <h1 className={titleDesc}>Jenis Mesin</h1>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {props &&
              props?.spesifikasi.mesin.map((item, index) => {
                return (
                  <div key={index} className="p-4 bg-gray-200 rounded-xl">
                    <h1 className="text-lg font-semibold">{item.tipe}</h1>
                    <div className={listDesc}>
                      <TextDetail title="Kapasitas" desc={item.kapasitas} />
                      <TextDetail title="Torsi" desc={item.torsi} />
                      <TextDetail title="Tenaga" desc={item.tenaga} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Mesin */}
        {/* Varian */}
        <div>
          <h1 className={titleDesc}>Varian & Estimasi Harga</h1>
          <div className="bg-gray-200 flex flex-col gap-4 mt-4 p-6 rounded-lg">
            {props &&
              props?.varian.map((item, index) => {
                return (
                  <div
                    className="flex justify-between items-center border-b-2 border-gray-300 font-semibold"
                    key={index}
                  >
                    <p>{item.nama}</p>
                    <p>{item.harga}</p>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Varian */}
      </div>
      <ButtonForm
        click={showOffers}
        style="w-full p-4"
        text="Dapatkan Penawaran"
      />
    </div>
  );
};

export default CardDetailCard;
