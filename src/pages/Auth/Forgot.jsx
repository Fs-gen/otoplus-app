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

const Forgot = () => {
  const [no_tlp, setNoTlp] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();

  const postOTP = async (e) => {
    e.preventDefault();
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
        setShowNotif(true);
        setSuccess(true);
        setText(`${response.data.data.message} Mengalihkan otomatis`);
        setTimeout(() => {
          router.replace("/Auth/ResetPassword");
        }, 2000);
      })
      .catch((e) => {
        return null;
      });
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
            <ButtonForm text="Request OTP" click={postOTP} />
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
