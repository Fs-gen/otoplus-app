import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import { mainURL } from "@/pages/api/api";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationBar from "@/components/NotificationBar";
import { LoadingPadding } from "@/styles/style";

const { default: HeaderBack } = require("@/components/Header/HeaderBack");

const GantiPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const postUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookies.get("token");
    let data = JSON.stringify({
      new_password: password,
      confirm_new_password: confirm,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("profile/change-password"),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    if (password.length < 6) {
      setText("Harap masukkan password minimal 6 karakter");
      setShowNotif(true);
      setTimeout(() => {
        setShowNotif(false);
      }, 3000);
    } else {
      await axios
        .request(config)
        .then((response) => {
          if (response.data.status_code == "07") {
            setShowNotif(true);
            setText(
              `${response.data.data.message} Atau Kolom Konfirmasi Kosong`
            );
            setTimeout(() => {
              setShowNotif(false);
            }, 3000);
          } else {
            setShowNotif(true);
            setText(response.data.data.message);
            setSuccess(true);
            setTimeout(() => {
              setShowNotif(false);
              setTimeout(() => {
                setSuccess(false);
              }, 3300);
            }, 3000);
          }
        })
        .catch((e) => {
          return null;
        });
    }
    return setLoading(false);
  };

  return (
    <section>
      <HeaderBack text="Ganti Password" click={() => history.back()} />
      <NotificationBar showNotif={showNotif} success={success} text={text} />
      <div className="section-box">
        <form action="" method="post">
          <FormLine
            title="Masukkan Password Baru"
            small
            change={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2.5"></div>
          <FormLine
            title="Konfirmasi Password Baru"
            small
            change={(e) => setConfirm(e.target.value)}
          />
          <div className="text-center mt-10">
            <ButtonForm
              text="Update Password"
              click={postUpdate}
              loading={loading}
              padding={loading ? LoadingPadding : null}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default GantiPassword;
