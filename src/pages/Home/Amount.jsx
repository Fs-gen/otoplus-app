import Link from "next/link";

const Amount = () => {
  return (
    <div className="bg-blue-semi rounded-[10px] p-4.5 text-white mt-8.75">
      <h1 className="text-sm font-medium">Rewards</h1>
      <h1 className="text-[16px] font-semibold">
        Rp <span className="font-semibold text-2xl">23,233,323</span>
      </h1>
      <div className="flex justify-between items-center mt-3.75">
        <div className="flex gap-8">
          <div>
            <p className="text-[7px] font-medium">Referrals</p>
            <p className="text-sm font-semibold text-yellow-semi">10,1 rb</p>
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
  );
};

export default Amount;
