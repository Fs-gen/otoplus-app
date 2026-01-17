import NotificationBar from "@/components/NotificationBar";
import { useEffect, useState } from "react";
import { getDetailWithdraw, postBatalWithdraw } from "../api/api";
import { useRouter } from "next/router";
import HeaderBack from "@/components/Header/HeaderBack";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";
import CardConfirm from "@/components/PopUp/CardConfirm";
import { X } from "lucide-react";

const DetailWithdraw = ({ id }) => {
  const [data, setData] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const detail = "text-sm flex justify-between items-center";

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
    const res = await getDetailWithdraw(id);
    setData(res);
  };

  const CancelWithdraw = async (e) => {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    const res = await postBatalWithdraw(id);
    console.log(res);
    if (res?.status_code == "00") {
      TopMessage(res?.data?.message, setSuccess(true));
      setConfirm(false);
      setTimeout(() => {
        router.replace("/History/transaksi");
      }, 2000);
    } else {
      TopMessage(res?.data?.message, setSuccess(false));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${confirm ? "overflow-hidden max-h-dvh" : ""}`}>
      <HeaderBack text="Detail Withdraw" />
      <NotificationBar showNotif={showNotif} text={text} success={success} />
      <CardConfirm
        show={confirm}
        icon={
          <X
            size={75}
            color="white"
            className="p-2 bg-red-semi rounded-full mx-auto"
          />
        }
        color="bg-red-semi"
        text="Apakah anda yakin untuk membatalkan penarikan?"
        cancel={() => setConfirm(false)}
        click={CancelWithdraw}
        loading={loading}
      />
      <div className="section-box">
        {data && data.length == 0 ? (
          <Skeleton
            count={1}
            height={180}
            borderRadius={10}
            highlightColor={highlightSkeleton}
          />
        ) : (
          <div className="p-4 bg-white shadow-lg rounded-xl">
            <div className="text-sm flex justify-between">
              <div>
                <h1 className="font-semibold">{data.nama_bank}</h1>
                <p className="font-medium text-text-gray">{data.atas_nama}</p>
              </div>
              <h1 className="font-semibold text-xs text-text-gray">
                {data.tanggal_withdraw}
              </h1>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <div className={detail}>
                <h3 className="font-medium text-text-gray">Status</h3>
                <h1
                  className={`font-bold capitalize ${
                    data.status == "pending"
                      ? "text-yellow-semi"
                      : "text-blue-semi"
                  }`}
                >
                  {data.status}
                </h1>
              </div>
              <div className={detail}>
                <h3 className="font-medium text-text-gray">No. Rek</h3>
                <h1 className="font-bold text-blue-dark">{data.no_rekening}</h1>
              </div>
              <div className={detail}>
                <h3 className="font-medium text-text-gray">Jumlah</h3>
                <h1 className="font-bold text-blue-dark text-lg">
                  Rp {new Intl.NumberFormat("de-DE").format(data.jumlah)}
                </h1>
              </div>
            </div>

            {data.status == "success" ? (
              <button
                type="button"
                className="text-sm font-semibold  bg-blue-semi w-full mt-4 p-2 rounded-xl text-white"
              >
                Lihat Detail
              </button>
            ) : (
              <button
                type="button"
                className="text-sm font-semibold  bg-red-semi w-full mt-4 p-2 rounded-xl text-white"
                disabled={success}
                onClick={
                  confirm == false
                    ? (e) => {
                        e.preventDefault();
                        setConfirm(true);
                      }
                    : CancelWithdraw
                }
              >
                Betalkan Penarikan
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailWithdraw;

export const getServerSideProps = (context) => {
  const { id } = context.query;
  console.log(id);
  return {
    props: {
      id,
    },
  };
};
