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
import { mainURL } from "../api/api";
import Cookies from "js-cookie";
import axios from "axios";

const InputJual = () => {
  const [perluasanAsuransi, setPerluasanAsuransi] = useState([]);
  const [form, setForm] = useState({
    nama_lengkap: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat_ktp: "",
    alamat_domisili: "",
    no_hp: "",
    email: "",
    status_perkawinan: "",
    jenis_pekerjaan: "",
    nama_perusahaan: "",
    jabatan: "",
    lama_bekerja: "",
    alamat_kantor: "",
    telp_kantor: "",
    penghasilan_bulanan: "",
    metode_pembayaran: "",
    perluasan_asuransi: "",
    // stnk
    tipe_pemilik: "",
    alamat_stnk: "",
    npwp: "",
    nama_faktur: "",
  });
  const [showIdentitas, setShowIdentitas] = useState(false);
  const [showPekerjaan, setShowPekerjaan] = useState(false);
  const [showKendaraan, setShowKendaraan] = useState(false);
  const [showPembayaran, setShowPembayaran] = useState(false);
  const [showSTNK, setShowSTNK] = useState(false);
  const [invalidIdentitas, setInvalidIdentitas] = useState(false);
  const [invalidPekerjaan, setInvalidPekerjaan] = useState(false);
  const [invalidKendaraan, setInvalidKendaraan] = useState(false);
  const [invalidPembayaran, setInvalidPembayaran] = useState(false);
  const [invalidSTNK, setInvalidSTNK] = useState(false);
  const [perluasan, setPerluasan] = useState("");
  const token = Cookies.get("token");

  const handlerForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // const checker = () => {
  //   if (
  //     form.nama_lengkap ||
  //     form.nik ||
  //     form.tempat_lahir ||
  //     form.tanggal_lahir ||
  //     form.alamat_ktp ||
  //     form.no_hp ||
  //     form.email ||
  //     form.status_perkawinan == ""
  //   ) {
  //     setShowIdentitas(true);
  //   } else if (form.jenis_pekerjaan == "") {
  //     setShowPekerjaan(true);
  //   }
  // };


  const handlerPerluasanAsuransi = async (e) => {
  const { value } = e.target;

  //set isChecked state
  let isChecked = e.target.checked;

  //update perluasanAsuransi state
  let updatedPerluasan;
  if (isChecked) {
    updatedPerluasan = [...perluasanAsuransi, value];
    setPerluasanAsuransi(updatedPerluasan);
  } else {
    updatedPerluasan = perluasanAsuransi.filter((item) => item !== value);
    setPerluasanAsuransi(updatedPerluasan);
  }

  // array to string 
  let data = updatedPerluasan.join(";");
  setForm({
    ...form,
    ["perluasan_asuransi"]: data,
  });
  }

  const postUploadForm = async (e) => {
    e.preventDefault();
    if (
      form.nama_lengkap ||
      form.nik ||
      form.tempat_lahir ||
      form.tanggal_lahir ||
      form.alamat_ktp ||
      form.no_hp ||
      form.email ||
      form.status_perkawinan == ""
    ) {
      setInvalidIdentitas(true);
      setShowIdentitas(true);
    } else if (form.jenis_pekerjaan == "") {
      setInvalidPekerjaan(true);
      setShowPekerjaan(true);
    } else if (form.tipe_mobil) {
      setShowKendaraan(true);
      setInvalidKendaraan(true);
    } else if (form.metode_pembayaran == "") {
      setShowPembayaran(true);
      setInvalidPembayaran(true);
    } else if (form.tipe_pemilik) {
      setShowSTNK(true);
      setInvalidSTNK(true);
    } else {
      let data = JSON.stringify(form);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: mainURL("penjualan/create"),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: data,
      };

      await axios
        .request(config)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

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
            click={() => setShowIdentitas(!showIdentitas)}
            show={showIdentitas}
            change={handlerForm}
            invalid={invalidIdentitas}
            nama_lengkap={form.nama_lengkap}
            nik={form.nik}
            tempat_lahir={form.tempat_lahir}
            tanggal_lahir={form.tanggal_lahir}
            alamat_ktp={form.alamat_ktp}
            alamat_domisili={form.alamat_domisili}
            no_hp={form.no_hp}
            email={form.email}
            status_perkawinan={form.status_perkawinan}
          />
          <DataPekerjaan
            click={() => setShowPekerjaan(!showPekerjaan)}
            show={showPekerjaan}
            change={handlerForm}
            invalid={invalidPekerjaan}
            jenis_pekerjaan={form.jenis_pekerjaan}
            nama_perusahaan={form.nama_perusahaan}
            jabatan={form.jabatan}
            lama_bekerja={form.lama_bekerja}
            alamat_kantor={form.alamat_kantor}
            telp_kantor={form.telp_kantor}
            penghasilan_bulanan={form.penghasilan_bulanan}
          />
          <DataKendaraan
            click={() => setShowKendaraan(!showKendaraan)}
            show={showKendaraan}
            change={handlerForm}
            invalid={invalidKendaraan}
            merek_mobil={form.merek_mobil}
            varian={form.varian}
            warna={form.warna}
            tahun_produksi={form.tahun_produksi}
            harga_otr={form.harga_otr}
            nomor_rangka={form.nomor_rangka}
            nomor_mesin={form.nomor_mesin}
            aksesoris_tambahan={form.aksesoris_tambahan}
          />
          <DataPembayaran
            show={showPembayaran}
            click={() => setShowPembayaran(!showPembayaran)}
            change={handlerForm}
            invalid={invalidPembayaran}
            metode_pembayaran={form.metode_pembayaran}
          />
          <DataAsuransi
            change={handlerPerluasanAsuransi}
            banjir={perluasanAsuransi.includes("Banjir")}
            huruhara={perluasanAsuransi.includes("Huru-Hara")}
            gempabumi={perluasanAsuransi.includes("Gempa Bumi")}
          />
          <DataSTNK
            click={() => setShowSTNK(!showSTNK)}
            change={handlerForm}
            show={showSTNK}
            invalid={invalidSTNK}
          />
          <DataDokumen />
          <div className="mt-10"></div>
          <ButtonForm
            type="submit"
            text="Kirim Formulir"
            click={postUploadForm}
          />
        </form>
      </div>
    </section>
  );
};

export default InputJual;
