import axios from "axios";
import Cookies from "js-cookie";

export const mainURL = (resource) => {
  const res = `${process.env.NEXT_PUBLIC_API_MAIN_URL}/${resource}`;
  return res;
};

export const secondaryURL = (resource) => {
  const res = `${process.env.NEXT_PUBLIC_API_SECONDARY_URL}/${resource}`;
  return res;
};

export const getUserProfile = async () => {
  const header = Cookies.get("token");
  let datas = [];
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("profile/get-data"),
    headers: {
      Authorization: "Bearer " + header,
    },
  };

  await axios.request(config).then((response) => {
    datas = response.data?.data;
  }).catch((e) => {
    return null
  })
  return datas;
};

export const getUserHome = async () => {
  const header = Cookies.get("token");
  let datas = [];
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("home/get-data"),
    headers: {
      Authorization: "Bearer " + header,
    },
  };

  await axios.request(config).then((response) => {
    datas = response.data?.data;
  }).catch((e) => {
    return null
  })
  return datas;
};

export const getCekAkun = async () => {
  const header = Cookies.get("token");
  let datas = [];
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("home/get-data"),
    headers: {
      Authorization: "Bearer " + header,
    },
  };

  await axios.request(config).then((response) => {
    datas = response.data?.data;
    if (datas.profile_lengkap != true) {
      setTimeout(() => {
        window.location.href = "/Profile/profil-saya";
      }, 3000);
    }
  }).catch((e) => {
    return null
  })
  return datas;
};

export const getProduk = async () => {
  const header = Cookies.get("token");
  let datas = [];
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("produk/get-data"),
    headers: {
      Authorization: "Bearer " + header,
    },
  };

  await axios.request(config).then((response) => {
    datas = response.data?.data;
  }).catch((e) => {
    return null
  })
  return datas;
};
