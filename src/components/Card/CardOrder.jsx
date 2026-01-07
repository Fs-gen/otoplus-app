const CardInfo = ({ color, text, total, info }) => {
  return (
    <div className="flex justify-between items-center mb-2.5">
      <p className="text-xs text-gray-light">{text}</p>
      <p
        className={`${
          total ? "text-blue-dark" : "text-xs"
        } font-semibold ${color}`}
      >
        {info}
      </p>
    </div>
  );
};

const CardOrder = ({ color, props, status }) => {
  const harga = new Intl.NumberFormat("de-DE").format(props?.harga);
  return (
    <div className="py-3.75 px-2.5 rounded-[10px] shadow-md">
      {status ? (
        <div className="mb-1.25">
          <CardInfo text="Status" color={color} info={props?.status} />
        </div>
      ) : null}
      <CardInfo text="Nama Pesanan" info={props?.nama} />
      <div className="my-3.75">
        <CardInfo text="Harga" info={`Rp ${harga}`} />
        {props && !props.kode_unik ? null : (
          <CardInfo
            text="Kode Unik"
            info={props?.kode_unik}
            color="text-green-semi"
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
              : `Rp ${parseInt(harga) + parseInt(props.kode_unik)}`
          }
        />
      </div>
    </div>
  );
};
export default CardOrder;
