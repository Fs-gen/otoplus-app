import axios from "axios";
import Logo from "@/assets/images/icons/logo.png";
import Image from "next/image";
import FormLine from "@/components/Form/FormLine";
import Link from "next/link";
import LinkText from "@/components/LinkText";
import { ButtonForm } from "@/components/Button";
import { useState } from "react";
import { AuthStyleBox, LoadingPadding } from "@/styles/style";
import { useRouter } from "next/navigation";
import NotificationBar from "@/components/NotificationBar";
import Cookies from "js-cookie";
import { mainURL } from "../api/api";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const Login = () => {
  const [no_tlp, setNotlp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const router = useRouter();

  console.log(no_tlp);

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
    setLoading(true);
    await axios
      .request(config)
      .then((response) => {
        if (no_tlp.trim() == "" || password.trim() == "") {
          setShowNotif(true);
          setNotification("Harap masukkan akun anda yang telah terdaftar");
          setTimeout(() => {
            setShowNotif(false);
          }, 2000);
        } else if (response.data.status_code == "00") {
          const dataUser = response.data.data.data_user;
          if (dataUser.profile_lengkap != true) {
            setShowNotif(true);
            setSuccess(true);
            setNotification(
              "Selamat Datang!. Silahkan Isi data diri terlebih dahulu.Mengalihkan otomatis"
            );
            Cookies.set("token", response.data.data.token);
            setTimeout(() => {
              router.push("/Profile/profil-saya");
            }, 2000);
          } else {
            setShowNotif(true);
            setNotification("Proses Login Telah Berhasil");
            setSuccess(true);
            Cookies.set("token", response.data.data.token);
            setTimeout(() => {
              router.push("/Home");
            }, 2000);
          }
        } else if (response.data.data.message == "Akun Tidak Ditemukan") {
          setShowNotif(true);
          setNotification(
            `${response.data.data.message}! Jika sudah registrasi namun tidak melakukan verifikasi OTP maka anda harus registrasi ulang`
          );
          setTimeout(() => {
            setShowNotif(false);
          }, 3000);
        } else {
          setShowNotif(true);
          setNotification("Oops, sepertinya data dimasukkan salah");
          setTimeout(() => {
            setShowNotif(false);
          }, 2000);
        }
      })
      .catch(() => {
        setShowNotif(true);
        setNotification("Oops, sepertinya jaringan anda bermasalah");
        setTimeout(() => {
          setShowNotif(false);
        }, 2000);
      });
    return setLoading(false);
  };

  return (
    <section className={AuthStyleBox}>
      <NotificationBar
        text={notification}
        showNotif={showNotif}
        success={success}
      />
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
              {showPassword ? <Eye size={25} /> : <EyeOff size={25} />}
            </button>
          </div>
          <Link
            href={"/Auth/Forgot"}
            className="text-xs font-semibold text-blue-dark"
          >
            Lupa kata sandi?
          </Link>
          <ButtonForm
            text="Login"
            click={onLogin}
            loading={loading}
            padding={loading ? LoadingPadding : null}
          />
        </form>
      </div>
      <LinkText
        href={"/Auth/Register"}
        text="Belum Punya Akun?"
        linkText="Daftar"
      />
    </section>
  );
};

export default Login;
