const { default: ButtonInput } = require("./ButtonInput");
import SuitCase from "@/assets/images/icons/other/suitcase.svg";
import FormArea from "@/components/Form/FormArea";
import FormLine from "@/components/Form/FormLine";

const DataPekerjaan = ({
  change,
  click,
  show,
  jenis_pekerjaan,
  nama_perusahaan,
  jabatan,
  lama_bekerja,
  alamat_kantor,
  telp_kantor,
  penghasilan_bulanan,
}) => {
  return (
    <div>
      <ButtonInput
        icon={SuitCase}
        title="Data Pekerjaan & Penghasilan"
        text="Terutama jika pembeli kredit"
        click={click}
      />
      <div
        className={`bg-white ${
          show ? "flex flex-col gap-2.5" : "hidden"
        } p-4 mt-1 rounded-lg `}
      >
        <FormLine
          bold
          change={change}
          name="jenis_pekerjaan"
          placeholder="Masukkan jenis pekerjaan"
          title="Jenis Pekerjaan"
          value={jenis_pekerjaan}
        />
        <FormLine
          bold
          change={change}
          name="nama_perusahaan"
          placeholder="Nama Perusahaan / Usaha"
          title="Nama Perusahaan / Usaha"
          value={nama_perusahaan}
        />
        <div className="flex items-center gap-4">
          <FormLine
            bold
            change={change}
            name="jabatan"
            placeholder="Jabatan"
            title="Jabatan"
            value={jabatan}
          />
          <FormLine
            bold
            change={change}
            name="lama_bekerja"
            placeholder="Tahun"
            title="Lama Bekerja"
            type="number"
            value={lama_bekerja}
          />
        </div>
        <FormArea
          bold
          change={change}
          name="alamat_kantor"
          placeholder="Alamat Lengkap Kantor"
          title="Alamat Kantor"
          value={alamat_kantor}
        />
        <FormLine
          bold
          change={change}
          name="telp_kantor"
          placeholder="021XXXXXXXXX"
          title="Nomor Telepon Kantor"
          type="number"
          value={telp_kantor}
        />
        <FormLine
          bold
          change={change}
          name="penghasilan_bulanan"
          placeholder="Rp 0"
          title="Penghasilan Per Bulan"
          type="number"
          value={penghasilan_bulanan}
        />
      </div>
    </div>
  );
};

export default DataPekerjaan;
