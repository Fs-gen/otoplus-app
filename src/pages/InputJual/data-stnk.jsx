const { default: ButtonInput } = require("./ButtonInput");
import Document from "@/assets/images/icons/other/document.svg";
import FormArea from "@/components/Form/FormArea";
import FormLine from "@/components/Form/FormLine";
import { useState } from "react";

const DataSTNK = ({ tipePemilik }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ButtonInput
        icon={Document}
        title="Data Untuk STNK & BPKB"
        text="Informasi Registrasi Kendaraan"
        click={() => setShow(!show)}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <div className="flex flex-col">
          <label for="tipe_pemilik" className="text-xs mb-1.25 font-bold">
            Tipe Pemilik <span className="text-red-semi">*</span>
          </label>
          <select
            name="tipe_pemilik"
            id="tipe_pemilik"
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            onChange={tipePemilik}
            required
          >
            <option value="pribadi">Pribadi</option>
            <option value="perusahaan">Perusahaan</option>
          </select>
        </div>
        <FormArea title="Alamat STNK" placeholder="Alamat yang akan tertera di STNK" required={true} bold />
        <FormLine title="NPWP" placeholder="Nomor NPWP ( opsional )" />
        <FormLine title="Nama pada Faktur Kendaraan" placeholder="Nama yang tertera di faktur"/>
      </div>
    </div>
  );
};

export default DataSTNK;
