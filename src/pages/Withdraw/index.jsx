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
import { highlightSkeleton, LoadingPadding } from "@/styles/style";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const Withdraw = ({ reward }) => {
  const [user, setUser] = useState([]);
  const [minimal, setMinimal] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [otp, setOTP] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [text, setText] = useState("");
  const token = Cookies.get("token");
  const router = useRouter();

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
      .catch(() => {
        return null;
      });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoadingOTP(true);
    const res = await postOTPWithdraw();
    if (res?.status_code == "00") {
      TopMessage(res?.data?.message, setSuccess(true));
    } else {
      TopMessage(res?.data?.message, setSuccess(false));
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
        if (response?.data?.status_code == "00") {
          TopMessage(response?.data?.data?.message, setSuccess(true));
          setTimeout(() => {
            router.push("/History/withdraw");
          }, 2000);
        } else {
          TopMessage(response?.data?.data?.message, setSuccess(false));
        }
      })
      .catch((e) => {
        TopMessage(e?.data?.data?.message);
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
      <HeaderBack
        text="Withdraw"
        click={() => {
          router.back();
          Cookies.remove("reward");
        }}
        link="Histori"
        href={"/History/withdraw"}
      />
      <div className="section-box">
        <div className="flex items-center gap-2 mt-6.5 mb-7.5">
          <div className="rounded-full bg-gray-light p-3.5">
            <Image src={Rupiah} width={25} height={25} alt="" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Jumlah Reward</h1>
            <div className="text-sm font-medium">
              {reward == undefined ? (
                <Skeleton
                  count={1}
                  height={20}
                  highlightColor={highlightSkeleton}
                />
              ) : (
                <h1>Rp. {new Intl.NumberFormat("de-DE").format(reward)}</h1>
              )}
            </div>
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

export const getServerSideProps = (context) => {
  const { req } = context;
  const result = req.cookies.reward || null;
  return {
    props: {
      reward: result,
    },
  };
};
