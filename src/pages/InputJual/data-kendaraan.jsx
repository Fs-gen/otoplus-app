const { default: ButtonInput } = require("./ButtonInput");
import FormLine from "@/components/Form/FormLine";
import { BoxIconStyle } from "@/styles/style";
import { Car } from "lucide-react";
import { useEffect, useState } from "react";
import { getListVarianMobil, getListWarnaMobil } from "../api/api";

const CardSelect = ({
  name,
  title,
  component,
  change,
  required,
  selected,
  value,
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-xs mb-1.25 font-bold">
        {title}
      </label>
      <select
        name={name}
        id={name}
        className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
        onChange={change}
        required={required ? true : false}
        value={value}
      >
        <option value="">{selected}</option>
        {component}
      </select>
    </div>
  );
};

const DataKendaraan = ({
  change,
  changeTipe,
  changeVarian,
  changeWarna,
  click,
  invalid,
  show,
  propsTipe,
  propsVarian,
  propsWarna,
  selectTipe,
  selectVarian,
  selectWarna,
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
        icon={<Car size={40} color="white" className={BoxIconStyle} />}
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
            Harap memilih Merek, Varian dan Warna mobil!
          </h1>
        ) : null}
        <CardSelect
          name="merek_tipe_mobil"
          title="Merek & Tipe Mobil"
          selected={selectTipe}
          required={true}
          component={propsTipe?.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.model}
              </option>
            );
          })}
          change={changeTipe}
          value={merek_tipe_mobil}
        />
        {/* <FormLine
          bold
          change={change}
          name="merek_tipe_mobil"
          placeholder="Contoh: All New Xenia"
          required={true}
          title="Merek & Tipe Mobil"
          value={merek_tipe_mobil}
        /> */}
        <CardSelect
          name="varian"
          title="Varian"
          selected={selectVarian}
          value={varian}
          required={true}
          change={changeVarian}
          component={propsVarian?.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.nama}
              </option>
            );
          })}
        />
        <CardSelect
          name="warna"
          change={changeWarna}
          selected={selectWarna}
          required={true}
          title="Warna"
          value={warna}
          component={propsWarna?.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.warna}
              </option>
            );
          })}
        />
        {/* <FormLine
            bold
            change={change}
            name="varian"
            placeholder="Contoh: 1.3 M MT"
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
          /> */}
        <div className={BoxForm}>
          <FormLine
            bold
            change={change}
            name="tahun_produksi"
            placeholder="2026"
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
