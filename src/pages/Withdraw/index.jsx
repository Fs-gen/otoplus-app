// Image
import Rupiah from "@/assets/images/icons/shopping/rupiah-line.svg";

import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import { getBankUser, mainURL, postOTPWithdraw } from "../api/api";
import { useEffect, useState } from "react";
import NotificationBar from "@/components/NotificationBar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { LoadingPadding } from "@/styles/style";
import Image from "next/image";

const Withdraw = () => {
  const [user, setUser] = useState([]);
  const [minimal, setMinimal] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [otp, setOTP] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [messageOTP, setMessageOTP] = useState("");
  const [text, setText] = useState("");
  const token = Cookies.get("token");
  const router = useRouter();

  console.log(minimal);

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

  const fetchData = async () => {
    const res = await getBankUser();
    setUser(res);
    if (res.message == "Data Bank Tidak Ditemukan") {
      setShowNotif(true);
      setText(
        "Data Bank Tidak Ditemukan! Harap Isi data bank anda. Mengalihkan otomatis"
      );
      setTimeout(() => {
        router.replace("/Profile/bank-saya");
      }, 3000);
    }
  };

  const getMinimumWithdrawl = async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: mainURL("withdraw/get-minimal-withdraw"),
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        setMinimal(response?.data?.data?.min_withdraw);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoadingOTP(true);
    const res = await postOTPWithdraw();
    setMessageOTP(res);
    if (messageOTP?.status_code == "00") {
      TopMessage(messageOTP?.data?.message, setSuccess(true));
    } else {
      TopMessage(messageOTP?.data?.message, setSuccess(false));
    }
    setLoadingOTP(false);
  };

  const postWithdrawl = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = JSON.stringify({
      jumlah,
      otp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("withdraw/request"),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        if (response?.data?.status_code != "00") {
          TopMessage(
            "Anda sudah melakukan request Kode OTP, silahkan cek WhatsApp Anda",
            setSuccess(false)
          );
        } else {
          TopMessage(response?.data?.data?.message, setSuccess(true));
        }
      })
      .catch((e) => {
        TopMessage(response?.data?.data?.message);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    getMinimumWithdrawl();
  }, []);

  return (
    <section>
      <NotificationBar showNotif={showNotif} success={success} text={text} />
      <HeaderBack text="Withdraw" link="Histori" href={"/History/withdraw"} />
      <div className="section-box">
        <div className="flex items-center gap-2 mt-6.5 mb-7.5">
          <div className="rounded-full bg-gray-light p-3.5">
            <Image src={Rupiah} width={25} height={25} alt="" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Jumlah Reward</h1>
            <p className="text-sm font-medium">Rp. 3.000.000</p>
          </div>
        </div>
        <form action="" method="post" className="flex flex-col gap-3.75">
          <div>
            <FormLine
              type="text"
              title="Jumlah Withdraw"
              small
              value={jumlah}
              change={(e) => setJumlah(e.target.value)}
            />
            <p className="text-[10px] text-text-gray font-semibold mt-1">
              Minimal Withdraw Rp{" "}
              {new Intl.NumberFormat("de-De").format(minimal)}
            </p>
          </div>
          <FormLine
            title="Nama Bank"
            small
            readOnly={true}
            value={user.nama_bank}
          />
          <FormLine
            title="No. Rekening"
            small
            readOnly={true}
            value={user.rekening}
          />
          <FormLine
            title="Nama Pemilik Rekening"
            small
            readOnly={true}
            value={user.atas_nama}
          />
          <div className="flex gap-7 items-center">
            <div className="flex-3">
              <FormLine
                small
                type="number"
                title="Kode OTP"
                value={otp}
                change={(e) => setOTP(e.target.value)}
              />
            </div>
            <ButtonForm
              text="Request OTP"
              click={sendOTP}
              loading={loadingOTP}
              padding={loadingOTP ? `p-2 mt-5` : "py-2 px-4 mt-6"}
            />
          </div>
          <div className="mt-5 mx-auto">
            <ButtonForm
              text="Withdraw"
              loading={loading}
              padding={loading ? LoadingPadding : null}
              click={postWithdrawl}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Withdraw;
