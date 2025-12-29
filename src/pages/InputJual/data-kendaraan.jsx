const { default: ButtonInput } = require("./ButtonInput");
import Car from "@/assets/images/icons/other/car.svg";
import FormLine from "@/components/Form/FormLine";
import { useState } from "react";

const DataKendaraan = ({}) => {
  const [show, setShow] = useState(false);
  const BoxForm = "flex items-center gap-4";
  return (
    <div>
      <ButtonInput
        icon={Car}
        title="Data Kendaraan yang Dibeli"
        text="Spesifikasi mobile pilihan Anda"
        click={() => setShow(!show)}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <FormLine title="Merek & Tipe Mobile" required={true} bold placeholder="Contoh: Toyota Avanza" />
        <div className={BoxForm}>
          <FormLine title="Varian" required={true} bold placeholder="Contoh: 1.3 G MT"/>
          <FormLine title="Warna" placeholder="Warna" bold required={true} />
        </div>
        <div className={BoxForm}>
          <FormLine title="Tahun Produksi" required={true} bold placeholder="2024"/>
          <FormLine title="Harga OTR" required={true} bold placeholder="Rp 0"/>
        </div>
        <div className={BoxForm}>
          <FormLine title="Nomor Rangka" placeholder="Diisi Dealer" bold />
          <FormLine title="Nomor Mesin" placeholder="Diisi Dealer" bold />
        </div>
        <FormLine title="Aksesoris Tambahan" placeholder="Contoh: Kaca Film, Seat Cover, DLL" bold/>
      </div>
    </div>
  );
};

export default DataKendaraan;
