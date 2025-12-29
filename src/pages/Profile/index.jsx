import Link from "next/link";
import HeaderUser from "../../components/Card/CardUser";
import DataUser from "@/pages/api/dummy.json";

// Image
import AltArrowRight from "@/assets/images/icons/arrow/alt-arrow-right.svg";
import UserID from "@/assets/images/icons/people/user-id.svg";
import Referral from "@/assets/images/icons/people/referral.svg";
import Call from "@/assets/images/icons/system/call.svg";
import Password from "@/assets/images/icons/system/password.svg";
import LogOut from "@/assets/images/icons/system/logout.svg";
import Image from "next/image";

const ButtonIcon = ({ href, icon, logout, text }) => {
  return (
    <Link href={href} className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <Image src={icon} width={25} height={25} alt="" />
        <p className={`font-semibold text-xs ${logout ? "text-red-semi" : ""}`}>
          {text}
        </p>
      </div>
      {logout ? (
        <span></span>
      ) : (
        <Image src={AltArrowRight} width={24} height={24} alt="" />
      )}
    </Link>
  );
};

const Profile = () => {
  const BoxItem = "flex flex-col gap-5";
  const TitleBox = "mb-1 font-bold mt-6.5";
  return (
    <section>
      <div className="section-box">
        <HeaderUser props={DataUser.user} />
        <div className={BoxItem}>
          <h1 className={TitleBox}>Pengaturan Akun</h1>
          <ButtonIcon
            text="Profil Saya"
            href={"/Profile/profil-saya"}
            icon={UserID}
          />
          <ButtonIcon
            text="Referral Saya"
            href={"/Profile/referral"}
            icon={Referral}
          />
        </div>
        <div className={BoxItem}>
          <h1 className={TitleBox}>Keamanan & Akun</h1>
          <ButtonIcon
            href={"/Profile/ganti-password"}
            text="Ganti Password"
            icon={Password}
          />
        </div>
        <div className={BoxItem}>
          <h1 className={TitleBox}>Bantuan</h1>
          <ButtonIcon href={"/"} text="Kontak Kami" icon={Call} />
          <ButtonIcon href={"/"} text="Tentang Kami" icon={Referral} />
          <ButtonIcon href={"/"} text="Keluar" icon={LogOut} logout />
        </div>
      </div>
    </section>
  );
};

export default Profile;
