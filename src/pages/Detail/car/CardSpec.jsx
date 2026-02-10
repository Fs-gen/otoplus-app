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

const CardSpec = ({ props, click, show }) => {
  return (
    <button className="border-2 border-blue-semi rounded-xl" onClick={click}>
      <div className="flex items-center justify-between bg-blue-semi p-4 rounded-lg text-white ">
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
      </div>
      <div className={`${show ? "block" : "hidden"} p-4`}>
        <div className="flex flex-col text-left gap-4">
          <TextDetail title="Dimensi" desc={props?.dimensi} />
          <TextDetail title="Fitur Utama" desc={props?.fitur_utama} />
          <TextDetail title="Keselamatan" desc={props?.keselamatan} />
          <TextDetail title="Lainnya" desc={props?.lainnya} />
        </div>
      </div>
    </button>
  );
};

export default CardSpec;
