import CardOrder from "@/components/Card/CardOrder";
import HeaderBack from "@/components/Header/HeaderBack";
import datas from "@/pages/api/dummy.json";
import { ButtonLink } from "@/components/Button";
import Image from "next/image";

const OrderBank = () => {
  return (
    <section>
      <HeaderBack text="Order Detail" />
      <div className="section-box">
        <CardOrder />
        <h1 className="text-sm font-semibold mt-7.5 mb-3.75">
          Metode Pembayaran
        </h1>
        <form className="flex flex-col gap-3.75">
          {datas.bankSelect.map((item, index) => {
            return (
              <div
                className="flex justify-between items-center p-2.5 shadow-lg shadow-gray-200 rounded-sm"
                key={index}
              >
                <div className="flex items-center gap-5">
                  <Image
                    src={item.image}
                    width={50}
                    height={30}
                    alt={item.name}
                  />
                  <label for={item.bank} className="text-sm font-medium">
                    {item.bank}
                  </label>
                </div>
                <input
                  type="radio"
                  id={item.bank}
                  name="bank"
                  className="checked:bg-red-500 indeterminate:bg-red-700"
                />
              </div>
            );
          })}
          <div className="mt-12.5"></div>
          <ButtonLink
            href={"/Detail/order/order-transaksi"}
            text="Proses Transaksi"
          />
        </form>
      </div>
    </section>
  );
};

export default OrderBank;
