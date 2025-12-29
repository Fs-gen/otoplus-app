const { default: ButtonInput } = require("./ButtonInput");
import Shield from "@/assets/images/icons/system/shield.svg";
import FormLine from "@/components/Form/FormLine";
import { useState } from "react";

const DataAsuransi = ({ tipePemilik }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ButtonInput
        icon={Shield}
        title="Data Asuransi"
        text="Pilih asuransi kendaraan Anda"
        click={() => setShow(!show)}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <div className="flex flex-col">
          <label for="jenis_asuransi" className="text-xs mb-1.25 font-bold">
            Jenis Asuransi <span className="text-red-semi">*</span>
          </label>
          <select
            name="jenis_asuransi"
            id="jenis_asuransi"
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            onChange={tipePemilik}
            required
          >
            <option value="All Risk">All Risk</option>
            <option value="tlo">TLO ( Total Lost Only )</option>
          </select>
        </div>
        <FormLine title="Periode Asuransi" placeholder="Contoh: 1 Tahun" bold />
        <FormLine title="Nama Tertanggung" placeholder="Nama Tertanggung" bold/>
        <div className="flex flex-col">
          <label for="perluasan_asuransi" className="text-xs mb-1.25 font-bold">
            Perluasan Asuransi<span className="text-red-semi">*</span>
          </label>
          <select
            name="perluasan_asuransi"
            id="perluasan_asuransi"
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            onChange={tipePemilik}
            required
          >
            <option value="Tidak Perlu">Tidak Perlu</option>
            <option value="Banjir">Banjir</option>
            <option value="Huru-Hara">Huru-Hara</option>
            <option value="Gempa Bumi">Gempa Bumi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataAsuransi;
