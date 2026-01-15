import CardOrder from "@/components/Card/CardOrder";
import HeaderBack from "@/components/Header/HeaderBack";
import { ButtonForm, ButtonLink } from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getRekCompany, mainURL } from "@/pages/api/api";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import NotificationBar from "@/components/NotificationBar";
import { LoadingPadding } from "@/styles/style";

const OrderMetode = () => {
  const [dataBank, setDataBank] = useState([]);
  const [produk, setProduk] = useState([]);
  const [selectBank, setSelectBank] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();

  const fetchData = async () => {
    const res = await getRekCompany();
    setDataBank(res);
  };

  const removeCookies = (e) => {
    e.preventDefault();
    Cookies.remove("nama");
    Cookies.remove("id");
    Cookies.remove("harga");
    router.replace("/Detail/produk");
  };

  const fetchProduk = () => {
    const data = {
      nama: Cookies.get("nama"),
      id_produk: Cookies.get("id"),
      harga: Cookies.get("harga"),
    };
    setProduk(data);
  };

  const postTransaksi = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = JSON.stringify({
      id_produk: produk.id_produk,
      id_bank: selectBank,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("produk/transaksi-produk"),
      headers: {
        "Content-Type": "application-json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        setShowNotif(true);
        setSuccess(true);
        setText(`${response?.data?.data?.message}. Mengalihkan Otomatis`);
        setTimeout(() => {
          router.replace(
            `/Detail/order/transaksi/${response?.data?.data?.data?.kode_aktivasi}`
          );
        }, 3000);
      })
      .catch((e) => {
        return null;
      });
    return setLoading(false);
  };

  useEffect(() => {
    fetchProduk();
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Order Detail" click={removeCookies} />
      <NotificationBar showNotif={showNotif} text={text} success={success} />
      <div className="section-box">
        <CardOrder props={produk} />
        <h1 className="text-sm font-semibold mt-7.5 mb-3.75">
          Metode Pembayaran
        </h1>
        <form
          className="flex flex-col gap-3.75"
          onChange={(e) => setSelectBank(e.target.value)}
        >
          {dataBank.map((item, index) => {
            return (
              <label
                className="flex justify-between items-center p-2.5 shadow-lg shadow-gray-200 rounded-sm cursor-pointer"
                key={index}
                htmlFor={item.nama_bank}
              >
                <div className="flex items-center gap-5">
                  <Image
                    src={item.logo}
                    width={75}
                    height={75}
                    alt={item.nama_bank}
                    priority
                    className="h-auto"
                  />
                  <h1 htmlFor={item.nama_bank} className="text-sm font-medium">
                    {item.nama_bank}
                  </h1>
                </div>
                <input
                  type="radio"
                  id={item.nama_bank}
                  value={item.id_bank}
                  name="bank"
                  onChange={(e) => setSelectBank(e.target.value)}
                  className="checked:bg-red-500 indeterminate:bg-red-700"
                />
              </label>
            );
          })}
          <div className="mt-12.5"></div>
          <ButtonForm
            click={postTransaksi}
            text="Proses Transaksi"
            loading={loading}
            disabled={success}
            padding={loading ? LoadingPadding : null}
          />
        </form>
      </div>
    </section>
  );
};

export default OrderMetode;
