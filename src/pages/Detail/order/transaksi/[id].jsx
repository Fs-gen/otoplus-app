import { ButtonForm, ButtonLink } from "@/components/Button";
import CardOrder from "@/components/Card/CardOrder";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import {
  getDetailTransaksi,
  mainURL,
  postBatalTransaksi,
} from "@/pages/api/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationBar from "@/components/NotificationBar";
import { useRouter } from "next/router";
import { highlightSkeleton, LoadingPadding } from "@/styles/style";
import Skeleton from "react-loading-skeleton";
import CardConfirm from "@/components/PopUp/CardConfirm";
import { X } from "lucide-react";
import { Copy } from "lucide-react";
import { ClipboardText } from "@/utils/utils";
const FormData = require("form-data");

const Transfer = ({ copyRek, copyJumlah, hasil, props }) => {
  const textGray = "text-xs";
  const rekening = props?.rekening;

  return (
    <div className="shadow-lg shadow-gray-200 rounded-lg mb-8">
      <h1 className="text-sm font-medium mb-2.5">Silahkan Transfer Ke</h1>
      <div className="py-5 px-2.5">
        <div className="flex gap-1.5 mb-3.5">
          <Image src={props?.logo_bank} width={65} height={65} alt="" />
          <div>
            <h1 className={textGray}>{props?.metode_bayar}</h1>
            <p className={textGray}>{props?.atas_nama}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-full">
            <FormLine readOnly value={rekening} white />
          </div>
          <button onClick={copyRek}>
            <Copy size={25} color="black" />
          </button>
        </div>
        <h1 className="text-xs mt-4.5 mb-2.5">Jumlah Transfer</h1>
        <div className="flex gap-4 items-center">
          <div className="w-full ">
            <FormLine readOnly value={`Rp ${hasil}`} white />
          </div>
          <button onClick={copyJumlah}>
            <Copy size={25} color="black" />
          </button>
        </div>
        <p className="text-[10px] font-medium mt-1 ml-2">
          Pastikan jumlahnya sama dengan 3 digit terakhir
        </p>
      </div>
    </div>
  );
};

const Id = ({ id }) => {
  const [dataid, setDataId] = useState(id);
  const [data, setData] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const harga = parseInt(data?.jumlah);
  const hasil = new Intl.NumberFormat("de-DE").format(
    harga + parseInt(data?.kode_unik),
  );
  // Batal Transaksi
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [image, setImage] = useState({
    file: null,
    previewURL: null,
  });
  const router = useRouter();

  console.log(data);

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

  // FecthData

  const fetchData = async () => {
    const res = await getDetailTransaksi(dataid);
    setData(res);
  };

  const batalTransaksi = async (e) => {
    e.preventDefault();
    setLoadingCancel(true);
    const res = await postBatalTransaksi(dataid);
    if (res.status_code == "00") {
      TopMessage(res?.data?.message, setSuccess(true));
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    } else {
      TopMessage("Oops! Sepertinya terjadi kesalahan!");
    }
    setConfirm(false);
    setLoadingCancel(false);
  };

  // FecthData

  // ConvetImage

  const resizeFile = (file) =>
    new Promise((resolve) => {
      (Resizer.imageFileResizer(file, 500, 500, "JPEG", 70, 0, (uri) => {
        resolve(uri);
      }),
        "base64");
    });

  const getImage = async (event) => {
    try {
      const reader = new FileReader();
      const file = event.target.files[0];
      const result = await resizeFile(file);
      setImage({
        file: result,
        previewURL: result,
      });
      reader.readAsDataURL(file);
    } catch (e) {
      return null;
    }
  };

  const postUploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookies.get("token");
    let data = new FormData();
    data.append("kode_aktivasi", dataid);
    data.append("file", image.file);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("produk/upload-bukti-transfer"),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        TopMessage(response?.data?.message, setSuccess(true));
        fetchData();
      })
      .catch(() => {
        TopMessage(response?.data?.message, setSuccess(false));
      });
    return setLoading(false);
  };

  // ConvetImage

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section>
      <HeaderBack
        text="Detail Transaksi"
        click={() => router.replace("/History/transaksi")}
      />
      <NotificationBar showNotif={showNotif} success={success} text={text} />
      <CardConfirm
        cancel={() => setConfirm(false)}
        click={batalTransaksi}
        loading={loadingCancel}
        text="Apakah anda ingin membatalkan transaksi!"
        icon={
          <X
            size={75}
            color="white"
            className="p-2 rounded-full bg-red-semi mx-auto"
          />
        }
        show={confirm}
      />
      <div className="section-box">
        {data && data?.length == 0 ? (
          <Skeleton count={1} height={150} highlightColor={highlightSkeleton} />
        ) : (
          <div>
            {data && data?.status == "belum dibayar" ? (
              <Transfer
                hasil={hasil}
                props={data}
                copyRek={() =>
                  ClipboardText(
                    data?.rekening,
                    TopMessage(
                      "Berhasil Menyalin No. Rekening",
                      setSuccess(true),
                    ),
                  )
                }
                copyJumlah={() =>
                  ClipboardText(
                    new Intl.NumberFormat("de-DE").format(hasil),
                    TopMessage(
                      "Berhasil Menyalin Jumlah Transfer",
                      setSuccess(true),
                    ),
                  )
                }
              />
            ) : null}
            <h1 className="my-3 text-sm font-medium">Detail Transaksi</h1>
            <CardOrder
              props={data}
              status={data?.status}
              colorStatus={`${
                data?.status == "belum dibayar"
                  ? "text-red-semi"
                  : data?.status == "menunggu konfirmasi"
                    ? "text-blue-semi"
                    : "text-green-semi"
              }`}
            />
            {(data && data?.status == "belum dibayar") == true ? (
              <div className="text-xs text-center mt-10 mb-24">
                <h1 className="font-medium">Transfer Sebelum</h1>
                <h1 className="font-semibold mb-3.75">
                  {data.batas_akhir} WITA
                </h1>
                <button
                  onClick={() => setConfirm(true)}
                  className="text-red-semi text-xs font-bold"
                >
                  Batalkan Transaksi
                </button>
              </div>
            ) : null}
            <div className="text-center">
              {data && data?.status != "belum dibayar" ? null : (
                <div className="bg-[#F7F7F7] rounded-lg p-2 mb-12">
                  <label
                    htmlFor="buktiFile"
                    className="flex justify-center border-2 border-dashed border-gray-semi items-center m-2 p-10 text-gray-semi font-semibold"
                  >
                    {image.file == null ? (
                      <h1>Silahkan Masukkan file disini</h1>
                    ) : (
                      <div>
                        <h1 className="mb-2">File Berhasil dimasukkan</h1>
                        <Image
                          src={image.file}
                          width={100}
                          height={100}
                          alt=""
                          className="w-auto"
                        />
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="buktiFile"
                    className="hidden"
                    onChange={getImage}
                  />
                </div>
              )}
              {(data?.status == "belum dibayar") == true ? (
                <ButtonForm
                  text="Upload Bukti Transfer"
                  click={postUploadImage}
                  padding={loading ? LoadingPadding : null}
                  loading={loading}
                />
              ) : data?.status == "belum dibayar" ||
                data?.status == "menunggu konfirmasi" ? null : (
                <div className="mt-12">
                  <ButtonLink text="Lihat Status Akun" href={"/Profile"} />
                </div>
              )}
            </div>
          </div>
        )}
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
