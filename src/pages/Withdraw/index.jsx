import Button from "@/components/Button";
import Form from "@/components/Form";
import HeaderBack from "@/components/Header/HeaderBack";
import Link from "next/link";

const Withdraw = () => {
  return (
    <section>
      <Link href={"/"}>Home</Link>
      <HeaderBack text="Withdraw" />
      <div className="section-box">
        <div className="flex items-center gap-2 mt-6.5 mb-7.5">
          <h1 className="p-3.5 rounded-full bg-gray-light">Rp</h1>
          <div>
            <h1 className="text-sm font-semibold">Jumlah Reward</h1>
            <p className="text-sm">Rp. 3.000.000</p>
          </div>
        </div>
        <form action="" method="post" className="flex flex-col gap-3.75">
          <div>
            <Form title="Jumlah Withdraw" small />
            <p className="text-[10px] text-text-gray mt-1">
              Minimal Withdraw Rp. 50.000
            </p>
          </div>
          <Form title="Nama Bank" small />
          <Form title="No. Rekening" small />
          <Form title="Nama Pemilik Rekening" small />
          <div className="mt-5 mx-auto">
            <Button type="submit" text="Withdraw" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Withdraw;
