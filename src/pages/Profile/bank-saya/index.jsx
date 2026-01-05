import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import { mainURL, postOTPBank } from "@/pages/api/api";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationBar from "@/components/NotificationBar";
import FormOption from "@/components/Form/FormOption";
import data from "@/pages/api/static/bank-name.json";

const { default: HeaderBack } = require("@/components/Header/HeaderBack");

const BankSaya = () => {
  const [namaBank, setNamaBank] = useState("");
  const [noRek, setNoRek] = useState(0);
  const [atasNama, setAtasNama] = useState("");
  const [otp, setOTP] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

  const sendOTP = async (e) => {
    e.preventDefault();
    postOTPBank();
  };

  const postUpdateBankData = async (e) => {
    e.preventDefault();
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
        if (response.data.status_code == "04") {
          setShowNotif(true);
          setText(response.data.data.message);
          console.log(response);
          setTimeout(() => {
            setShowNotif(false);
          }, 2000);
        } else {
          setShowNotif(true);
          setText(response.data.data.message);
          console.log(response);
          setSuccess(true);
          setTimeout(() => {
            setShowNotif(false);
            setTimeout(() => {
              setSuccess(false);
            }, 3500);
          }, 3000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <section>
      <NotificationBar showNotif={showNotif} success={success} text={text} />
      <HeaderBack text="Bank Saya" />
      <div className="section-box">
        <form action="submit" className="flex flex-col gap-2.5">
          <FormOption
            change={(e) => setNamaBank(e.target.value)}
            title="Nama Bank"
            selected="Pilih Bank"
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
          />
          <FormLine
            type="text"
            small
            title="Atas Nama"
            change={(e) => setAtasNama(e.target.value)}
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
              padding="py-2 px-4 mt-5"
              click={sendOTP}
            />
          </div>
          <div className="mx-auto mt-12">
            <ButtonForm text="Update Bank" click={postUpdateBankData} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default BankSaya;
