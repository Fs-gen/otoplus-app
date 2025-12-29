import HeaderBack from "@/components/Header/HeaderBack";
import DataPembeli from "./data-pembeli";
import { useState } from "react";
import DataPekerjaan from "./data-pekerjaan";
import DataKendaraan from "./data-kendaraan";
import DataPembayaran from "./data-pembayaran";
import DataSTNK from "./data-stnk";
import DataAsuransi from "./data-asuransi";
import DataDokumen from "./data-dokument";
import { ButtonForm } from "@/components/Button";

const InputJual = () => {
  const [nama, setNama] = useState();
  const [NIK, setNIK] = useState();
  return (
    <section className="bg-gray-100 min-h-screen">
      <HeaderBack text="Input Penjualan" />
      <div className="p-4">
        <div className="p-4 bg-blue-semi rounded-lg text-white">
          <h1 className="font-semibold">Form Pembelian Mobil</h1>
          <p className="text-xs">
            Lengkapi data dengan benar untuk proses pembelian
          </p>
        </div>
        <form className="mt-6 flex flex-col gap-4">
          <DataPembeli
            changeNama={(e) => setNama(e.target.value)}
            changeNIK={(e) => setNIK(e.target.value)}
            nama={nama}
            nik={NIK}
          />
          <DataPekerjaan />
          <DataKendaraan />
          <DataPembayaran />
          <DataAsuransi />
          <DataSTNK />
          <DataDokumen />
          <div className="mt-10"></div>
          <ButtonForm text="Kirim Formulir" />
        </form>
      </div>
    </section>
  );
};

export default InputJual;
