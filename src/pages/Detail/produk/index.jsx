import { ButtonLink } from "@/components/Button";
import ArrowBack from "@/assets/images/icons/arrow/arrow-line-left-white.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import dataProduk from "@/pages/api/dummy.json";

const DetailProduk = () => {
  const router = useRouter();
  const datas = dataProduk.produk;
  return (
    <section>
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          <div className="relative">
            <button
              onClick={() => router.back()}
              className="absolute m-5 p-1.25 bg-gray-dark rounded-full"
            >
              <Image src={ArrowBack} width={25} height={25} alt="Back" />
            </button>
            <div className="h-90 bg-gray-light"></div>
          </div>
          <div className="section-box">
            <h2 className="font-semibold">Upgrade ke Agen Plus</h2>
            <h1 className="text-xl">Rp 500.000</h1>
            <p className="mt-7.5 font-medium text-xs">Deskripsi</p>
            <p className="text-xs my-3.75 font-light">Dapatkan Fasilitas:</p>
            <ul className="list-disc text-xs font-light">
              {datas.map((item, index) => {
                return item.facility.map((text) => {
                  return (
                    <li className="ml-7" key={index}>
                      {text}
                    </li>
                  );
                });
              })}
            </ul>
          </div>
        </div>
        <div className="section-box text-center">
          <ButtonLink href={`/Detail/order/order-bank`} text="Pesan Sekarang" />
        </div>
      </div>
    </section>
  );
};

export default DetailProduk;
