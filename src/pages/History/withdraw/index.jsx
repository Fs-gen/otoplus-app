import HeaderBack from "@/components/Header/HeaderBack";
import NotificationBar from "@/components/NotificationBar";
import { getHistoryWithdraw, postBatalWithdraw } from "@/pages/api/api";
import Link from "next/link";
import { useEffect, useState } from "react";

const CardWithdraw = ({ props }) => {
  const [confirm, setConfirm] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const CancelWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await postBatalWithdraw(props?.id_withdraw);
    console.log(res);
    if (res?.status_code == "00") {
      TopMessage(res?.data?.message, setSuccess(true));
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      TopMessage(res?.data?.message, setSuccess(false));
    }
    setLoading(false);
  };
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <NotificationBar showNotif={showNotif} text={text} success={success} />
      <Link href={`/Withdraw/Detail/${props.id_withdraw}`}>
        <div className="text-sm flex justify-between">
          <div>
            <h1 className="font-semibold">{props.nama_bank}</h1>
            <p className="font-medium text-text-gray">{props.atas_nama}</p>
          </div>
          <h1 className="font-semibold text-xs text-text-gray">
            {props.tanggal_withdraw}
          </h1>
        </div>
        <div className="flex justify-between mt-4 flex-wrap gap-2">
          <div className="flex gap-4">
            <div className="text-sm">
              <h3 className="font-medium text-text-gray">Jumlah</h3>
              <h1 className="font-bold text-blue-semi">
                Rp {new Intl.NumberFormat("de-DE").format(props.jumlah)}
              </h1>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-text-gray">No. Rek</h3>
              <h1 className="font-bold text-blue-semi">{props.no_rekening}</h1>
            </div>
          </div>
          <div className="text-sm">
            <h3 className="font-medium text-text-gray">Status</h3>
            <h1
              className={`font-bold capitalize ${
                props.status == "pending"
                  ? "text-yellow-semi"
                  : "text-blue-semi"
              }`}
            >
              {props.status}
            </h1>
          </div>
        </div>
        {props.status == "success" ? (
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
            onClick={
              confirm == false
                ? (e) => {
                    e.preventDefault();
                    setConfirm(true);
                  }
                : CancelWithdraw
            }
          >
            {loading ? (
              <div className="spinner-small"></div>
            ) : (
              <h1>
                {confirm ? "Konfirmasi Pembatalan" : "Batalkan Penarikan"}
              </h1>
            )}
          </button>
        )}
      </Link>
    </div>
  );
};

const HistoryWithdraw = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getHistoryWithdraw();
    setData(res);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Histori Withdraw" />
      <div className="section-box">
        {
          (data.message = "Withdraw Tidak Ditemukan" ? (
            <h1 className="text-center">Tidak Ada Penarikan</h1>
          ) : (
            <div className="flex flex-col gap-4">
              {data?.map((item, index) => {
                return <CardWithdraw key={index} props={item} />;
              })}
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default HistoryWithdraw;
