import Avatar from "@/assets/images/icons/logo.png";
import BoxItem from "@/components/Box";
import CardBig from "@/components/Card/CardBig";
import CardNews from "@/components/Card/CardNews";
import Image from "next/image";
import Link from "next/link";
import dataDummy from "@/pages/api/dummy.json";
import GroupStroke from "@/assets/images/illustration/group-stroke.png";
import CardPerson from "@/assets/images/illustration/car-person.png";

const Home = () => {
  return (
    <section>
      <div className="section-box">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link href={"/Profile"}>
              <Image src={Avatar} width={34} height={34} alt="User Photo" />
            </Link>
            <div>
              <h2 className="text-sm text-gray-semi">Selamat Datang</h2>
              <h1 className="text-sm text-gray-dark font-bold">Rezki</h1>
            </div>
          </div>
          <h1>Notif</h1>
        </div>
        {/* Header */}

        <div>
          <Link href={"/auth/Login"}>Login</Link>
          <Link href={"/auth/Register"}>Register</Link>
        </div>

        {/* Amount */}
        <div className="bg-blue-semi rounded-[10px] p-4.5 text-white mt-8.75">
          <h1 className="text-sm font-medium">Rewards</h1>
          <h1 className="text-[16px] font-semibold">
            Rp <span className="font-semibold text-2xl">23,233,323</span>
          </h1>
          <div className="flex justify-between items-center mt-3.75">
            <div className="flex gap-8">
              <div>
                <p className="text-[7px] font-medium">Referrals</p>
                <p className="text-sm font-semibold text-yellow-semi">
                  10,1 rb
                </p>
              </div>
              <div>
                <p className="text-[7px] font-medium">Penjualan</p>
                <p className="text-sm font-semibold text-yellow-semi">1 rb</p>
              </div>
            </div>
            <Link
              href={"/Withdraw"}
              className="text-sm font-semibold text-blue-dark  rounded bg-white p-1.75 shadow-lg shadow-black/30"
            >
              Withdraw
            </Link>
          </div>
        </div>
        {/* Amount */}

        <div className="mt-8"></div>

        {/* Button Big */}
        <CardBig
          title="Input Penjualan"
          desc="Input penjualan, Setelah disetujui dapatkan reward"
          src={CardPerson}
          href={"/history/transaksi"}
        />
        <CardBig
          title="Upgrade ke Ages Plus"
          desc="Dapatkan Fasilitas dan Voucher Lebih Banyak!"
          src={GroupStroke}
          href={"/history/reward"}
        />
        {/* Button Big */}

        {/* BoxItem */}
        {/* News */}
        <BoxItem
          text="News"
          isMore
          href={"/"}
          components={<CardNews href={"/"} props={dataDummy} />}
        />
        {/* News */}
        {/* BoxItem */}
      </div>
    </section>
  );
};
export default Home;
