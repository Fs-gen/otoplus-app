const { default: ButtonInput } = require("./ButtonInput");
import Document from "@/assets/images/icons/other/document.svg";
import FormArea from "@/components/Form/FormArea";
import FormLine from "@/components/Form/FormLine";

const DataSTNK = ({
  click,
  change,
  invalid,
  show,
  tipe_pemilik,
  alamat_stnk,
  npwp,
  nama_faktur,
}) => {
  return (
    <div>
      <ButtonInput
        icon={Document}
        title="Data Untuk STNK & BPKB"
        text="Informasi Registrasi Kendaraan"
        click={click}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        {invalid ? (
          <h1 className="text-center text-red-semi text-sm font-semibold mb-2">
            Harap kolom wajib diisi dengan benar
          </h1>
        ) : null}
        <div className="flex flex-col">
          <label for="tipe_pemilik" className="text-xs mb-1.25 font-bold">
            Tipe Pemilik <span>(Wajib)</span>
          </label>
          <select
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            id="tipe_pemilik"
            name="tipe_pemilik"
            onChange={change}
            required
            value={tipe_pemilik}
          >
            <option value="">Pilih Pemilik</option>
            <option value="Pribadi">Pribadi</option>
            <option value="Perusahaan">Perusahaan</option>
          </select>
        </div>
        <FormArea
          bold
          change={change}
          name="alamat_stnk"
          placeholder="Alamat yang akan tertera di STNK"
          required={true}
          title="Alamat STNK"
          value={alamat_stnk}
        />
        <FormLine
          bold
          change={change}
          name="npwp"
          placeholder="Nomor NPWP ( opsional )"
          title="NPWP"
          value={npwp}
        />
        <FormLine
          bold
          change={change}
          name="nama_faktur"
          placeholder="Nama yang tertera di faktur"
          title="Nama pada Faktur Kendaraan"
          value={nama_faktur}
        />
      </div>
    </div>
  );
};

export default DataSTNK;
