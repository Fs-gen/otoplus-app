import Link from "next/link";
import { useState } from "react";

const CardWithdraw = ({ click, id, loading, props }) => {
  const [confirm, setConfirm] = useState(false);
  id(props?.id_withdraw);
  return (
    <Link
      href={`/Withdraw/Detail/${props.id_withdraw}`}
      className="p-4 bg-white shadow-lg rounded-xl"
    >
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
              props.status == "pending" ? "text-yellow-semi" : "text-blue-semi"
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
              : click
          }
        >
          {loading ? (
            <div className="spinner-small"></div>
          ) : (
            <h1>{confirm ? "Konfirmasi Pembatalan" : "Batalkan Penarikan"}</h1>
          )}
        </button>
      )}
    </Link>
  );
};

export default CardWithdraw;
