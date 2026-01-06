import Logo from "@/assets/images/icons/logo.png";
import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import LinkText from "@/components/LinkText";
import { AuthStyleBox } from "@/styles/style";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationBar from "@/components/NotificationBar";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const Register = () => {
  const [area, setArea] = useState("");
  const [no_tlp, setNoTlp] = useState("");
  const [password, setPassword] = useState("");
  const [kode_referral, setKodeReferral] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notification, setNotification] = useState("");
  const [success, setSuccess] = useState(false);
  const referral = Cookies.get("referral");

  const router = useRouter();

  const notifReferral = () => {
    if (referral) {
      setShowNotif(true);
      setNotification("Kode Referral Berhasil Digunakan!");
      setSuccess(true);
      setTimeout(() => {
        setShowNotif(false);
        setTimeout(() => {
          setSuccess(false);
        }, 3200);
      }, 3000);
    }
  };

  const data = JSON.stringify({
    no_tlp,
    password,
    area,
    kode_referral: referral || kode_referral,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.otoplusid.com/auth/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .request(config)
      .then((response) => {
        if (response.data.status_code == "00") {
          setShowNotif(true);
          setNotification("Registrasi Selesai, Silahkan Verifikasi OTP");
          setSuccess(true);
          Cookies.set("no_tlp", no_tlp);
          setTimeout(() => {
            router.push("/Auth/otp/otp-register");
          }, 2000);
        } else {
          setShowNotif(true);
          setNotification(response.data.data.message);
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
  };

  useEffect(() => {
    notifReferral();
  }, []);

  return (
    <section className={AuthStyleBox}>
      <NotificationBar
        showNotif={showNotif}
        success={success}
        text={notification}
      />
      <span></span>
      <div className="section-box">
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="Logo"
          priority
          className="mx-auto"
        />
        <h1 className="text-heading-14 text-center my-8">
          Daftar Akun OtoPlus
        </h1>
        <form action="" method="post" className="flex flex-col gap-5">
          <FormLine
            title="No. Whatsapp"
            value={no_tlp}
            change={(e) => setNoTlp(e.target.value)}
            required={true}
            type="number"
          />
          <div className="flex items-center">
            <div className="flex-1">
              <FormLine
                title="Password"
                type={!showPassword ? "password" : "text"}
                value={password}
                change={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-max mt-5 px-2"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={25} /> : <EyeOff size={25} />}
            </button>
          </div>
          <div>
            <label for="area" className="text-xs mb-1.25">
              Pilih Wilayah
            </label>
            <select
              name="area"
              id="area"
              className="p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-sm rounded-xl border border-gray-light"
              onChange={(e) => setArea(e.target.value)}
              required
            >
              <option value="">Pilih Kota</option>
              <option value="makassar" id="area">
                Makassar
              </option>
              <option value="jakarta" id="area">
                Jakarta
              </option>
            </select>
          </div>
          <FormLine
            title="Kode Referral (Optional)"
            value={referral ?? ""}
            readOnly={
              referral && referral != null && kode_referral == "" ? true : false
            }
            change={(e) => setKodeReferral(e.target.value)}
          />
          <ButtonForm type="submit" click={onSubmit} text="Daftar" />
        </form>
      </div>
      <LinkText
        href={"/Auth/Login"}
        text="Sudah Punya Akun?"
        linkText="Login"
      />
    </section>
  );
};

export default Register;
