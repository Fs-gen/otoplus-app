import Image from "next/image";
import Logo from "@/assets/images/icons/logo.png";
import LinkText from "@/components/LinkText";
import FormLine from "@/components/Form/FormLine";
import { ButtonForm } from "@/components/Button";
import { mainURL } from "../api/api";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NotificationBar from "@/components/NotificationBar";
import { LoadingPadding } from "@/styles/style";

const Forgot = () => {
  const [no_tlp, setNoTlp] = useState("");
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

  const postOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = JSON.stringify({
      no_tlp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("auth/send-otp"),
      headers: {
        "Content-Type": "application-json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        if (no_tlp.trim() == "") {
          TopMessage("Harap isi nomor whatsapp anda!");
        } else if (
          response.data.data.message ==
          "Anda sudah melakukan request Kode OTP, silahkan cek WhatsApp Anda!"
        ) {
          TopMessage(
            `${response.data.data.message}! Mengalihkan Otomatis`,
            setSuccess(true)
          );
          setTimeout(() => {
            router.replace("/Auth/ResetPassword");
          }, 2000);
        } else {
          TopMessage(
            `${response.data.data.message}! Mengalihkan otomatis`,
            setSuccess(true)
          );
          setTimeout(() => {
            router.replace("/Auth/ResetPassword");
          }, 2000);
        }
      })
      .catch((e) => {
        TopMessage("Oops! sepertinya jaringan anda bermasalah");
      });
    return setLoading(false);
  };

  return (
    <section className="section-box min-h-screen flex flex-col justify-between items-center">
      <NotificationBar showNotif={showNotif} text={text} success={success} />
      <span></span>
      <div className="flex flex-col justify-center w-full">
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="Logo"
          className="mx-auto"
        />
        <h1 className="text-sm font-semibold mt-8 mb-9 text-center">
          Lupa Password
        </h1>
        <form action="" method="post">
          <FormLine
            title="No. Whatsapp"
            placeholder="Masukkan No. Whastapp"
            small
            change={(e) => setNoTlp(e.target.value)}
          />
          <div className="text-center mt-12">
            <ButtonForm
              text="Request OTP"
              click={postOTP}
              loading={loading}
              disabled={success}
              padding={loading ? LoadingPadding : null}
            />
          </div>
        </form>
      </div>
      <LinkText
        text="Sudah Ingat Sandi Anda?"
        href={"/Auth/Login"}
        linkText="Login"
      />
    </section>
  );
};

export default Forgot;
