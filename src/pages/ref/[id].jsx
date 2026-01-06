import { useState, useEffect } from "react";
import { mainURL } from "../api/api";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ErrorIMG from "@/assets/images/illustration/error.png";
import Image from "next/image";

const Id = ({ id }) => {
  const router = useRouter();
  const [referral, setReferral] = useState(id);
  const [failed, setFailed] = useState(false);
  const Box = "flex flex-col items-center gap-4";
  const getCekReferral = async () => {
    let data = JSON.stringify({
      kode_referral: referral,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("auth/cek-kode-referral"),
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        if (response.data.status_code == "00") {
          Cookies.set("referral", referral);
          router.replace("/Auth/Register");
        } else {
          setFailed(true);
        }
      })
      .catch((e) => {
        return null;
      });
  };

  useEffect(() => {
    getCekReferral();
  }, []);

  return (
    <div className="min-h-dvh flex flex-col justify-center items-center">
      {!failed ? (
        <div className={Box}>
          <div className="spinner"></div>
          <h1 className="font-semibold">Melakukan Validasi Referral</h1>
        </div>
      ) : (
        <div className={Box}>
          <Image
            src={ErrorIMG}
            width={300}
            height={300}
            quality={100}
            alt="h-auto"
          />
          <h1 className="font-semibold">Kode Referral Tidak Ditemukan!</h1>
        </div>
      )}
    </div>
  );
};

export default Id;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
