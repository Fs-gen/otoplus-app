const { default: ButtonInput } = require("./ButtonInput");
import SuitCase from "@/assets/images/icons/other/suitcase.svg";
import FormArea from "@/components/Form/FormArea";
import FormLine from "@/components/Form/FormLine";
import { useState } from "react";

const DataPekerjaan = ({}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ButtonInput
        icon={SuitCase}
        title="Data Pekerjaan & Penghasilan"
        text="Terutama jika pembeli kredit"
        click={() => setShow(!show)}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <FormLine title="Jenis Pekerjaan" required={true} bold placeholder="Masukkan jenis pekerjaan"/>
        <FormLine title="Nama Perusahaan / Usaha" required={true} bold placeholder="Nama Perusahaan / Usaha"/>
        <div className="flex items-center gap-4">
          <FormLine title="Jabatan" required={true} bold placeholder="Jabatan"/>
          <FormLine title="Lama Bekerja" required={true} bold placeholder="Tahun"/>
        </div>
        <FormArea title="Alamat Kantor" required={true} bold placeholder="Alamat Lengkap Kantor"/>
        <FormLine title="Nomor Telepon Kantor" placeholder="021XXXXXXXXX" bold />
        <FormLine title="Penghasilan Per Bulan" placeholder="Rp 0" bold required={true}/>
      </div>
    </div>
  );
};

export default DataPekerjaan;
