import { useEffect, useState } from "react";
import { getDetailInputJual } from "../api/api";
import HeaderBack from "@/components/Header/HeaderBack";
import { Clock } from "lucide-react";
import Image from "next/image";
import ButtonInput from "./ButtonInput";
import { User } from "lucide-react";
import { BoxIconStyle } from "@/styles/style";
import { Briefcase } from "lucide-react";
import { Car } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Shield } from "lucide-react";
import { FileText } from "lucide-react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";
import { Check } from "lucide-react";

const CardDetail = ({ image, text, title }) => {
  return (
    <div>
      <h1 className="font-semibold text-text-gray">{title}</h1>
      {image ? (
        <Image
          src={image}
          width={1000}
          height={100}
          className="h-auto"
          alt=""
        />
      ) : (
        <p className="text-sm font-medium text-blue-dark">{text}</p>
      )}
    </div>
  );
};

const DetailInputJual = ({ id }) => {
  const [data, setData] = useState([]);
  const [showIdentitas, setShowIdentitas] = useState(false);
  const [showPekerjaan, setShowPekerjaan] = useState(false);
  const [showKendaraan, setShowKendaraan] = useState(false);
  const [showPembayaran, setShowPembayaran] = useState(false);
  const [showAsuransi, setShowAsuransi] = useState(false);
  const [showSTNK, setShowSTNK] = useState(false);
  const [showDokumen, setShowDokumne] = useState(false);
  const BoxIcon = "p-2 rounded-full mx-auto";

  const fetchData = async () => {
    const res = await getDetailInputJual(id);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Detail Penjualan" />
      <div className="section-box bg-gray-100">
        {data && data.length == 0 ? (
          <div className="min-h-dvh flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-center mt-2 mb-8">
              {data && data?.status == "pending" ? (
                <Clock
                  size={75}
                  color="white"
                  className={`bg-yellow-semi ${BoxIcon}`}
                />
              ) : data && data?.status == "rejected" ? (
                <X
                  size={75}
                  color="white"
                  className={`bg-red-semi ${BoxIcon}`}
                />
              ) : (
                <Check
                  size={75}
                  color="white"
                  className={`bg-green-semi ${BoxIcon}`}
                />
              )}
              <h1 className="font-semibold mt-4 capitalize">{data.status}</h1>
              <p className="text-text-gray text-sm">{data.created_at}</p>
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
                    click={() => setShowDokumne(!showDokumen)}
                  />
                </div>
                <div
                  className={`${
                    showDokumen ? "flex" : "hidden"
                  } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
                >
                  <CardDetail title="Dokumen KTP" text={data.dok_ktp || "-"} />
                  <CardDetail title="Dokumen KK" image={data.dok_kk} />
                  <CardDetail
                    title="Dokumen NPWP"
                    text={data.dok_npwp || "-"}
                  />
                  <CardDetail
                    title="Dokumen Slip Gaji"
                    text={data.dok_slip_gaji || "-"}
                  />
                  <CardDetail
                    title="Dokumen Surat Kerja"
                    text={data.dok_surat_kerja || "-"}
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
