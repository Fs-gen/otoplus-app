import Image from "next/image";
import ProfileUser from "@/assets/images/icons/logo.png";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";

const HeaderUser = ({ props }) => {
  return (
    <div className="flex items-center gap-2.5 px-3.75 pt-2.5 pb-2.5">
      <Image src={ProfileUser} alt="User Profile" width={50} height={50} />
      {props && props?.nama == null ? (
        <Skeleton count={2} highlightColor={highlightSkeleton} width={100} height={15}/>
      ) : (
        <div>
          <h1 className="font-bold">{props?.nama}</h1>
          <p className="text-sm text-text-gray capitalize">{props?.type}</p>
        </div>
      )}
    </div>
  );
};

export default HeaderUser;
