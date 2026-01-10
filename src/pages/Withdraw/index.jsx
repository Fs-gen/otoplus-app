import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import { getBankUser, mainURL } from "../api/api";
import { useEffect, useState } from "react";
import NotificationBar from "@/components/NotificationBar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { LoadingPadding } from "@/styles/style";

const Withdraw = () => {
  const [user, setUser] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const token = Cookies.get("token");
  const router = useRouter();

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

  const postWithdrawl = async (e) => {
    e.preventeDefault();
    let data = JSON.stringify({});

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL(),
      headers: {
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <NotificationBar showNotif={showNotif} success={success} text={text} />
      <HeaderBack text="Withdraw" />
      <div className="section-box">
        <div className="flex items-center gap-2 mt-6.5 mb-7.5">
          <h1 className="p-3.5 rounded-full bg-gray-light">Rp</h1>
          <div>
            <h1 className="text-sm font-semibold">Jumlah Reward</h1>
            <p className="text-sm">Rp. 3.000.000</p>
          </div>
        </div>
        <form action="" method="post" className="flex flex-col gap-3.75">
          <div>
            <FormLine title="Jumlah Withdraw" small />
            <p className="text-[10px] text-text-gray mt-1">
              Minimal Withdraw Rp. 50.000
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
