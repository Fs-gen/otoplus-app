const BoxModel = ({ title, props, model }) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-semibold text-xl">{title}</h1>
      {props &&
        props.map((item, index) => {
          const nama = model;
          return (
            <div
              key={index}
              className="px-4 py-5 border-2 border-blue-semi rounded-xl"
            >
              <h1 className="text-xl font-semibold">
                {nama} {item.nama}
              </h1>
              <div className="py-1">
                <p className="font-medium text-sm">
                  Harga Jakarta - {item.harga}
                </p>
                <p className="font-medium text-sm">
                  Harga Makssaar - {item.harga_makassar}
                </p>
              </div>
              <p className="font-medium text-sm"></p>
              <p className="text-xs font-semibold text-text-gray">
                Kapasitas: {item.kapasitas}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default BoxModel;
