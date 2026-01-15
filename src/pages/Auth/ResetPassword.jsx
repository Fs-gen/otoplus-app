import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import NotificationBar from "@/components/NotificationBar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "@/assets/images/icons/logo.png";
import { mainURL } from "../api/api";
import axios from "axios";
import { LoadingPadding } from "@/styles/style";

const ResetPassword = () => {
  const [otp, SetOTP] = useState("");
  const [password, setPassword] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();

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

  const postUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = JSON.stringify({
      password,
      otp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("auth/update-password"),
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        if (otp.trim() == "" || password.trim() == "") {
          TopMessage("Harap isi semua kolom yang ada!");
        } else if (response.data.status_code == "00") {
          TopMessage(
            `${response.data.data.message}! Mengalihkan otomatis halaman login`,
            setSuccess(true)
          );
          setTimeout(() => {
            router.replace("/Auth/Login");
          }, 3000);
        } else {
          TopMessage(
            `${response.data.data.message}! Pastikan kode OTP sudah benar atau tidak memasukkan password yang sama`
          );
        }
      })
      .catch(() => {
        TopMessage("Oops! sepertinya jaringan anda bermasalah");
      });
    return setLoading(false);
  };

  return (
    <section className="section-box min-h-dvh flex center items-center">
      <NotificationBar showNotif={showNotif} text={text} success={success} />
      <div className="flex flex-col justify-center w-full">
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="Logo"
          className="mx-auto"
        />
        <h1 className="text-sm font-semibold mt-8 mb-9 text-center">
          Buat Password Baru
        </h1>
        <form action="" method="post" className="flex flex-col gap-4">
          <FormLine
            title="Kode OTP"
            placeholder="Masukkan Kode OTP"
            small
            change={(e) => SetOTP(e.target.value)}
          />
          <FormLine
            small
            title="Password Baru"
            placeholder="Masukkan Password baru"
            change={(e) => setPassword(e.target.value)}
          />
          <div className="text-center mt-8">
            <ButtonForm
              text="Ganti Password"
              click={postUpdate}
              loading={loading}
              padding={loading ? LoadingPadding : null}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
