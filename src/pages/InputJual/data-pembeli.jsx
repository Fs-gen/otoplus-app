const { default: ButtonInput } = require("./ButtonInput");
import User from "@/assets/images/icons/system/user.svg";
import FormArea from "@/components/Form/FormArea";
import FormLine from "@/components/Form/FormLine";

const DataPembeli = ({
  change,
  click,
  invalid,
  nama_lengkap,
  nik,
  tempat_lahir,
  tanggal_lahir,
  alamat_ktp,
  alamat_domisili,
  no_hp,
  email,
  show,
  status_perkawinan,
}) => {
  return (
    <div>
      <ButtonInput
        icon={User}
        title="Data Identitas Pembeli"
        text="Untuk STNK, BPKB, dan Kontrak"
        click={click}
      />
      <div
        className={`bg-white ${
          show == true ? "flex flex-col gap-2.5" : show == false ? "hidden" : ""
        } p-4 mt-1 rounded-lg `}
      >
        {invalid ? (
          <h1 className="text-center text-red-semi text-sm font-semibold mb-2">
            Harap kolom wajib diisi dengan benar
          </h1>
        ) : null}
        <FormLine
          bold
          change={change}
          name="nama_lengkap"
          placeholder="Masukkan Nama Lengkap"
          required
          title="Nama Lengkap ( sesuai KTP )"
          value={nama_lengkap}
        />
        <FormLine
          bold
          change={change}
          name="nik"
          placeholder="16 Digit NIK"
          required
          title="NIK"
          type="number"
          value={nik}
        />
        <div className="flex items-center gap-4">
          <FormLine
            bold
            change={change}
            name="tempat_lahir"
            placeholder="Kota"
            title="Tempat Lahir"
            value={tempat_lahir}
          />
          <FormLine
            bold
            change={change}
            name="tanggal_lahir"
            title="Tanggal Lahir"
            type="date"
            value={tanggal_lahir}
          />
        </div>
        <FormArea
          bold
          change={change}
          name="alamat_ktp"
          placeholder="Alamat Kengkap sesuai KTP"
          title="Alamat Lengkap ( sesuai KTP )"
          value={alamat_ktp}
        />
        <FormArea
          bold
          change={change}
          title="Alamat Domisili ( jika berbeda )"
          name="alamat_domisili"
          placeholder="Kosongkan jika sama dengan Alamat KTP"
          value={alamat_domisili}
        />
        <FormLine
          bold
          change={change}
          name="no_hp"
          placeholder="08XXXXXXXXXX"
          required={true}
          title="Nomor HP Aktif"
          type="number"
          value={no_hp}
        />
        <FormLine
          bold
          change={change}
          name="email"
          placeholder="email@example.com"
          title="Email"
          type="mail"
          value={email}
        />
        <div className="flex flex-col">
          <label htmlFor="statusKawin" className="text-xs mb-1.25 font-bold">
            Status Perkawinan
          </label>
          <select
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            id="statusKawin"
            name="status_perkawinan"
            onChange={change}
            value={status_perkawinan}
          >
            <option value="">Pilih Status</option>
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
