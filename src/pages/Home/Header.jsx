const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

// Image
import Avatar from "@/assets/images/icons/logo.png";
import { highlightSkeleton } from "@/styles/style";
import { Bell } from "lucide-react";
import Skeleton from "react-loading-skeleton";

const Header = ({ props }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link href={"/Profile"}>
          <Image src={Avatar} width={34} height={34} alt="User Photo" />
        </Link>
        <div>
          <h2 className="text-sm text-gray-semi">Selamat Datang</h2>
          {props && props.nama == null ? (
            <Skeleton
              count={1}
              width={100}
              height={15}
              highlightColor={highlightSkeleton}
            />
          ) : (
            <h1 className="text-sm text-gray-dark font-bold">{props?.nama}</h1>
          )}
        </div>
      </div>
      <Link href={"/Notification"} className="relative">
        <Bell size={25} strokeWidth={2} />
        {props && props?.notifikasi != 0 ? (
          <h1 className="min-w-4 text-xs text-center font-semibold text-white -top-1 -right-1 absolute bg-blue-semi rounded-full">
            {props?.notifikasi}
          </h1>
        ) : null}
        {/* <Image
          src={NotificationBadge}
          width={25}
          height={25}
          alt="Notification"
        /> */}
      </Link>
    </div>
  );
};

export default Header;
