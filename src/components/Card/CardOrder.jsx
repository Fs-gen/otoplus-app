const CardInfo = ({ colorStatus, text, total, info }) => {
  return (
    <div className="flex justify-between items-center mb-2.5">
      <p className="text-xs text-gray-dark font-medium">{text}</p>
      <p
        className={`${
          total ? "text-blue-dark" : "text-xs"
        } font-semibold capitalize ${colorStatus}`}
      >
        {info}
      </p>
    </div>
  );
};

const CardOrder = ({ colorStatus, props, status }) => {
  const harga = parseInt(props?.harga) || parseInt(props?.jumlah);
  const hasil = harga + parseInt(props?.kode_unik);
  return (
    <div className="py-3.75 px-2.5 rounded-[10px] shadow-md">
      {status ? (
        <div className="mb-1.25">
          <CardInfo
            text="Status"
            colorStatus={colorStatus}
            info={props?.status}
          />
        </div>
      ) : null}
      <CardInfo
        text="Nama Pesanan"
        info={props?.nama || props?.nama_transaksi}
      />
      <div className="my-3.75">
        <CardInfo
          text="Harga"
          info={`Rp ${new Intl.NumberFormat("de-De").format(harga)}`}
        />
        {props && !props.kode_unik ? null : (
          <CardInfo
            text="Kode Unik"
            info={`+ Rp ${props?.kode_unik}`}
            colorStatus="text-green-semi"
          />
        )}
      </div>
      <div>
        <CardInfo
          total
          text="Total"
          info={
            props && !props.kode_unik
              ? `Rp ${harga}`
              : `Rp ${new Intl.NumberFormat("de-DE").format(hasil)}`
          }
        />
      </div>
    </div>
  );
};
export default CardOrder;
