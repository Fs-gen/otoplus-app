const { default: ButtonInput } = require("./ButtonInput");
import Car from "@/assets/images/icons/other/car.svg";
import FormLine from "@/components/Form/FormLine";

const DataKendaraan = ({
  change,
  click,
  invalid,
  show,
  merek_tipe_mobil,
  varian,
  warna,
  tahun_produksi,
  harga_otr,
  nomor_rangka,
  nomor_mesin,
  aksesoris_tambahan,
}) => {
  const BoxForm = "flex items-center gap-4";
  return (
    <div>
      <ButtonInput
        icon={Car}
        title="Data Kendaraan yang Dibeli"
        text="Spesifikasi mobile pilihan Anda"
        click={click}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        {invalid ? (
          <h1 className="text-center text-red-semi text-sm font-semibold mb-2">
            Harap Masukkan Setidaknya Merek & Tipe Mobil Anda!
          </h1>
        ) : null}
        <FormLine
          bold
          change={change}
          name="merek_tipe_mobil"
          placeholder="Contoh: Toyota Avanza"
          required={true}
          title="Merek & Tipe Mobil"
          value={merek_tipe_mobil}
        />
        <div className={BoxForm}>
          <FormLine
            bold
            change={change}
            name="varian"
            placeholder="Contoh: 1.3 G MT"
            title="Varian"
            value={varian}
          />
          <FormLine
            bold
            change={change}
            name="warna"
            placeholder="Warna"
            title="Warna"
            value={warna}
          />
        </div>
        <div className={BoxForm}>
          <FormLine
            bold
            change={change}
            name="tahun_produksi"
            placeholder="2024"
            title="Tahun Produksi"
            type="number"
            value={tahun_produksi}
          />
          <FormLine
            bold
            change={change}
            name="harga_otr"
            placeholder="Rp 0"
            title="Harga OTR"
            type="number"
            value={harga_otr}
          />
        </div>
        <div className={BoxForm}>
          <FormLine
            bold
            change={change}
            name="nomor_rangka"
            placeholder="Diisi Dealer"
            title="Nomor Rangka"
            value={nomor_rangka}
          />
          <FormLine
            bold
            change={change}
            name="nomor_mesin"
            placeholder="Diisi Dealer"
            title="Nomor Mesin"
            value={nomor_mesin}
          />
        </div>
        <FormLine
          bold
          change={change}
          name="aksesoris_tambahan"
          placeholder="Contoh: Kaca Film, Seat Cover, DLL"
          title="Aksesoris Tambahan"
          value={aksesoris_tambahan}
        />
      </div>
    </div>
  );
};

export default DataKendaraan;
