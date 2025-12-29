import { ButtonLink } from "@/components/Button";
import CardOrder from "@/components/Card/CardOrder";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OrderTransaksi = () => {
  const [pending, isPending] = useState(true);
  const [success, setSuccess] = useState(false);
  const textGray = "text-xs";

  const Transfer = () => {
    return (
      <div className="shadow-lg shadow-gray-200 rounded-lg">
        <h1 className="text-sm font-medium mb-2.5">Silahkan Transfer Ke</h1>
        <div className="py-5 px-2.5">
          <div className="flex gap-1.5 mb-3.5">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLS8vCZ_lodKBB4_C6joK1BKotERMS27GPUg&s"
              width={50}
              height={50}
              alt=""
              className="bg-gray-light p-1 rounded-sm w-max"
            />
            <div>
              <h1 className={textGray}>Bank Rakyat Indonesia</h1>
              <p className={textGray}>PT OTOPLUSID</p>
            </div>
          </div>
          <FormLine readOnly value="12345123189309173" white />
          <h1 className="text-xs mt-4.5 mb-2.5">Jumlah Transfer</h1>
          <FormLine readOnly value="Rp.3.850.180" white />
          <p className="text-[8px] mt-1 ml-2">
            Pastikan jumlahnya sama dengan 3 digit terakhir
          </p>
        </div>
      </div>
    );
  };

  return (
    <section>
      <HeaderBack text="Detail Transaksi" />
      <div className="section-box">
        {pending == true ? <Transfer /> : null}
        <h1 className="my-3 text-sm font-medium">Detail Transaksi</h1>
        <CardOrder
          color={
            pending == true
              ? "text-yellow-semi"
              : pending == false && success == false
              ? "text-blue-semi"
              : "text-green-semi"
          }
          status={
            pending == true
              ? "Pending"
              : pending == false && success == false
              ? "Menunggu Konfirmasi"
              : "Sukses"
          }
        />
        {pending == true ? (
          <div className="text-xs text-center mt-10 mb-24">
            <h1 className="font-medium">Transfer Sebelum</h1>
            <h1 className="font-semibold mb-3.75">25 Maret 2023 16.00 WITA</h1>
            <Link href={"/"} className="text-red-semi text-xs font-bold">
              Batalkan Transaksi
            </Link>
          </div>
        ) : null}
        <div className="text-center">
          {pending == true ? (
            <ButtonLink text="Upload Bukti Transfer" href={"/"} />
          ) : pending == false && success == false ? null : (
            <div className="mt-12">
              <ButtonLink href={"/"} text="Lihat Virtual ID Card" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderTransaksi;
