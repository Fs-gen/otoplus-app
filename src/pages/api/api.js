import axios from "axios";
import Cookies from "js-cookie";

export const mainURL = (resource) => {
  const res = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`;
  return res;
};

export const getUser = async () => {
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
    datas = response.data?.data?.data;
  });
  return datas;
};
