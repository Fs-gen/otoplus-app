import CardWithdraw from "@/components/Card/CardWithdraw";
import HeaderBack from "@/components/Header/HeaderBack";
import NotificationBar from "@/components/NotificationBar";
import { getHistoryWithdraw, postBatalTransaksi } from "@/pages/api/api";
import Link from "next/link";
import { useEffect, useState } from "react";

const HistoryWithdraw = () => {
  const [data, setData] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [ idWithdraw, setIdWithdraw ] = useState()
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const res = await getHistoryWithdraw();
    setData(res);
  };

  const handlerID = (id) => {
    setIdWithdraw(id)
  }

  console.log(idWithdraw)

  const CancelWithdraw = async (e) => {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    const res = await postBatalTransaksi();
    if (res?.status_code == "00") {
      TopMessage(res?.data?.message, setSuccess(true));
    } else {
      TopMessage(res?.data?.message, setSuccess(false));
    }
    setLoading(false);
  };

  useEffect(() => {
    handlerID()
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack />
      <NotificationBar showNotif={showNotif} text={text} success={success} />
      <div className="section-box">
        <div className="flex flex-col gap-4">
          {data?.map((item, index) => {
            return (
              <CardWithdraw
                key={index}
                props={item}
                click={CancelWithdraw}
                id={handlerID}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistoryWithdraw;
