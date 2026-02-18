import { highlightSkeleton } from "@/styles/style";
import { CircleArrowDown, User2Icon } from "lucide-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import Cookies from "js-cookie";

const Amount = ({ props }) => {
  return (
    <div className="bg-blue-semi rounded-[10px] p-4.5 text-white mt-8.75">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-sm font-medium">Rewards</h1>
        <div className="flex items-center gap-1">
          <User2Icon size={20} />
          <p className="text-xs font-medium uppercase">{props?.type_akun}</p>
        </div>
      </div>
      <h1 className="text-[16px] font-semibold">
        Rp{" "}
        <span className="font-semibold text-2xl">
          {props && props?.reward == null ? (
            <Skeleton
              count={1}
              height={20}
              width={150}
              highlightColor={highlightSkeleton}
            />
          ) : (
            new Intl.NumberFormat("de-De").format(props?.reward)
          )}
        </span>
      </h1>
      <div className="flex justify-between items-center mt-3.75">
        <div className="flex gap-8">
          <Link href={"/Profile/referral"}>
            <p className="text-[10px] font-medium">Referrals</p>
            <p className="text-sm font-semibold text-yellow-semi">
              {props && props?.total_referral == null ? (
                <Skeleton count={1} highlightColor={highlightSkeleton} />
              ) : (
                props?.total_referral
              )}
            </p>
          </Link>
          <Link href={"/History/input-jual"}>
            <p className="text-[10px] font-medium">Penjualan</p>
            <p className="text-sm font-semibold text-yellow-semi">
              {props && props?.total_penjualan == null ? (
                <Skeleton count={1} highlightColor={highlightSkeleton} />
              ) : (
                props?.total_penjualan
              )}
            </p>
          </Link>
        </div>
        <Link
          href={"/Withdraw"}
          onClick={() => Cookies.set("reward", props?.reward)}
          className="text-sm flex gap-1 items-center font-semibold text-blue-dark rounded bg-white p-1.75 shadow-lg shadow-black/30"
        >
          <CircleArrowDown size={20} />
          Withdraw
        </Link>
      </div>
    </div>
  );
};

export default Amount;
