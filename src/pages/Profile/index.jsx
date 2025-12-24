import Link from "next/link";
import Header from "./Header";

const ButtonIcon = ({ href, text }) => {
  return (
    <Link href={href} className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <h1>p</h1>
        <p className="font-semibold text-xs">{text}</p>
      </div>
      <span></span>
    </Link>
  );
};

const Profile = () => {
  const BoxItem = "flex flex-col gap-5";
  const TitleBox = "mb-1 font-bold mt-6.5";
  return (
    <section>
      <div className="section-box">
        <Header />
        <div className={BoxItem}>
          <h1 className={TitleBox}>Pengaturan Akun</h1>
          <ButtonIcon text="Profil Saya" href={"/"} />
          <ButtonIcon text="Referral Saya" href={"/"} />
        </div>
        <div className={BoxItem}>
          <h1 className={TitleBox}>Keamanan & Akun</h1>
          <ButtonIcon href={"/"} text="Ganti Password" />
        </div>
        <div className={BoxItem}>
          <h1 className={TitleBox}>Bantuan</h1>
          <ButtonIcon href={"/"} text="Kontak Kami" />
          <ButtonIcon href={"/"} text="Tentang Kami" />
          <ButtonIcon href={"/"} text="Keluar" />
        </div>
      </div>
    </section>
  );
};

export default Profile;
