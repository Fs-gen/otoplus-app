import axios from "axios";
import Logo from "@/assets/images/icons/logo.png";
import Image from "next/image";
import FormLine from "@/components/Form/FormLine";
import Link from "next/link";
import LinkText from "@/components/LinkText";
import { ButtonForm } from "@/components/Button";
import { useState } from "react";
import { AuthStyleBox } from "@/styles/style";
import { useRouter } from "next/navigation";
import NotificationBar from "@/components/NotificationBar";
import Cookies from "js-cookie";

//  Image
import Eye from "@/assets/images/icons/system/eye-fill.svg";
import EyeOff from "@/assets/images/icons/system/eye-off-fill.svg";
import { mainURL } from "../api/api";

const Login = () => {
  const [no_tlp, setNotlp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notification, setNotification] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  let data = JSON.stringify({
    no_tlp,
    password,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: mainURL("auth/login"),
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const onLogin = async (e) => {
    e.preventDefault();

    await axios
      .request(config)
      .then((response) => {
        if (response.data.status_code == "00") {
          setShowNotif(true);
          setNotification("Proses Login Telah Berhasil");
          setSuccess(true);
          console.log(response.data.data.token);
          Cookies.set("token", response.data.data.token);
          setTimeout(() => {
            router.push("/Home");
          }, 2000);
          console.log(JSON.stringify(response.data.data.data_user));
        } else {
          setShowNotif(true);
          setNotification("Oops, sepertinya data dimasukkan salah");
          setTimeout(() => {
            setShowNotif(false);
          }, 2000);
          console.log(JSON.stringify(response.data));
        }
      })
      .catch(() => {
        setShowNotif(true);
        setNotification("Oops, sepertinya jaringan anda bermasalah");
        setTimeout(() => {
          setShowNotif(false);
        }, 2000);
      });
  };

  return (
    <section className="relative">
      <NotificationBar
        text={notification}
        showNotif={showNotif}
        success={success}
      />
      <div className={AuthStyleBox}>
        <span></span>
        <div className="section-box">
          <Image
            fetchPriority="high"
            loading="lazy"
            src={Logo}
            width={100}
            height={100}
            alt="Logo"
            className="mx-auto"
          />
          <h1 className="mt-6.25 text-center text-heading-14">
            Masuk ke Otoplus App
          </h1>
          <form action="submit" className="flex flex-col gap-4 mt-7.5 mb-8">
            <FormLine
              placeholder="No Whatsapp"
              type="number"
              value={no_tlp}
              change={(e) => setNotlp(e.target.value)}
            />
            <div className="flex items-center">
              <div className="flex-1">
                <FormLine
                  placeholder="Password"
                  type={!showPassword ? "password" : "text"}
                  value={password}
                  change={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-max px-2"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Image src={EyeOff} width={25} height={25} alt="show" />
                ) : (
                  <Image src={Eye} width={25} height={25} alt="show" />
                )}
              </button>
            </div>
            <Link
              href={"/Auth/Forgot"}
              className="text-xs font-semibold text-blue-dark"
            >
              Lupa kata sandi?
            </Link>
            <ButtonForm text="Login" click={onLogin} />
          </form>
        </div>
        <LinkText
          href={"/Auth/Register"}
          text="Belum Punya Akun?"
          linkText="Daftar"
        />
      </div>
    </section>
  );
};

export default Login;
