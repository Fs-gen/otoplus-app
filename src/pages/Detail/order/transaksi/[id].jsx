import { ButtonLink } from "@/components/Button";
import CardOrder from "@/components/Card/CardOrder";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import { getDetailTransaksi, postBatalTransaksi } from "@/pages/api/api";
import Image from "next/image";
import { useEffect, useState } from "react";

// const Id = ({ id }) => {

//   return <h1>Hello World</h1>;
// };

const Transfer = ({ props }) => {
  const textGray = "text-xs";
  const harga = parseInt(props?.harga) || parseInt(props?.jumlah);
  const hasil = harga + parseInt(props?.kode_unik);
  return (
    <div className="shadow-lg shadow-gray-200 rounded-lg mb-8">
      <h1 className="text-sm font-medium mb-2.5">Silahkan Transfer Ke</h1>
      <div className="py-5 px-2.5">
        <div className="flex gap-1.5 mb-3.5">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLS8vCZ_lodKBB4_C6joK1BKotERMS27GPUg&s"
            width={50}
            height={50}
            alt=""
            className="bg-gray-light p-1 rounded-sm w-max"
          />
          <div>
            <h1 className={textGray}>Bank Rakyat Indonesia</h1>
            <p className={textGray}>PT OTOPLUSID</p>
          </div>
        </div>
        <FormLine readOnly value="12345123189309173" white />
        <h1 className="text-xs mt-4.5 mb-2.5">Jumlah Transfer</h1>
        <FormLine
          readOnly
          value={`Rp ${new Intl.NumberFormat("de-DE").format(hasil)}`}
          white
        />
        <p className="text-[8px] mt-1 ml-2">
          Pastikan jumlahnya sama dengan 3 digit terakhir
        </p>
      </div>
    </div>
  );
};

const Id = ({ id }) => {
  const [pending, isPending] = useState(true);
  const [success, setSuccess] = useState(false);
  const [dataid, setDataId] = useState(id);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getDetailTransaksi(dataid);
    setData(res);
  };

  console.log(data);

  const batalTransaksi = async (e) => {
    e.preventDefault();
    await postBatalTransaksi();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section>
      <HeaderBack text="Detail Transaksi" />
      <div className="section-box">
        {pending == true ? <Transfer props={data} /> : null}
        <h1 className="my-3 text-sm font-medium">Detail Transaksi</h1>
        <CardOrder props={data} status={data?.status} colorStatus={"text-red-semi"}/>
        {/* <CardOrder
          color={
            pending == true
              ? "text-yellow-semi"
              : pending == false && success == false
              ? "text-blue-semi"
              : "text-green-semi"
          }
          status={
            pending == true
              ? "Pending"
              : pending == false && success == false
              ? "Menunggu Konfirmasi"
              : "Sukses"
          }
        /> */}
        {pending == true ? (
          <div className="text-xs text-center mt-10 mb-24">
            <h1 className="font-medium">Transfer Sebelum</h1>
            <h1 className="font-semibold mb-3.75">{data.batas_akhir} WITA</h1>
            <button
              onClick={batalTransaksi}
              className="text-red-semi text-xs font-bold"
            >
              Batalkan Transaksi
            </button>
          </div>
        ) : null}
        <div className="text-center">
          {pending == true ? (
            <ButtonLink text="Upload Bukti Transfer" href={"/"} />
          ) : pending == false && success == false ? null : (
            <div className="mt-12">
              <ButtonLink href={"/"} text="Lihat Virtual ID Card" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Id;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
