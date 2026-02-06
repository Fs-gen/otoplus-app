import { X } from "lucide-react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TextDetail = ({ title, desc }) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-1">{title}</p>
      <p className="text-sm font-medium">{desc}</p>
    </div>
  );
};

const CardDetailCard = ({ props, close, offersClick }) => {
  const titleDesc = "w-max border-b-3 mb-3 border-blue-semi font-semibold";
  console.log(props);
  return (
    <div className="py-6 px-8 bg-white max-h-150 overflow-y-scroll scrollbar-hide rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-semi">{props?.model}</h1>
        <button onClick={close}>
          <X size={25} className="ml-auto" />
        </button>
      </div>
      <div>
        <p className="text-text-gray text-sm font-medium my-2">
          {props.tagline}
        </p>
        <Swiper
          slidesPerView={"auto"}
          pagination={true}
          spaceBetween={20}
          loop={true}
          modules={[Autoplay, Pagination]}
          className="swiper"
          autoplay={{
            delay: 2000,
          }}
        >
          {props &&
            props?.gambar.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    src={item}
                    width={1280}
                    height={1280}
                    alt=""
                    className="rounded-lg object-cover"
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className="flex flex-col gap-4 mt-4">
          {/* Spesifikasi */}
          <div>
            <h1 className={titleDesc}>Spesifikasi</h1>
            <div className="flex flex-col gap-2">
              <TextDetail
                title="Transmisi"
                desc={props?.spesifikasi.transmisi}
              />
              <TextDetail title="Dimensi" desc={props?.spesifikasi.dimensi} />
              <TextDetail
                title="Fitur Utama"
                desc={props?.spesifikasi.fitur_utama}
              />
              <TextDetail
                title="Keselamatan"
                desc={props?.spesifikasi.keselamatan}
              />
              <TextDetail title="Lainnya" desc={props?.lainnya} />
            </div>
          </div>
          {/* Spesifikasi */}
          {/* Warna */}
          <div>
            <h1 className={titleDesc}>Warna</h1>
            {props &&
              props?.warna_tersedia.map((item, index) => {
                return (
                  <h1 key={index} className="font-medium">
                    {item}
                  </h1>
                );
              })}
          </div>
          {/* Warna */}
          {/* Mesin */}
          <div>
            <h1 className={titleDesc}>Mesin</h1>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {props &&
                props?.spesifikasi.mesin.map((item, index) => {
                  return (
                    <div
                      className="flex flex-col gap-2 bg-gray-100 p-4 rounded-xl"
                      key={index}
                    >
                      <h1 className="text-2xl font-semibold">{item.tipe}</h1>
                      <TextDetail
                        wrap
                        title="Kapasitas"
                        desc={item.kapasitas}
                      />
                      <TextDetail wrap title="Torsi" desc={item.torsi} />
                      <TextDetail wrap title="Tenaga" desc={item.tenaga} />
                    </div>
                  );
                })}
            </div>
          </div>
          {/* Mesin */}
          {/* Varian */}
          <div className="bg-gray-100 p-4 rounded-xl font-semibold mt-4">
            <h1 className="text-lg mb-4">Varian & Estimasi Harga</h1>
            <div className="flex flex-col gap-1">
              {props &&
                props?.varian.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center">
                        <p>{item.nama}</p>
                        <p>{item.harga}</p>
                      </div>
                      <div className="my-2 w-full border-b-2 border-gray-300"></div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* Varian */}
        </div>
      </div>
      <button
        className="bg-blue-semi border-2 border-blue-semi w-full py-2 text-sm font-semibold text-white rounded-md flex gap-1 items-center justify-center mt-12"
        onClick={offersClick}
      >
        Dapatkan Penawaran
      </button>
    </div>
  );
};

export default CardDetailCard;
