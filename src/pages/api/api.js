import axios from "axios";
import Cookies from "js-cookie";

export const mainURL = (resource) => {
  const res = `${process.env.NEXT_PUBLIC_API_MAIN_URL}/${resource}`;
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
      datas = e?.response?.data;
    });
  return datas;
};

export const getNotification = async () => {
  const token = Cookies.get("token");
  let data = [];

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("notifikasi/get-data"),
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      data = response?.data?.data;
    })
    .catch(() => {
      return null;
    });
  return data;
};

export const getDetailNotification = async (id) => {
  const token = Cookies.get("token");
  let data = JSON.stringify({
    id: id,
  });
  let datas = [];

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("notifikasi/get-data-by-id"),
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(response);
      datas = response?.data?.data;
    })
    .catch((e) => {
      console.log(e);
    });
  return datas;
};

export const getDetailWithdraw = async (id) => {
  const token = Cookies.get("token");
  let data = JSON.stringify({ id });
  let datas = [];

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: mainURL("withdraw/get-data-by-id"),
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(response);
      datas = response?.data?.data;
    })
    .catch(() => {
      return null;
    });
  return datas;
};

export const getDetailTransaksi = async (id) => {
  const token = Cookies.get("token");
  let data = JSON.stringify({
    id_transaksi: id,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: mainURL("produk/get-transaksi-produk"),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      data = response?.data?.data;
    })
    .catch(() => {
      return null;
    });
  return data;
};

export const getDetailInputJual = async (id) => {
  const token = Cookies.get("token");
  let data = JSON.stringify({
    id_penjualan: id,
  });

  let datas = [];

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("penjualan/get_by_id"),
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(response);
      datas = response?.data?.data;
    })
    .catch((e) => {
      console.log(e);
    });
  return datas;
};

export const getNews = async () => {
  const token = Cookies.get("token");
  let data = null;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("home/get-newsv2"),
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      data = response?.data?.data;
    })
    .catch(() => {
      return null;
    });
  return data;
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
      data = response.data.data;
    })
    .catch(() => {
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

export const getHistoryInputPenjualan = async () => {
  const token = Cookies.get("token");
  let data = [];

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("penjualan/get_data"),
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      data = response?.data?.data;
    })
    .catch(() => {
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

export const getRekCompany = async () => {
  const token = Cookies.get("token");
  let data = [];

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: mainURL("master/get-bank-company"),
    headers: {
      "Content-Type": "text/plain",
      Authorization: "Bearer " + token,
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

export const postOTPWithdraw = async () => {
  const token = Cookies.get("token");
  let otp = "";

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: mainURL("withdraw/send-otp-withdraw"),
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      otp = response?.data;
    })
    .catch((e) => {
      return null;
    });
  return otp;
};

export const postOTPBank = async () => {
  const header = Cookies.get("token");
  let otp = "";

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
      otp = response?.data;
    })
    .catch((e) => {
      return null;
    });
  return otp;
};

export const postBatalTransaksi = async (id) => {
  const token = Cookies.get("token");
  let data = JSON.stringify({
    id_transaksi: id,
  });

  let datas = [];

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: mainURL("produk/batalkan-transaksi"),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      datas = response?.data;
    })
    .catch(() => {
      datas = response?.data;
    });
  return datas;
};

export const postBatalWithdraw = async (id) => {
  const token = Cookies.get("token");
  let data = JSON.stringify({
    id,
  });

  let result = [];

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: mainURL("withdraw/cancel"),
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(response);
      result = response?.data;
    })
    .catch((e) => {
      console.log(e);
    });
  return result;
};
