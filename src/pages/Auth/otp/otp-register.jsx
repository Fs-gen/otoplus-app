import OTPIcon from "@/assets/images/icons/otp.png";
import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import NotificationBar from "@/components/NotificationBar";
import { LoadingPadding } from "@/styles/style";

const OTPRegister = () => {
  const [otp, setOTP] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const router = useRouter();

  const noWhatsapp = Cookies.get("no_tlp");

  const TopMessage = (text, success) => {
    setShowNotif(true);
    setNotification(text);
    {
      success;
    }
    setTimeout(() => {
      setShowNotif(false);
    }, 3000);
  };

  const data = JSON.stringify({
    no_tlp: noWhatsapp,
    otp,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.otoplusid.com/auth/verifikasi-registrasi",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const onOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .request(config)
      .then((response) => {
        if (otp.trim() == "") {
          TopMessage(
            "Harap masukkan Kode OTP anda yang telah dikirimkan melalui whatsapp!",
          );
        } else if (response.data.status_code == "00") {
          TopMessage(
            "Registrasi Selesai, Mengalihkan ke halaman login",
            setSuccess(true),
          );
          Cookies.remove("no_tlp");
          Cookies.remove("referral");
          setTimeout(() => {
            router.push("/Auth/Login");
          }, 2000);
        } else {
          TopMessage("Kode OTP Salah! Periksa kembali kode OTP");
        }
      })
      .catch(() => {
        TopMessage("Oops! sepertinya jaringan anda bermasalah");
      });
    return setLoading(false);
  };

  return (
    <section>
      <HeaderBack
        text="Verifikasi OTP"
        click={() => router.push("/Auth/Register")}
      />
      <NotificationBar
        showNotif={showNotif}
        success={success}
        text={notification}
      />
      <div className="section-box text-center flex flex-col gap-4 items-center">
        <Image src={OTPIcon} width={85} height={40} alt="OTP Icon" />
        <h1 className="text-xl font-semibold">Verifikasi OTP</h1>
        <p className="text-xs">
          Masukkan kode OTP yang telah dikirimkan ke whatsapp anda
        </p>
        <form action="" method="post" className="w-full">
          <FormLine
            placeholder="Masukkan kode OTP"
            value={otp}
            change={(e) => setOTP(e.target.value)}
          />
          <div className="mt-4.5 ">
            <ButtonForm
              text="Verifikasi"
              click={onOTP}
              loading={loading}
              padding={loading ? LoadingPadding : null}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default OTPRegister;
