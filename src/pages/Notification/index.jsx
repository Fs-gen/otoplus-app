import HeaderBack from "@/components/Header/HeaderBack";
import { useEffect, useState } from "react";
import { getNotification } from "../api/api";
import Link from "next/link";

const Notification = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getNotification();
    setData(res);
  };

  console.log(data)

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Notifikasi" />
      <div className="section-box">
        <div className="flex flex-col gap-4">
          {data && data?.map((item, index) => {
            return (
              <Link
                href={`/Notification/${item.id}`}
                key={index}
                className="bg-white p-4 shadow-md rounded-xl"
              >
                <h1 className="text-sm font-semibold">{item.title}</h1>
                <p className="text-text-gray text-xs mt-2">
                  {item.description}
                </p>
                <p className="text-text-gray text-xs mt-2">{item.created_at}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Notification;
