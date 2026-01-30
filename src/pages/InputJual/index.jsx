import HeaderBack from "@/components/Header/HeaderBack";
import DataPembeli from "./data-pembeli";
import { useRef, useState } from "react";
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
import FileResizer from "react-image-file-resizer";
import { LoadingPadding } from "@/styles/style";
import NotificationBar from "@/components/NotificationBar";
import { useRouter } from "next/router";
import Image from "next/image";

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
    // jenis_pekerjaan: "",
    // nama_perusahaan: "",
    // jabatan: "",
    // lama_bekerja: "",
    // alamat_kantor: "",
    // telp_kantor: "",
    // penghasilan_bulanan: "",
    merek_tipe_mobil: "",
    varian: "",
    warna: "",
    tahun_produksi: "",
    harga_otr: "",
    nomor_rangka: "",
    nomor_mesin: "",
    aksesoris_tambahan: "",
    area: "",
    jenis_pembayaran: "",
    jenis_asuransi: "",
    periode_asuransi: "",
    nama_tertanggung: "",
    perluasan_asuransi: "",
    tipe_pemilik: "",
    alamat_stnk: "",
    npwp: "",
    nama_faktur: "",
    dok_ktp: null,
    dok_kk: null,
    dok_npwp: null,
    dok_slip_gaji: null,
    dok_surat_kerja: null,
  });
  const [showIdentitas, setShowIdentitas] = useState(false);
  const [showPekerjaan, setShowPekerjaan] = useState(false);
  const [showKendaraan, setShowKendaraan] = useState(false);
  const [showPembayaran, setShowPembayaran] = useState(false);
  const [showAsuransi, setShowAsuransi] = useState(false);
  const [showSTNK, setShowSTNK] = useState(false);
  const [showDokumen, setShowDokumen] = useState(false);
  const [invalidIdentitas, setInvalidIdentitas] = useState(false);
  const [invalidKendaraan, setInvalidKendaraan] = useState(false);
  const [invalidPembayaran, setInvalidPembayaran] = useState(false);
  const [invalidDokumen, setInvalidDokumen] = useState(false);

  const indetitasRef = useRef(null);
  const kendaraanRef = useRef(null);
  const pembayaranRef = useRef(null);
  const dokumenRef = useRef(null);

  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();

  const MessageImage = ({ src, title }) => {
    return (
      <div>
        <h1 className="mb-2">Dokumen {title} Telah Dimasukkan</h1>
        <Image src={src} width={100} height={100} alt="" className="w-auto" />
      </div>
    );
  };

  const TopMessage = (text, success) => {
    setShowNotif(true);
    setText(text);
    {
      success;
    }
    setTimeout(() => {
      setShowNotif(false);
    }, 3000);
  };

  const imageResizer = (file) =>
    new Promise((resolve) => {
      (FileResizer.imageFileResizer(file, 1000, 1000, "JPEG", 90, 0, (uri) => {
        resolve(uri);
      }),
        "base64");
    });

  const handlerImage = async (e) => {
    const reader = new FileReader();
    const { name } = e.target;
    const file = e.target.files[0];
    const result = await imageResizer(file);
    setForm({
      ...form,
      [name]: result,
    });
    reader.readAsDataURL(file);
  };

  const handlerForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

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
  };

  const postUploadForm = async (e) => {
    e.preventDefault();
    if (
      form.nama_lengkap.trim() == "" ||
      form.nik.trim() == "" ||
      form.no_hp.trim() == ""
    ) {
      indetitasRef.current.scrollIntoView({ behavior: "smooth" });
      setInvalidIdentitas(true);
      setShowIdentitas(true);
    } else if (form.merek_tipe_mobil.trim() == "") {
      kendaraanRef.current.scrollIntoView({ behavior: "smooth" });
      setInvalidKendaraan(true);
      setShowKendaraan(true);
    } else if (form.jenis_pembayaran == "") {
      pembayaranRef.current.scrollIntoView({ behavior: "smooth" });
      setShowPembayaran(true);
      setInvalidPembayaran(true);
    } else if (form.dok_kk == null) {
      dokumenRef.current.scrollIntoView({ behavior: "smooth" });
      setInvalidDokumen(true);
      setShowDokumen(true);
    } else {
      setLoading(true);
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
          if (response?.data?.status_code == "00") {
            TopMessage("Data anda telah berhasil di kirim!", setSuccess(true));
            setTimeout(() => {
              router.replace("/History/input-jual");
            }, 3000);
          } else {
            TopMessage(response?.data?.data?.message, setSuccess(false));
          }
        })
        .catch(() => {
          return null;
        });
    }
    return setLoading(false);
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      <NotificationBar showNotif={showNotif} text={text} success={success} />
      <HeaderBack text="Input Penjualan" />
      <div className="p-4">
        <div className="p-4 bg-blue-semi rounded-lg text-white">
          <h1 className="font-semibold">Form Pembelian Mobil</h1>
          <p className="text-xs">
            Lengkapi data dengan benar untuk proses pembelian
          </p>
        </div>
        <form className="mt-6 flex flex-col gap-4">
          <div ref={indetitasRef}>
            <DataPembeli
              click={() => {
                setShowIdentitas(!showIdentitas);
                setInvalidIdentitas(false);
              }}
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
          </div>
          {/* <div>
            <DataPekerjaan
              click={() => setShowPekerjaan(!showPekerjaan)}
              show={showPekerjaan}
              change={handlerForm}
              jenis_pekerjaan={form.jenis_pekerjaan}
              nama_perusahaan={form.nama_perusahaan}
              jabatan={form.jabatan}
              lama_bekerja={form.lama_bekerja}
              alamat_kantor={form.alamat_kantor}
              telp_kantor={form.telp_kantor}
              penghasilan_bulanan={form.penghasilan_bulanan}
            />
          </div> */}
          <div ref={kendaraanRef}>
            <DataKendaraan
              click={() => {
                setShowKendaraan(!showKendaraan);
                setInvalidKendaraan(false);
              }}
              show={showKendaraan}
              change={handlerForm}
              invalid={invalidKendaraan}
              merek_tipe_mobil={form.merek_tipe_mobil}
              varian={form.varian}
              warna={form.warna}
              tahun_produksi={form.tahun_produksi}
              harga_otr={form.harga_otr}
              nomor_rangka={form.nomor_rangka}
              nomor_mesin={form.nomor_mesin}
              aksesoris_tambahan={form.aksesoris_tambahan}
            />
          </div>
          <div ref={pembayaranRef}>
            <DataPembayaran
              show={showPembayaran}
              click={() => {
                setShowPembayaran(!showPembayaran);
                setInvalidPembayaran(false);
              }}
              change={handlerForm}
              invalid={invalidPembayaran}
              jenis_pembayaran={form.jenis_pembayaran}
              area={form.area}
            />
          </div>
          {/* <div>
            <DataAsuransi
              change={handlerPerluasanAsuransi}
              changeOption={handlerForm}
              click={() => setShowAsuransi(!showAsuransi)}
              show={showAsuransi}
              jenis_asuransi={form.jenis_asuransi}
              periode_asuransi={form.periode_asuransi}
              nama_tertanggung={form.nama_tertanggung}
              banjir={perluasanAsuransi.includes("Banjir")}
              huruhara={perluasanAsuransi.includes("Huru-Hara")}
              gempabumi={perluasanAsuransi.includes("Gempa Bumi")}
            />
          </div> */}
          <div>
            <DataSTNK
              click={() => setShowSTNK(!showSTNK)}
              change={handlerForm}
              show={showSTNK}
            />
          </div>
          <div ref={dokumenRef}>
            <DataDokumen
              change={handlerImage}
              show={showDokumen}
              click={() => {
                setShowDokumen(!showDokumen);
                setInvalidDokumen(false);
              }}
              invalid={invalidDokumen}
              ktp={
                form.dok_ktp == null ? (
                  "Silahkan Masukkan File Dokumen KTP disini (wajib)"
                ) : (
                  <MessageImage src={form.dok_ktp} title="KTP" />
                )
              }
              dok_ktp={form.dok_ktp}
              kk={
                form.dok_kk == null ? (
                  "Silahkan Masukkan File Dokumen KK disini (Wajib)"
                ) : (
                  <MessageImage src={form.dok_kk} title="KK" />
                )
              }
              dok_kk={form.dok_kk}
              npwp={
                form.dok_npwp == null ? (
                  "Silahkan Masukkan File Dokumen NPWP disini (Wajib)"
                ) : (
                  <MessageImage src={form.dok_npwp} title="NPWP" />
                )
              }
              dok_npwp={form.dok_npwp}
              slipGaji={
                form.dok_slip_gaji == null ? (
                  "Silahkan Masukkan File Dokumen Slip Gaji disini"
                ) : (
                  <MessageImage src={form.dok_slip_gaji} title="Slip Gaji" />
                )
              }
              dok_slip_gaji={form.dok_slip_gaji}
              suratKerja={
                form.dok_surat_kerja == null ? (
                  "Silahkan Masukkan File Dokumen Surat Kerja disini"
                ) : (
                  <MessageImage
                    src={form.dok_surat_kerja}
                    title="Surat Kerja"
                  />
                )
              }
              dok_surat_kerja={form.dok_surat_kerja}
            />
          </div>
          <div className="mt-10"></div>
          <ButtonForm
            text="Kirim Formulir"
            click={postUploadForm}
            loading={loading}
            padding={loading ? LoadingPadding : null}
          />
        </form>
      </div>
    </section>
  );
};

export default InputJual;
