const { default: ButtonInput } = require("./ButtonInput");
import Upload from "@/assets/images/icons/system/upload.svg";
import { useState } from "react";

const DataDokumen = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ButtonInput
        icon={Upload}
        title="Data Untuk STNK & BPKB"
        text="Informasi Registrasi Kendaraan"
        click={() => setShow(!show)}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <label for="file-upload" className="bg-[#F7F7F7] p-4 rounded-xl">
          <h1 className="text-sm font-bold">Dokumen yang dilampirkan:</h1>
          <ul className="text-xs font-medium text-gray-dark list-disc flex flex-col gap-1">
            <li className="ml-6 mt-2">Fotokopi KTP</li>
            <li className="ml-6">Kartu Keluarga</li>
            <li className="ml-6">NPWP</li>
            <li className="ml-6">Slip Gaji / rekening koran ( 3 bulan terakhir )</li>
            <li className="ml-6">Surat keterangan kerja / usaha</li>
          </ul>
        </label>
        <input type="file" id="file-upload" multiple accept="image/*" className="file:hidden text-sm ml-1 font-semibold"/>
      </div>
    </div>
  );
};

export default DataDokumen;
