const { default: ButtonInput } = require("./ButtonInput");
import Card from "@/assets/images/icons/shopping/card-bank.svg";
import { useState } from "react";

const DataPembayaran = ({ pembayaran }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ButtonInput
        icon={Card}
        title="Skema Pembayaran"
        text="Plih metode pembayaran Anda"
        click={() => setShow(!show)}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <div className="flex flex-col">
          <label for="statusKawin" className="text-xs mb-1.25 font-bold">
            Metode Pembayaran <span className="text-red-semi">*</span>
          </label>
          <select
            name="pembayaran"
            id="pembayaran"
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            onChange={pembayaran}
            required
          >
            <option value="Cash">Cash</option>
            <option value="Kredit">Kredit</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataPembayaran;
