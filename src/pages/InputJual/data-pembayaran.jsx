const { default: ButtonInput } = require("./ButtonInput");
import Card from "@/assets/images/icons/shopping/card-bank.svg";

const DataPembayaran = ({ change, click, invalid, jenis_pembayaran, show }) => {
  return (
    <div>
      <ButtonInput
        icon={Card}
        title="Skema Pembayaran"
        text="Plih metode pembayaran Anda"
        click={click}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <div className="flex flex-col">
          {invalid ? (
            <h1 className="text-center text-red-semi text-sm font-semibold mb-2">
              Harap kolom wajib diisi dengan benar
            </h1>
          ) : null}
          <label
            htmlForfor="jenis_pembayaran"
            className="text-xs mb-1.25 font-bold"
          >
            Metode Pembayaran <span>(Wajib)</span>
          </label>
          <select
            name="jenis_pembayaran"
            id="jenis_pembayaran"
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            onChange={change}
            required
            value={jenis_pembayaran}
          >
            <option value="">Pilih Metode Pembayaran</option>
            <option value="Cash">Cash</option>
            <option value="Kredit">Kredit</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataPembayaran;
