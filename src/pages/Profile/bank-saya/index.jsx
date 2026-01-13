import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import { getBankUser, mainURL, postOTPBank } from "@/pages/api/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationBar from "@/components/NotificationBar";
import FormOption from "@/components/Form/FormOption";
import data from "@/pages/api/static/bank-name.json";
import { LoadingPadding } from "@/styles/style";

const { default: HeaderBack } = require("@/components/Header/HeaderBack");

const BankSaya = () => {
  const [user, setUser] = useState([]);
  const [namaBank, setNamaBank] = useState("");
  const [noRek, setNoRek] = useState("");
  const [atasNama, setAtasNama] = useState("");
  const [otp, setOTP] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [messageOTP, setMessageOTP] = useState("");
  const [text, setText] = useState("");

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

  console.log(user);

  const fetchBank = async () => {
    const res = await getBankUser();
    setUser(res);
    setNoRek(res?.rekening);
    setAtasNama(res?.atas_nama);
    setNamaBank(res?.nama_bank);
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoadingOTP(true);
    const res = await postOTPBank();
    setMessageOTP(res);
    if (messageOTP == "00") {
      TopMessage(messageOTP?.data?.message, setSuccess(true));
    } else {
      TopMessage(messageOTP?.data?.message, setSuccess(false));
    }
    setLoadingOTP(false);
  };

  const postUpdateBankData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookies.get("token");
    let data = JSON.stringify({
      rekening: noRek,
      nama_bank: namaBank,
      atas_nama: atasNama,
      otp: otp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("profile/update-bank"),
      headers: {
        "Content-Type": "application-json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        if (
          namaBank.trim() == "" ||
          noRek.trim() == "" ||
          atasNama.trim() == ""
        ) {
          TopMessage("Harap isi semua kolom yang ada!", setSuccess(false));
        } else if (otp.trim() == "") {
          TopMessage("Masukkan Kode OTP Anda!");
        } else if (response.data.status_code == "04") {
          TopMessage(response.data.data.message, setSuccess(false));
        } else {
          TopMessage(response.data.data.message, setSuccess(true));
          setTimeout(() => {
            setSuccess(false);
          }, 3500);
        }
      })
      .catch((e) => {
        TopMessage(e);
      });
    return setLoading(false);
  };

  useEffect(() => {
    fetchBank();
  }, []);

  return (
    <section>
      <NotificationBar showNotif={showNotif} success={success} text={text} />
      <HeaderBack text="Bank Saya" />
      <div className="section-box">
        <form action="submit" className="flex flex-col gap-2.5">
          <FormOption
            change={(e) => setNamaBank(e.target.value)}
            title="Nama Bank"
            defaultValue={user?.nama_bank}
            selected={user?.nama_bank || "Pilih Bank"}
            components={data.data_bank.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          />
          <FormLine
            type="number"
            small
            title="No. Rekening"
            change={(e) => setNoRek(e.target.value)}
            value={noRek}
          />
          <FormLine
            type="text"
            small
            title="Atas Nama"
            change={(e) => setAtasNama(e.target.value)}
            value={atasNama}
          />
          <div className="flex gap-7 items-center">
            <div className="flex-3">
              <FormLine
                small
                type="number"
                title="Kode OTP"
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
          <div className="mx-auto mt-12">
            <ButtonForm
              text="Update Bank"
              click={postUpdateBankData}
              loading={loading}
              padding={loading ? LoadingPadding : null}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default BankSaya;
