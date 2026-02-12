// Image
import AltArrowRight from "@/assets/images/icons/arrow/alt-arrow-right.svg";
import UserID from "@/assets/images/icons/people/user-id.svg";
import Referral from "@/assets/images/icons/people/referral.svg";
import Call from "@/assets/images/icons/system/call.svg";
import Password from "@/assets/images/icons/system/password.svg";
import BankNote from "@/assets/images/icons/shopping/bank-note.svg";

import Link from "next/link";
import HeaderUser from "../../components/Card/CardUser";
import Cookies from "js-cookie";
import LogOut from "@/assets/images/icons/system/logout.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserProfile, mainURL } from "../api/api";
import NotificationBar from "@/components/NotificationBar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import axios from "axios";

const token = Cookies.get("token");
const disabledButton = (e) => {
  e.preventDefault();
};

const ButtonIcon = ({ href, icon, text }) => {
  return (
    <Link
      href={href}
      className="flex justify-between items-center"
      onClick={!token ? disabledButton : null}
    >
      <div className="flex items-center gap-1">
        <Image src={icon} width={25} height={25} alt="" />
        <p className={`font-semibold text-xs`}>{text}</p>
      </div>
      <Image src={AltArrowRight} width={24} height={24} alt="" />
    </Link>
  );
};

const Profile = () => {
  const [user, setUser] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();
  const BoxItem = "flex flex-col gap-5";
  const TitleBox = "mb-1 font-bold mt-6.5";

  const TopMessage = (text, success) => {
    setShowNotif(true);
    setText(text);
    {
      success;
    }
    setTimeout(() => {
      setShowNotif(false);
    }, 3000);
  };

  const getData = async () => {
    const res = await getUserProfile();
    setUser(res);
    if (res?.message == "Unauthorized" || !token) {
      TopMessage(
        "Silahkan Login Terlebih Dahulu. Mengalihkan ke halaman login!",
      );
      Cookies.remove("token");
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } else {
      return;
    }
  };

  const postLogOut = async (e) => {
    e.preventDefault();
    const header = Cookies.get("token");
    let data = "";

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("auth/logout"),
      headers: {
        Authorization: "Bearer " + header,
      },
      data: data,
    };

    await axios
      .request(config)
      .then(() => {
        Cookies.remove("token");
        router.replace("/");
      })
      .catch(() => {
        return null;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <NotificationBar showNotif={showNotif} text={text} />
      <div className="section-box">
        <HeaderUser props={user} />
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
          <ButtonIcon
            href={"/Profile/bank-saya"}
            icon={BankNote}
            text="Bank Saya"
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
          <button
            type="button"
            className="flex justify-between items-center"
            onClick={!token ? disabledButton : postLogOut}
          >
            <div className="flex items-center gap-1">
              <Image src={LogOut} width={25} height={25} alt="" />
              <p
                className="font-semibold text-xs 
                  text-red-semi"
              >
                Keluar
              </p>
            </div>
          </button>
        </div>
      </div>
      <Navbar />
    </section>
  );
};

export default Profile;
