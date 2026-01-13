import Link from "next/link";

const CardHistory = ({ href, icon, cursor, props, reward, status }) => {
  const fontSemi = "text-xs font-semibold";
  return (
    <Link
      className={`flex justify-between items-center px-3.75 py-2.5 border border-[#e3e3e3] rounded-[20px] mb-2.5 ${
        cursor ? "cursor-default" : ""
      }`}
      href={href}
    >
      <div className="flex gap-2 flex-2">
        <div className="p-1.5 flex bg-gray-semi rounded-full max-h-7.75">
          {icon}
        </div>
        <div className="flex flex-col gap-1.5 text-xs capitalize">
          <h1 className="font-semibold">
            {props.nama_transaksi || props.keterangan}
          </h1>
          <h2 className="text-text-gray">
            {props.tanggal_transaksi || props.created_at}
          </h2>
          <h2 className={`${reward ? "text-green-semi" : ""} font-semibold`}>
            Rp. {new Intl.NumberFormat("de-DE").format(props.jumlah)}
          </h2>
        </div>
      </div>
      {status ? (
        <h1 className={`${status} text-xs text-right font-semibold capitalize flex-1`}>
          {props.status}
        </h1>
      ) : null}
    </Link>
  );
};

export default CardHistory;