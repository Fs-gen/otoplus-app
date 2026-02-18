import { mainURL } from "@/pages/api/api";
import FormLine from "../Form/FormLine";
import NotificationBar from "../NotificationBar";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CardOffer = ({ show, hideClick, kode_referral }) => {
  const [no_tlp, setNo_tlp] = useState("");
  const [nama, setNama] = useState("");
  const [domisil, setDomisil] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState("");
  const [text, setText] = useState("");
  const referral = Cookies.get("referralUser");
  const postWhatsapp = async (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      no_tlp,
      nama,
      domisil,
      kode_referral,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("contact/get-offers"),
      data: data,
    };

    if (no_tlp.trim() == "" || nama.trim() == "" || domisil.trim() == "") {
      setShowNotif(true);
      setText("Harap isi kolom yang masih kosong ( Kecuali kode referral )");
      setTimeout(() => {
        setShowNotif(false);
      }, 2000);
    } else {
      setLoading(true);
      await axios
        .request(config)
        .then((response) => {
          const url = response?.data?.data?.url;
          if (kode_referral == undefined) {
            window.location.href = url;
          } else if (kode_referral == referral) {
            setShowNotif(true);
            setText(
              "Jangan melakukan kecurangan dengan menggunakan referral sendiri!",
            );
            setTimeout(() => {
              setShowNotif(false);
            }, 2000);
            setLoading(false);
          } else {
            window.location.href = url;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div
      className={`${show ? "bottom-0 z-50" : "-bottom-125 z-10"} bg-white p-4 w-full flex flex-col gap-4 rounded-t-xl fixed max-w-125 transition-all duration-300`}
    >
      <NotificationBar showNotif={showNotif} text={text} />
      <h1 className="text-xl font-semibold">Masukkan Data Diri Anda</h1>
      <FormLine
        value={no_tlp}
        change={(e) => setNo_tlp(e.target.value)}
        title="No Whatsapp"
      />
      <FormLine
        value={nama}
        change={(e) => setNama(e.target.value)}
        title="Nama"
      />
      <FormLine
        value={domisil}
        change={(e) => setDomisil(e.target.value)}
        title="Domisili / Area"
      />
      <div className="flex font-medium text-sm gap-4">
        <button
          className="flex-1 border-2 border-blue-dark text-blue-dark px-4 py-2 rounded-md"
          onClick={hideClick}
        >
          Kembali
        </button>
        <button
          className="flex-1 border-2 border-blue-dark bg-blue-dark text-white px-4 py-2 rounded-md"
          onClick={postWhatsapp}
        >
          {loading ? <div className="spinner-small"></div> : "Kirim"}
        </button>
      </div>
    </div>
  );
};

export default CardOffer;
