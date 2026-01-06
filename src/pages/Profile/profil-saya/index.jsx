import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import { useEffect, useState } from "react";
import {
  getProvinsi,
  getUserProfile,
  mainURL,
} from "@/pages/api/api";
import axios from "axios";
import Cookies from "js-cookie";
import NotificationBar from "@/components/NotificationBar";
import FormArea from "@/components/Form/FormArea";
import { useRouter } from "next/router";
import FormOption from "@/components/Form/FormOption";

const ProfilSaya = () => {
  const [user, setUser] = useState([]);
  const [nama, setNama] = useState("");
  const [no_tlp, setNoTlp] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState([]);
  const [selProvinsi, setSelProvinsi] = useState(0);
  const [namaProvinsi, setNamaProvinsi] = useState("");
  const [kota, setKota] = useState([]);
  const [selKota, setSelKota] = useState(0);
  const [namaKota, setNamaKota] = useState("");

  // Condition
  const [showNotif, setShowNotif] = useState(false);
  const [notification, setNotification] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  console.log(provinsi);

  const checker = (e) => {
    e.preventDefault();
    if (user.nama != null && user.alamat != null) {
      router.push("/Profile");
    } else {
      Cookies.remove("token");
      router.push("/Auth/Login");
    }
  };

  const fetchProvinsi = async () => {
    const res = await getProvinsi();
    console.log('provinsi', res);
    
    setProvinsi(res);
  };

  const fetchKota = async (id) => {
    const header = Cookies.get("token");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: mainURL("master/get-kabupaten-by-provinsi?id_provinsi=") + id,
      headers: {
        Authorization: "Bearer " + header,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        setKota(response?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchNamaProvinsi = async (id) => {
    if (!id || !provinsi.length) return;
    const prov = provinsi.find(item => item.id_provinsi == id);
    if (prov) setNamaProvinsi(prov.provinsi);
  };

  const fetchNamaKota = async (id) => {
    if (!id || !kota.length) return;
    const kotaData = kota.find(item => item.id_kabupaten == id);
    if (kotaData) setNamaKota(kotaData.kabupaten);
  };

  const fetchData = async () => {
    const res = await getUserProfile();
    setUser(res);
    setNama(res?.nama);
    setNoTlp(res?.no_tlp);
    setEmail(res?.email);
    setAlamat(res?.alamat);
    setSelProvinsi(res?.provinsi);
    setSelKota(res?.kota);
    
    // Load kota jika provinsi sudah ada
    if (res?.provinsi) {
      await fetchKota(res.provinsi);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const data = JSON.stringify({
      nama: nama,
      no_tlp: no_tlp,
      email: email,
      alamat: alamat,
      provinsi: selProvinsi,
      kota: selKota,
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
          fetchData();
        } else {
          setShowNotif(true);
          setNotification("Oops, sepertinya ada kesalahan");
          setTimeout(() => {
            setShowNotif(false);
          }, 2000);
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

  useEffect(() => {
    fetchData();
    fetchProvinsi();
  }, []);

  useEffect(() => {
    if (provinsi.length > 0 && user.provinsi) {
      fetchNamaProvinsi(user.provinsi);
    }
  }, [provinsi, user.provinsi]);

  useEffect(() => {
    if (kota.length > 0 && user.kota) {
      fetchNamaKota(user.kota);
    }
  }, [kota, user.kota]);

  return (
    <section>
      <HeaderBack text="Profil Saya" click={checker} />
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
          <FormOption
            title="Provinsi"
            change={(e) => {
              console.log(e);
              const selectedId = e.target.value;
              const selectedNama = e.target.selectedOptions[0].text;
              fetchKota(selectedId);
              setSelProvinsi(selectedId);
              setNamaProvinsi(selectedNama);
              setNamaKota(""); // Reset kota saat provinsi berubah
            }}
            defaultValue={user.provinsi}
            selected={namaProvinsi || "Pilih Wilayah"}
            components={
              provinsi &&
              provinsi?.map((item, index) => {
                return (
                  <option key={index} value={item.id_provinsi}>
                    {item.provinsi}
                  </option>
                );
              })
            }
          />
          <FormOption
            title="Kabupaten / Kota"
            change={(e) => {
              const selectedId = e.target.value;
              const selectedNama = e.target.selectedOptions[0].text;
              setSelKota(selectedId);
              setNamaKota(selectedNama);
            }}
            defaultValue={user.kota}
            selected={namaKota || "Pilih Kabupaten / Kota"}
            components={
              kota &&
              kota?.map((item, index) => {
                return (
                  <option key={index} value={item.id_kabupaten}>
                    {item.kabupaten}
                  </option>
                );
              })
            }
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
