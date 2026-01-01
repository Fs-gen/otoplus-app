import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import { useEffect, useState } from "react";
import { getUserProfile, mainURL } from "@/pages/api/api";
import axios from "axios";
import Cookies from "js-cookie";
import NotificationBar from "@/components/NotificationBar";
import FormArea from "@/components/Form/FormArea";

const ProfilSaya = () => {
  const [user, setUser] = useState([]);
  const [nama, setNama] = useState("");
  const [no_tlp, setNoTlp] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [notification, setNotification] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchData = async () => {
    const res = await getUserProfile();
    setUser(res);
    setNama(res?.nama);
    setNoTlp(res?.no_tlp);
    setEmail(res?.email);
    setAlamat(res?.alamat);
    setProvinsi(res?.provinsi);
    setKota(res?.kota);
  };

  console.log(user);

  const onUpdate = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const data = JSON.stringify({
      nama: nama,
      no_tlp: no_tlp,
      email: email,
      alamat: alamat,
      provinsi: provinsi,
      kota: kota,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("profile/update-profile"),
      headers: {
        "Content-Type": "application-json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        if (response.data.status_code == "00") {
          setShowNotif(true);
          setNotification("Perubahan Data Telah Berhasil");
          setSuccess(true);
          setTimeout(() => {
            setShowNotif(false);
          }, 2000);
          console.log(JSON.stringify(response.data));
        } else {
          setShowNotif(true);
          setNotification("Oops, sepertinya ada kesalahan");
          setTimeout(() => {
            setShowNotif(false);
          }, 2000);
          console.log(JSON.stringify(response.data));
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

  console.log(user);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Profil Saya" />
      <NotificationBar
        showNotif={showNotif}
        success={success}
        text={notification}
      />
      <div className="section-box">
        <form action="" method="post" className="flex flex-col gap-2.5">
          <FormLine
            title="Nama Lengkap"
            type="text"
            small
            value={nama}
            change={(e) => setNama(e.target.value)}
          />
          <FormLine title="No. Whatsapp" small readOnly value={no_tlp} />
          <FormLine
            title="Email"
            small
            type="email"
            value={email}
            change={(e) => setEmail(e.target.value)}
          />
          <FormArea
            change={(e) => setAlamat(e.target.value)}
            value={alamat}
            title="Alamat"
            type="text"
          />
          <FormLine
            title="Provinsi"
            small
            value={provinsi}
            change={(e) => setProvinsi(e.target.value)}
          />
          <FormLine
            title="Kabupaten / Kota"
            small
            value={kota}
            change={(e) => setKota(e.target.value)}
          />
          <FormLine title="Sponsor" small readOnly value={user.sponsor} />
          <div className="mt-5"></div>
          <ButtonForm text="Update Profile" click={onUpdate} />
        </form>
      </div>
    </section>
  );
};

export default ProfilSaya;
