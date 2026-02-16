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
import { X } from "lucide-react";

const Login = ({ show, hide }) => {
  const [no_tlp, setNotlp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

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

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .request(config)
      .then((response) => {
        if (no_tlp.trim() == "" || password.trim() == "") {
          TopMessage("Harap masukkan akun anda yang telah terdaftar");
        } else if (response.data.status_code == "00") {
          const dataUser = response.data.data.data_user;
          if (dataUser.profile_lengkap != true) {
            TopMessage(
              "Selamat Datang! Silahkan Isi data diri terlebih dahulu.Mengalihkan otomatis",
              setSuccess(true),
            );
            Cookies.set("token", response.data.data.token);
            setTimeout(() => {
              router.push("/Profile/profil-saya");
            }, 2000);
          } else {
            setSuccess(true);
            Cookies.set("token", response.data.data.token);
            router.push("/Home");
          }
        } else if (response.data.data.message == "Akun Tidak Ditemukan") {
          TopMessage(
            `${response.data.data.message}! Jika sudah registrasi namun tidak melakukan verifikasi OTP maka anda harus registrasi ulang`,
          );
        } else {
          TopMessage("Oops! sepertinya data dimasukkan salah");
        }
      })
      .catch(() => {
        TopMessage("Oops! sepertinya jaringan anda bermasalah");
      });
    return setLoading(false);
  };

  return (
    <section
      className={`fixed bg-white ${show ? "bottom-0" : "-bottom-120"} left-0 right-0 z-50 mx-auto max-w-125 transition-all duration-300 rounded-t-xl section-box`}
    >
      <NotificationBar
        text={notification}
        showNotif={showNotif}
        success={success}
      />
      <div className="flex justify-between items-center">
        <h1 className="text-center text-lg text-heading-14">
          Masuk ke OtoplusID App
        </h1>
        <button onClick={hide}>
          <X size={25} color="black" />
        </button>
      </div>
      <form action="submit" className="flex flex-col gap-4 my-4">
        <FormLine
          placeholder="No Whatsapp"
          type="text"
          inputmode="numeric"
          keyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
          value={no_tlp}
          change={(e) => setNotlp(e.target.value.replace(/[^0-9]/g, ""))}
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
            // onClick={() => setShowPassword(!showPassword)}
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
          disabled={success}
          style={loading ? LoadingPadding : null}
        />
      </form>
      <h1 className="text-sm text-center">
        Belum Punya Akun?
        <Link href={"/Auth/Register"} className="ml-1 font-bold text-blue-semi">
          Daftar disini
        </Link>
      </h1>
    </section>
  );
};

export default Login;
