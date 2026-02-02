import Logo from "@/assets/images/icons/logo.png";
import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import LinkText from "@/components/LinkText";
import { AuthStyleBox, LoadingPadding } from "@/styles/style";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationBar from "@/components/NotificationBar";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { getAgreement } from "../api/api";

const Register = () => {
  const [area, setArea] = useState("");
  const [agreement, setAgreement] = useState([]);
  const [agree, setAgree] = useState("");
  const [no_tlp, setNoTlp] = useState("");
  const [password, setPassword] = useState("");
  const [kode_referral, setKodeReferral] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const referral = Cookies.get("referral");

  const router = useRouter();

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

  const fetchAgreement = async () => {
    const res = await getAgreement();
    setAgreement(res);
  };

  const notifReferral = () => {
    if (referral) {
      setIsReadOnly(true);
      TopMessage("Kode Referral Berhasil Digunakan!", setSuccess(true));
      setTimeout(() => {
        setSuccess(false);
      }, 3200);
    }
  };

  const onRegister = (e) => {
    e.preventDefault();
    if (no_tlp.trim() == "" || password.trim() == "") {
      TopMessage("Harap Isi Kolom dibawah ini!");
    } else if (no_tlp.length < 8) {
      TopMessage("Harap masukkan nomor telepon minimal 8 digit!");
    } else if (password.length < 6) {
      TopMessage("Harap masukkan password minimal 6 karakter!");
    } else {
      setShowPop(!showPop);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = JSON.stringify({
      no_tlp,
      password,
      area,
      kode_referral: referral || kode_referral,
      agreement: "Y",
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

    await axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (response.data.status_code != "00") {
          console.log(response);
          TopMessage(response?.data?.data?.message);
        } else {
          TopMessage(
            "Registrasi Selesai, Silahkan Verifikasi OTP",
            setSuccess(true),
          );
          Cookies.set("no_tlp", no_tlp);
          setTimeout(() => {
            router.push("/Auth/otp/otp-register");
          }, 2000);
        }
      })
      .catch((e) => {
        console.log(e);
        TopMessage("Oops!, sepertinya jaringan anda bermasalah");
      });
    setShowPop(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchAgreement();
    notifReferral();
  }, []);

  return (
    <section className={`${AuthStyleBox} relative`}>
      <div
        className={`min-h-dvh w-full absolute ${showPop ? "bg-black/45 block" : "hidden"}`}
      ></div>
      <div
        className={`${showPop ? "bottom-0" : "-bottom-100"} transition-all duration-300 mt-0 fixed rounded-t-xl p-6 max-w-125 bg-white z-10`}
      >
        <h1 className="text-2xl font-semibold mb-4">Ketentuan Layanan Kami</h1>
        <div
          dangerouslySetInnerHTML={{ __html: agreement?.description }}
          className="max-h-52 overflow-y-scroll p-4 bg-gray-200 rounded-xl"
        ></div>
        <div className="flex justify-between text-center gap-2 items-center text-sm font-medium mt-6">
          <button
            className={`${loading ? "invisible w-0 p-0" : "w-1/2 p-2 border-2 border-blue-dark"} rounded-full`}
            onClick={() => setShowPop(!showPop)}
          >
            Tidak Setuju
          </button>
          <button
            className={`${loading ? "w-full" : "w-1/2"} p-2 border-2 border-blue-dark rounded-full bg-blue-dark text-white transition-all duration-300`}
            onClick={onSubmit}
          >
            {loading ? <div className="spinner-small"></div> : "Setuju"}
          </button>
        </div>
      </div>
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
            title="No Whatsapp"
            type="text"
            inputmode="numeric"
            keyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
            value={no_tlp}
            change={(e) => setNoTlp(e.target.value.replace(/[^0-9]/g, ""))}
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
          {/* <div>
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
          </div> */}
          <FormLine
            title="Kode Referral"
            value={referral}
            readOnly={isReadOnly}
            change={(e) => setKodeReferral(e.target.value)}
          />
          <ButtonForm
            click={onRegister}
            text="Daftar"
            loading={loading}
            disabled={success}
            style={loading ? LoadingPadding : null}
          />
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
