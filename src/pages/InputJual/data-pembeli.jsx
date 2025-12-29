const { default: ButtonInput } = require("./ButtonInput");
import User from "@/assets/images/icons/system/user.svg";
import FormArea from "@/components/Form/FormArea";
import FormLine from "@/components/Form/FormLine";
import { useState } from "react";

const DataPembeli = ({ nama, changeNama, nik, changeNIK, statusKawin }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ButtonInput
        icon={User}
        title="Data Identitas Pembeli"
        text="Untuk STNK, BPKB, dan Kontrak"
        click={() => setShow(!show)}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <FormLine
          value={nama}
          change={changeNama}
          title="Nama Lengkap ( sesuai KTP )"
          placeholder="Masukkan Nama Lengkap"
          bold
          required={true}
        />
        <FormLine
          value={nik}
          change={changeNIK}
          placeholder="NIK"
          title="Nama Lengkap ( sesuai KTP )"
          bold
          required={true}
        />
        <div className="flex items-center gap-4">
          <FormLine title="Tempat Lahir" placeholder="Kota" bold />
          <FormLine type="date" title="Tanggal Lahir" />
        </div>
        <FormArea
          title="Alamat Lengkap ( sesuai KTP )"
          required={true}
          placeholder="Alamat Kengkap sesuai KTP"
          bold
        />
        <FormArea
          title="Alamat Domisili ( jika berbeda )"
          placeholder="Kosongkan jika sama dengan Alamat KTP"
          bold
        />
        <FormLine
          title="Nomor HP Aktif"
          required={true}
          placeholder="08XXXXXXXXXX"
          bold
        />
        <FormLine
          title="Email"
          required={true}
          placeholder="email@example.com"
          bold
        />
        <div className="flex flex-col">
          <label for="statusKawin" className="text-xs mb-1.25 font-bold">
            Status Perkawinan <span className="text-red-semi">*</span>
          </label>
          <select
            name="statusKawin"
            id="statusKawin"
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            onChange={statusKawin}
            required
          >
            <option value="Belum Kawin">Belum Kawin</option>
            <option value="Kawin">Kawin</option>
            <option value="Cerai Hidup">Cerai Hidup</option>
            <option value="Cerai Mati">Cerai Mati</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataPembeli;
