import Success from "@/assets/images/animation/Success.lottie";
import Failed from "@/assets/images/animation/Failed.lottie";
import Waiting from "@/assets/images/animation/Waiting.lottie";
import { useEffect, useState } from "react";
import { getDetailInputJual, getRekCompany, mainURL } from "../api/api";
import HeaderBack from "@/components/Header/HeaderBack";
import Cookies from "js-cookie";
import Image from "next/image";
import ButtonInput from "./ButtonInput";
import { User } from "lucide-react";
import { BoxIconStyle, LoadingPadding } from "@/styles/style";
import { Briefcase } from "lucide-react";
import { Car } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Shield } from "lucide-react";
import { FileText } from "lucide-react";
import { Upload } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import InputFile from "@/components/InputFile";
import FileResizer from "react-image-file-resizer";
import { ButtonForm } from "@/components/Button";
import axios from "axios";
import NotificationBar from "@/components/NotificationBar";
import { ClipboardText } from "@/utils/utils";
import { Copy } from "lucide-react";

const MessageImage = ({ src, title }) => {
  return (
    <div>
      <h1 className="mb-2">Dokumen {title} Telah Dimasukkan</h1>
      <Image src={src} width={100} height={100} alt="" className="w-auto" />
    </div>
  );
};

const CardDetail = ({ image, text, title }) => {
  return (
    <div>
      <h1 className="font-semibold text-blue-dark">{title}</h1>
      {image ? (
        <Image
          src={image}
          width={1000}
          height={100}
          className="h-auto"
          alt=""
        />
      ) : image == "" ? (
        <p className="text-sm font-medium text-text-gray text-center mt-2">
          Tidak ada file yang diupload
        </p>
      ) : (
        <p className="text-sm font-medium text-text-gray">{text}</p>
      )}
    </div>
  );
};

const CardStatus = ({ icon, text }) => {
  return (
    <div className="flex justify-center items-center flex-1">
      {icon}
      <p className="text-text-gray text-sm text-nowrap">{text}</p>
    </div>
  );
};

const DetailInputJual = ({ id }) => {
  const [data, setData] = useState([]);
  const [dataBank, setDataBank] = useState([]);
  const [showCash, setShowCash] = useState(false);
  const [dokType, setDokType] = useState("");
  const [fileDP, setFileDP] = useState("");
  const [fileCash, setFileCash] = useState("");
  const [showIdentitas, setShowIdentitas] = useState(false);
  const [showPekerjaan, setShowPekerjaan] = useState(false);
  const [showKendaraan, setShowKendaraan] = useState(false);
  const [showPembayaran, setShowPembayaran] = useState(false);
  const [showAsuransi, setShowAsuransi] = useState(false);
  const [showSTNK, setShowSTNK] = useState(false);
  const [showDokumen, setShowDokumen] = useState(false);
  const [showBukti, setShowBukti] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");
  const token = Cookies.get("token");
  const idPenjualan = data?.id;

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

  const fetchData = async () => {
    const res = await getDetailInputJual(id);
    const resBank = await getRekCompany();
    setData(res);
    setDataBank(resBank);
  };

  const ImageResizer = (file) =>
    new Promise((resolve) => {
      (FileResizer.imageFileResizer(file, 1000, 1000, "JPEG", 90, 0, (uri) => {
        resolve(uri);
      }),
        "base64");
    });

  const handlerImageDP = async (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const result = await ImageResizer(file);
    setFileCash("");
    setDokType("bukti_dp");
    setFileDP(result);
    reader.readAsDataURL(file);
  };

  const handlerImageCash = async (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const result = await ImageResizer(file);
    setFileDP("");
    setDokType("bukti_pelunasan");
    setFileCash(result);
    reader.readAsDataURL(file);
  };

  const postPelunasan = async (e) => {
    setLoading(true);
    e.preventDefault;
    const data = new FormData();
    data.append("dok_type", dokType);
    data.append("id_penjualan", idPenjualan);
    data.append("file", fileDP || fileCash);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("penjualan/upload_bukti_pembayaran"),
      headers: {
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    if (fileDP == "" && fileCash == "") {
      TopMessage("Harap Kirim Salah Satu Pelunasan");
    } else {
      await axios
        .request(config)
        .then(() => {
          TopMessage("Berhasil Kirim Bukti Pelunasan!", setSuccess(true));
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch(() => {
          TopMessage("Oops, sepertinya terjadi kesalahan!", setSuccess(false));
        });
    }
    setLoading(false);
  };

  console.log(data)

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <NotificationBar showNotif={showNotif} text={text} success={success} />
      <HeaderBack text="Detail Penjualan" />
      <div className="section-box bg-gray-100">
        {data && data.length == 0 ? (
          <div className="min-h-dvh flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-center mt-2 mb-4">
              {data && data?.status == "pending" ? (
                <DotLottieReact
                  src={Waiting}
                  loop
                  autoplay
                  className="w-2/3 mx-auto"
                />
              ) : data && data?.status == "rejected" ? (
                <DotLottieReact
                  src={Failed}
                  autoplay
                  className="w-1/2 mx-auto mb-2"
                />
              ) : (
                <DotLottieReact
                  src={Success}
                  autoplay
                  className="w-2/3 mx-auto"
                />
              )}
              <h1 className="font-semibold capitalize">{data.status}</h1>
              <p className="text-text-gray text-sm">{data.created_at}</p>
              <div className="mt-4">
                {data &&
                data.bukti_dp == "" &&
                data &&
                data.bukti_pelunasan == "" ? (
                  <CardStatus
                    icon={
                      <DotLottieReact src={Failed} autoplay className="w-1/8" />
                    }
                    text="Belum Pelunasan"
                  />
                ) : (
                  <div className="flex justify-center items-center gap-4">
                    {data.jenis_pembayaran != "Cash" ? (
                      <CardStatus
                        icon={
                          <DotLottieReact
                            src={data.bukti_dp != "" ? Success : Failed}
                            className={data.bukti_dp != "" ? "w-25" : " w-20"}
                            autoplay
                          />
                        }
                        text="Bukti DP"
                      />
                    ) : null}
                    <CardStatus
                      icon={
                        <DotLottieReact
                          src={data.bukti_pelunasan != "" ? Success : Failed}
                          className={
                            data.bukti_pelunasan != "" ? "w-25" : " w-20"
                          }
                          autoplay
                        />
                      }
                      text="Bukti Pelunasan"
                    />
                  </div>
                )}
              </div>
              <div
                id="dokumen"
                className={
                  data.bukti_dp == "" && data.bukti_pelunasan == ""
                    ? "hidden"
                    : ""
                }
              >
                <div className="shadow-box-primary">
                  <ButtonInput
                    icon={
                      <Upload
                        size={40}
                        color="white"
                        className={BoxIconStyle}
                      />
                    }
                    text="Data Bukti Pembayaran"
                    click={() => setShowBukti(!showBukti)}
                  />
                </div>
                <div
                  className={`${
                    showBukti ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
                >
                  <CardDetail title="Dokumen DP" image={data.bukti_dp} />
                  <CardDetail
                    title="Dokumen Pelunasan"
                    image={data.bukti_pelunasan}
                  />
                </div>
              </div>
              <div
                className={`${data.jenis_pembayaran == "Cash" && data.bukti_pelunasan != "" ? "hidden" : data.bukti_dp != "" && data.bukti_pelunasan != "" ? "hidden" : ""} my-4`}
              >
                <h1 className="text-left font-semibold text-sm">
                  Daftar Bank yang Tersedia
                  <div className="flex flex-col gap-4">
                    {dataBank.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className="flex justify-between items-center gap-2 bg-white shadow-md p-4 rounded-xl"
                          onClick={() =>
                            ClipboardText(
                              item.rekening,
                              TopMessage("Berhasil Menyalin", setSuccess(true)),
                            )
                          }
                        >
                          <div className="flex gap-2">
                            <Image
                              src={item.logo}
                              width={50}
                              height={50}
                              alt={item.nama_bank}
                            />
                            <div>
                              <h1 className="font-bold text-sm">
                                {item.nama_bank} | {item.atas_nama}
                              </h1>
                              <p className="w-max">{item.rekening}</p>
                            </div>
                          </div>
                          <Copy size={25} strokeWidth={2} />
                        </button>
                      );
                    })}
                  </div>
                </h1>
              </div>
              <div
                className={
                  data.jenis_pembayaran == "Cash" && data.bukti_pelunasan != ""
                    ? "hidden"
                    : data.bukti_dp != "" && data.bukti_pelunasan != ""
                      ? "hidden"
                      : ""
                }
              >
                <div
                  className={`text-sm font-semibold flex justify-between rounded-full bg-gray-200 relative`}
                >
                  <button
                    className={`${!showCash || data.bukti_pelunasan != "" ? "text-white bg-blue-semi" : "text-black"} py-2 rounded-full flex-1 z-10 ${data.bukti_dp != "" || data.jenis_pembayaran == "Cash" ? "hidden" : ""}`}
                    onClick={() => setShowCash(false)}
                  >
                    Bukti DP
                  </button>
                  <button
                    className={`${showCash || data.bukti_dp != "" || data.jenis_pembayaran == "Cash" ? "text-white bg-blue-semi" : "text-black"} ${data.bukti_pelunasan != "" ? "hidden" : ""} py-2 flex-1 z-10 rounded-full`}
                    onClick={() =>
                      data.bukti_dp == "" ? setShowCash(true) : null
                    }
                  >
                    Bukti Pelunasan
                  </button>
                </div>
                <div className="flex justify-center my-4">
                  {!showCash &&
                  data.bukti_dp == "" &&
                  data.jenis_pembayaran != "Cash" ? (
                    <InputFile
                      component={
                        fileDP == "" && data.bukti_dp == "" ? (
                          "Silahkan Masukkan File Bukti DP"
                        ) : (
                          <MessageImage src={fileDP} />
                        )
                      }
                      id="bukti_dp"
                      change={handlerImageDP}
                    />
                  ) : (
                    <InputFile
                      component={
                        fileCash == "" && data.bukti_pelunasan == "" ? (
                          "Silahkan Masukkan File Bukti Pelunasan"
                        ) : (
                          <MessageImage src={fileCash} />
                        )
                      }
                      id="bukti_pelunasan"
                      change={handlerImageCash}
                    />
                  )}
                </div>
                <ButtonForm
                  click={postPelunasan}
                  style={loading ? LoadingPadding : null}
                  loading={loading}
                  text="Kirim Bukti Pembayaran"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div id="identitas">
                <div className="shadow-box-primary">
                  <ButtonInput
                    icon={
                      <User size={40} color="white" className={BoxIconStyle} />
                    }
                    text="Data Identitas"
                    click={() => setShowIdentitas(!showIdentitas)}
                  />
                </div>
                <div
                  className={`${
                    showIdentitas ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200 rounded-xl`}
                >
                  <CardDetail title="Nama Lengkap" text={data.nama_lengkap} />
                  <CardDetail title="NIK" text={data.nik} />
                  <div className="flex justify-between">
                    <CardDetail
                      title="Tempat Lahir"
                      text={data.tempat_lahir || "-"}
                    />
                    <CardDetail
                      title="Tanggal Lahir"
                      text={data.tanggal_lahir || "-"}
                    />
                  </div>
                  <CardDetail
                    title="Alamat Lengkap"
                    text={data.alamat_ktp || "-"}
                  />
                  <CardDetail
                    title="Alamat Domisili"
                    text={data.alamat_domisili || "-"}
                  />
                  <CardDetail title="Nomor Aktif" text={data.no_hp || "-"} />
                  <CardDetail title="Email" text={data.email || "-"} />
                  <CardDetail
                    title="Status Perkawinan"
                    text={data.statu_perkawinan || "-"}
                  />
                </div>
              </div>
              <div id="pekerjaan">
                <div className="shadow-box-primary">
                  <ButtonInput
                    icon={
                      <Briefcase
                        size={40}
                        color="white"
                        className={BoxIconStyle}
                      />
                    }
                    text="Data Pekerjaan"
                    click={() => setShowPekerjaan(!showPekerjaan)}
                  />
                </div>
                <div
                  className={`${
                    showPekerjaan ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
                >
                  <CardDetail
                    title="Jenis Pekerjaan"
                    text={data.jenis_pekerjaan || "-"}
                  />
                  <CardDetail
                    title="Nama Perusahaan"
                    text={data.nama_perusahaan || "-"}
                  />
                  <div className="flex justify-between">
                    <CardDetail title="Jabatan" text={data.jabatan || "-"} />
                    <CardDetail
                      title="Lama Kerja"
                      text={data.lama_kerja || "-"}
                    />
                  </div>
                  <CardDetail
                    title="Alamat Kantor"
                    text={data.alamat_kantor || "-"}
                  />
                  <CardDetail
                    title="Nomor Telepn Kantor"
                    text={data.telp_kantor || "-"}
                  />
                  <CardDetail
                    title="Penghasilan per Bulan"
                    text={data.penghasilan_bulanan || "-"}
                  />
                </div>
              </div>
              <div id="kendaraan">
                <div className="shadow-box-primary">
                  <ButtonInput
                    icon={
                      <Car size={40} color="white" className={BoxIconStyle} />
                    }
                    text="Data Kendaraan"
                    click={() => setShowKendaraan(!showKendaraan)}
                  />
                </div>
                <div
                  className={`${
                    showKendaraan ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
                >
                  <CardDetail
                    title="Merek & Tipe Mobil"
                    text={data.merek_tipe_mobil || "-"}
                  />
                  <div className="flex justify-between">
                    <CardDetail title="Varian" text={data.varian || "-"} />
                    <CardDetail title="Warna" text={data.warna || "-"} />
                  </div>
                  <div className="flex justify-between">
                    <CardDetail
                      title="Tahun Produksi"
                      text={data.tahun_produksi || "-"}
                    />
                    <CardDetail
                      title="Harga OTP"
                      text={data.harga_otr || "-"}
                    />
                  </div>
                  <div>
                    <CardDetail
                      title="Nomor Rangka"
                      text={data.nomor_rangka || "-"}
                    />
                    <CardDetail
                      title="Nomor Mesin"
                      text={data.nomor_mesin || "-"}
                    />
                  </div>
                  <CardDetail
                    title="Aksesoris Tambahan"
                    text={data.aksesoris_tambahan || "-"}
                  />
                </div>
              </div>
              <div id="metode">
                <div className="shadow-box-primary">
                  <ButtonInput
                    icon={
                      <CreditCard
                        size={40}
                        color="white"
                        className={BoxIconStyle}
                      />
                    }
                    text="Metode Pembayaran"
                    click={() => setShowPembayaran(!showPembayaran)}
                  />
                </div>
                <div
                  className={`${
                    showPembayaran ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
                >
                  <CardDetail
                    title="Metode Pembayaran"
                    text={data.jenis_pembayaran || "-"}
                  />
                  <CardDetail title="Area" text={data.area || "-"} />
                </div>
              </div>
              <div id="asuransi">
                <div className="shadow-box-primary">
                  <ButtonInput
                    icon={
                      <Shield
                        size={40}
                        color="white"
                        className={BoxIconStyle}
                      />
                    }
                    text="Data Asuransi"
                    click={() => setShowAsuransi(!showAsuransi)}
                  />
                </div>
                <div
                  className={`${
                    showAsuransi ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
                >
                  <CardDetail
                    title="Jenis Asuransi"
                    text={data.jenis_asuransi || "-"}
                  />
                  <CardDetail
                    title="Periode Asuransi"
                    text={data.periode_asuransi || "-"}
                  />
                  <CardDetail
                    title="Perluasan Asuransi"
                    text={data.perluasan_asunrasi || "-"}
                  />
                </div>
              </div>
              <div id="stnk">
                <div className="shadow-box-primary">
                  <ButtonInput
                    icon={
                      <FileText
                        size={40}
                        color="white"
                        className={BoxIconStyle}
                      />
                    }
                    text="Data STNK & BPKB"
                    click={() => setShowSTNK(!showSTNK)}
                  />
                </div>
                <div
                  className={`${
                    showSTNK ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
                >
                  <CardDetail
                    title="Nama Pemilik"
                    text={data.nama_pemilik || "-"}
                  />
                  <CardDetail
                    title="Alamat STNK"
                    text={data.alamat_stnk || "-"}
                  />
                  <CardDetail title="NPWP" text={data.npwp || "-"} />
                  <CardDetail
                    title="Nama Pada Faktur Kendaraan"
                    text={data.nama_faktur || "-"}
                  />
                </div>
              </div>
              <div id="dokumen">
                <div className="shadow-box-primary">
                  <ButtonInput
                    icon={
                      <Upload
                        size={40}
                        color="white"
                        className={BoxIconStyle}
                      />
                    }
                    text="Data Dokumen"
                    click={() => setShowDokumen(!showDokumen)}
                  />
                </div>
                <div
                  className={`${
                    showDokumen ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
                >
                  <CardDetail title="Dokumen KTP" image={data.dok_ktp} />
                  <CardDetail title="Dokumen KK" image={data.dok_kk} />
                  <CardDetail title="Dokumen NPWP" image={data.dok_npwp} />
                  <CardDetail
                    title="Dokumen Slip Gaji"
                    image={data.dok_slip_gaji}
                  />
                  <CardDetail
                    title="Dokumen Surat Kerja"
                    image={data.dok_surat_kerja}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailInputJual;

export const getServerSideProps = (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
