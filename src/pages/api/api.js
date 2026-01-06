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

  await axios
    .request(config)
    .then((response) => {
      datas = response.data?.data;
    })
    .catch((e) => {
      return null;
    });
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

  await axios
    .request(config)
    .then((response) => {
      datas = response.data?.data;
    })
    .catch((e) => {
      return null;
    });
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

  await axios
    .request(config)
    .then((response) => {
      datas = response.data?.data;
      if (datas.profile_lengkap != true) {
        setTimeout(() => {
          window.location.href = "/Profile/profil-saya";
        }, 3000);
      }
    })
    .catch((e) => {
      return null;
    });
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

  await axios
    .request(config)
    .then((response) => {
      datas = response.data?.data;
    })
    .catch((e) => {
      return null;
    });
  return datas;
};

export const getListReferral = async () => {
  const header = Cookies.get("token");
  let data = "";
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("profile/get-list-referral"),
    headers: {
      Authorization: "Bearer " + header,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.data));
      data = response.data.data;
    })
    .catch((error) => {
      return null;
    });
  return data;
};

export const getProvinsi = async () => {
  const header = Cookies.get("token");
  let data = [];
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("master/get-provinsi"),
    headers: {
      Authorization: "Bearer " + header,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      data = response?.data?.data;
      console.log(data);
    })
    .catch((e) => {
      return null;
    });
  return data;
};

export const getHistoryTransaction = async () => {
  const header = Cookies.get("token");
  let data = [];

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("transaksi/get-data"),
    headers: {
      Authorization: "Bearer " + header,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      data = response?.data?.data;
    })
    .catch((e) => {
      return null;
    });
  return data;
};

export const getHistoryReward = async () => {
  const header = Cookies.get("token");
  let data = [];

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("reward/get-data"),
    headers: {
      Authorization: "Bearer " + header,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      data = response?.data?.data;
    })
    .catch((e) => {
      return null;
    });
  return data;
};

export const getBankUser = async () => {
  const header = Cookies.get("token");
  let data = [];

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("profile/get-bank"),
    headers: {
      Authorization: "Bearer " + header,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      data = response?.data?.data;
    })
    .catch((e) => {
      return null;
    });
  return data;
};

export const postOTPBank = async () => {
  const header = Cookies.get("token");

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: mainURL("profile/send-otp-bank"),
    headers: {
      Authorization: "Bearer " + header,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      return null;
    });
};
