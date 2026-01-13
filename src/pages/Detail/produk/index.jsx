import { ButtonForm } from "@/components/Button";
import ArrowBack from "@/assets/images/icons/arrow/arrow-line-left-white.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProduk } from "@/pages/api/api";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";
import Cookies from "js-cookie";

const DetailProduk = () => {
  const [produk, setProduk] = useState([]);
  const [foto, setFoto] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const res = await getProduk();
    setProduk(res);
    res.map((item) => {
      setFoto(item.foto);
    });
  };

  const setCookies = (e) => {
    e.preventDefault();
    produk.map((item) => {
      Cookies.set("nama", item.nama);
      Cookies.set("harga", item.harga);
      Cookies.set("id", item.id_produk);
    });
    router.push("/Detail/order");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="relative">
      <button
        onClick={() => router.back()}
        className="absolute m-5 p-1.25 bg-gray-dark rounded-full z-10"
      >
        <Image
          src={ArrowBack}
          width={25}
          height={25}
          alt="Back"
          className="z-10"
          priority
        />
      </button>
      <div className="flex flex-col justify-between min-h-screen">
        {produk && produk.length == 0 ? (
          <div>
            <Skeleton
              count={1}
              height={360}
              width={500}
              highlightColor={highlightSkeleton}
            />
            <div className="section-box">
              <Skeleton
                count={10}
                height={15}
                highlightColor={highlightSkeleton}
              />
            </div>
          </div>
        ) : (
          <div>
            {produk.map((item, index) => {
              const desc = item?.deskripsi;
              return (
                <div key={index}>
                  {foto.map((item, index) => {
                    return (
                      <Image
                        src={item}
                        width={1024}
                        height={1024}
                        alt=""
                        key={index}
                        quality={100}
                        priority
                      />
                    );
                  })}
                  <div className="section-box">
                    <h1 className="font-semibold">{item?.nama}</h1>
                    <h1 className="text-xl mt-10 mb-7.5">
                      Rp. {new Intl.NumberFormat("de-DE").format(item?.harga)}
                    </h1>
                    <h2 className="text-sm font-medium mb-3.75">Deskripsi</h2>
                    <div dangerouslySetInnerHTML={{ __html: desc }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="section-box text-center">
          <ButtonForm click={setCookies} text="Pesan Sekarang" />
        </div>
      </div>
    </section>
  );
};

export default DetailProduk;
