const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

// Image
import Avatar from "@/assets/images/icons/logo.png";
import NotificationBadge from "@/assets/images/icons/system/notification-badge.svg";

const Header = () => {
  return (
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
      <Link href={"/"}>
        <Image
          src={NotificationBadge}
          width={25}
          height={25}
          alt="Notification"
        />
      </Link>
    </div>
  );
};

export default Header;
