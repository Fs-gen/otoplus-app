import HeaderBack from "@/components/Header/HeaderBack";
import { useEffect, useState } from "react";
import { getNotification } from "../api/api";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";

const Skeletons = () => {
  return (
    <Skeleton
      height={80}
      highlightColor={highlightSkeleton}
      className="mb-2"
      borderRadius={10}
    />
  );
};

const Notification = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getNotification();

    if (res.status_code == "00" || res.status_code == "04") {
      setData(res?.data);
    }

    if (res.status_code == "02") {
      //redirect to logout
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Notifikasi" />
      <div className="section-box">
        {data && data?.message == "Tidak Ada Notifikasi Baru" ? (
          <h1 className="text-center">Tidak Ada Notifikasi Baru</h1>
        ) : (
          <div>
            {data && data?.length == 0 ? (
              <div>
                <Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {data &&
                  data?.map((item, index) => {
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
                        <p className="text-text-gray text-xs mt-2">
                          {item.created_at}
                        </p>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Notification;
