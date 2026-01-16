import { useEffect, useState } from "react";
import { getDetailInputJual } from "../api/api";
import HeaderBack from "@/components/Header/HeaderBack";
import { Clock } from "lucide-react";
import Image from "next/image";

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

  console.log(data);
  console.log(id);

  const fetchData = async () => {
    const res = await getDetailInputJual(16);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Detail Penjualan" />
      <div className="section-box">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-center mt-2 mb-8">
            <Clock
              size={75}
              color="white"
              className="p-2 rounded-full bg-yellow-semi mx-auto"
            />
            <h1 className="font-semibold mt-4 capitalize">{data.status}</h1>
            <p className="text-text-gray text-sm">{data.created_at}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div id="identitas">
              <div className="p-4 shadow-lg rounded-md">Data Identitas</div>
              <div
                className={`${
                  !showIdentitas ? "flex" : "hidden"
                } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
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
              <div className="p-4 shadow-lg rounded-md">Data Pekerjaan</div>
              <div
                className={`${
                  !showIdentitas ? "flex" : "hidden"
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
              <div className="p-4 shadow-lg rounded-md">Data Kendaraan</div>
              <div
                className={`${
                  !showIdentitas ? "flex" : "hidden"
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
                  <CardDetail title="Harga OTP" text={data.harga_otr || "-"} />
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
              <div className="p-4 shadow-lg rounded-md">Metode Pembayaran</div>
              <div
                className={`${
                  !showIdentitas ? "flex" : "hidden"
                } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
              >
                <CardDetail
                  title="Metode Pembayaran"
                  text={data.jenis_pembayaran || "-"}
                />
              </div>
            </div>
            <div id="asuransi">
              <div className="p-4 shadow-lg rounded-md">Data Asuransi</div>
              <div
                className={`${
                  !showIdentitas ? "flex" : "hidden"
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
              <div className="p-4 shadow-lg rounded-md">Data STNK & BPKB</div>
              <div
                className={`${
                  !showIdentitas ? "flex" : "hidden"
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
              <div className="p-4 shadow-lg rounded-md">Dokumen Pendukung</div>
              <div
                className={`${
                  !showIdentitas ? "flex" : "hidden"
                } p-4 flex-col gap-4 bg-white mt-2 border-2 border-gray-200`}
              >
                <CardDetail title="Dokumen KTP" text={data.dok_ktp || "-"} />
                <CardDetail title="Dokumen KK" image={data.dok_kk} />
                <CardDetail title="Dokumen NPWP" text={data.dok_npwp || "-"} />
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
