import { ChevronRight } from "lucide-react";
import { Cog } from "lucide-react";

const TextDetail = ({ title, desc }) => {
  return (
    <div>
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm font-medium">{desc}</p>
    </div>
  );
};

const CardSpec = ({ props, click, show, other }) => {
  return (
    <div className="border-2 border-blue-semi rounded-xl">
      <button
        className="flex w-full items-center justify-between bg-blue-semi p-4 rounded-lg text-white"
        onClick={click}
      >
        <div className="flex gap-2 items-center">
          <div className={`bg-white p-1 rounded-lg`}>
            <Cog
              size={30}
              color="#00529c"
              className={`${show ? "rotate-90" : ""} transition`}
            />
          </div>
          <p className="font-semibold">Spesifikasi</p>
        </div>
        <ChevronRight
          size={25}
          color="white"
          className={`${show ? "rotate-90" : ""} transition`}
        />
      </button>
      <div className={`${show ? "block" : "hidden"} p-4`}>
        <div className="flex flex-col text-left gap-4">
          <TextDetail title="Dimensi" desc={props?.dimensi} />
          <TextDetail title="Fitur Utama" desc={props?.fitur_utama} />
          <TextDetail title="Keselamatan" desc={props?.keselamatan} />
          <TextDetail title="Lainnya" desc={other} />
        </div>
        <div className="mt-4">
          <h1 className="text-lg font-semibold mb-4">Varian Mesin</h1>
          <div className="flex flex-col gap-3">
            {props &&
              props?.mesin.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-4 bg-blue-semi text-white rounded-xl"
                  >
                    <h1 className="text-xl font-semibold">Tipe {item.tipe}</h1>
                    <TextDetail title="Kapasitas" desc={item.kapasitas} />
                    <TextDetail title="Torsi" desc={item.torsi} />
                    <TextDetail title="Tenaga" desc={item.tenaga} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSpec;
