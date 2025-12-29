const CardInfo = ({ color, text, total, info }) => {
  return (
    <div className="flex justify-between items-center mb-2.5">
      <p className="text-xs text-gray-light">{text}</p>
      <p className={`${ total ? "" : "text-xs" } font-semibold ${color}`}>{info}</p>
    </div>
  );
};

const CardOrder = ({ color, props, status }) => {
  return (
    <div className="py-3.75 px-2.5 rounded-[10px] shadow-md">
      {status ? (
        <div className="mb-1.25">
          <CardInfo text="Status" color={color} info={status}/>
        </div>
      ) : null}
      <CardInfo text="Nama Pesanan" info="Upgrade ke Agen Plus" />
      <div className="my-3.75">
        <CardInfo text="Harga" info="Rp. 500.000" />
        <CardInfo text="Kode Unik" info="+180" color="text-green-semi"/>
      </div>
      <div>
        <CardInfo total text="Total" info="Rp. 500.180"/>
      </div>
    </div>
  );
};
export default CardOrder;
