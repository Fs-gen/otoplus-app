const { default: ButtonInput } = require("./ButtonInput");
import Upload from "@/assets/images/icons/system/upload.svg";
import { useState } from "react";

const InputFile = ({ change, id, text }) => {
  return (
    <label
      htmlFor={id}
      className="bg-[#F7F7F7] text-center p-2 font-semibold text-xs cursor-pointer"
    >
      <div className="border-2 border-gray-dark px-2 py-4 border-dashed text-gray-700">
        <input
          type="file"
          id={id}
          name={id}
          onChange={change}
          className="hidden"
        />
        {text}
      </div>
    </label>
  );
};

const DataDokumen = ({
  change,
  ktp,
  dok_ktp,
  kk,
  dok_kk,
  npwp,
  dok_npwp,
  slipGaji,
  dok_slip_gaji,
  suratKerja,
  dok_surat_kerja,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ButtonInput
        icon={Upload}
        title="Dokumen Pendukung"
        text="Upload dokumen yang diperlukan"
        click={() => setShow(!show)}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <div for="file-upload" className="bg-[#F7F7F7] p-4 rounded-xl">
          <h1 className="text-sm font-bold">Dokumen yang dilampirkan:</h1>
          <ul className="text-xs font-medium text-gray-dark list-disc flex flex-col gap-1">
            <li className="ml-6 mt-2">Fotokopi KTP</li>
            <li className="ml-6">Kartu Keluarga</li>
            <li className="ml-6">NPWP</li>
            <li className="ml-6">
              Slip Gaji / rekening koran ( 3 bulan terakhir )
            </li>
            <li className="ml-6">Surat keterangan kerja / usaha</li>
          </ul>
        </div>
        <InputFile text={ktp} id="dok_ktp" change={change} />
        <InputFile text={kk} id="dok_kk" change={change} />
        <InputFile text={npwp} id="dok_npwp" change={change} />
        <InputFile text={slipGaji} id="dok_slip_gaji" change={change} />
        <InputFile text={suratKerja} id="dok_surat_kerja" change={change} />
      </div>
    </div>
  );
};

export default DataDokumen;
