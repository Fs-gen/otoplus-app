const { default: ButtonInput } = require("./ButtonInput");
import Shield from "@/assets/images/icons/system/shield.svg";
import FormLine from "@/components/Form/FormLine";

const DataAsuransi = ({
  click,
  show,
  changeOption,
  jenis_asuransi,
  periode_asuransi,
  nama_tertanggung,
  banjir,
  huruhara,
  gempabumi,
  change,
}) => {
  return (
    <div>
      <ButtonInput
        icon={Shield}
        title="Data Asuransi"
        text="Pilih asuransi kendaraan Anda"
        click={click}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <div className="flex flex-col">
          <label for="jenis_asuransi" className="text-xs mb-1.25 font-bold">
            Jenis Asuransi
          </label>
          <select
            name="jenis_asuransi"
            id="jenis_asuransi"
            value={jenis_asuransi}
            className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
            onChange={changeOption}
            required
          >
            <option value="">Pilih Asuransi</option>
            <option value="All Risk">All Risk</option>
            <option value="TLO ( Total Lost Only )">
              TLO ( Total Lost Only )
            </option>
          </select>
        </div>
        <FormLine
          bold
          change={changeOption}
          name="periode_asuransi"
          placeholder="Contoh: 1 Tahun"
          title="Periode Asuransi"
          value={periode_asuransi}
        />
        <FormLine
          bold
          change={changeOption}
          name="nama_tertanggung"
          placeholder="Nama Tertanggung"
          title="Nama Tertanggung"
          value={nama_tertanggung}
        />
        <div className="">
          <h1 className="text-sm font-semibold mb-2">Perluasan Asuransi</h1>
          <div className="flex flex-col text-sm font-semibold">
            <div className="flex gap-2 item-center">
              <input
                checked={banjir}
                id="banjir"
                name="perluasan_asuransi"
                onChange={change}
                type="checkbox"
                value="Banjir"
              />
              <label htmlFor="banjir">Banjir</label>
            </div>
            <div className="flex gap-2 item-center">
              <input
                checked={huruhara}
                name="perluasan_asuransi"
                id="huru_hara"
                onChange={change}
                type="checkbox"
                value="Huru-Hara"
              />
              <label htmlFor="huru_hara">Huru-Hara</label>
            </div>
            <div className="flex gap-2 item-center">
              <input
                checked={gempabumi}
                id="gempa_bumi"
                name="perluasan_asuransi"
                onChange={change}
                type="checkbox"
                value="Gempa Bumi"
              />
              <label htmlFor="gempa_bumi">Gempa Bumi</label>
            </div>
          </div>
          {/* <label for="perluasan_asuransi" className="text-xs mb-1.25 font-bold">
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
          </select> */}
        </div>
      </div>
    </div>
  );
};

export default DataAsuransi;
