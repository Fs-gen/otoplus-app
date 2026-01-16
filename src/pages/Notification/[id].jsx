import { useEffect, useState } from "react";
import { getDetailNotification, postMarkReadNotif } from "../api/api";
import HeaderBack from "@/components/Header/HeaderBack";
import { Bell } from "lucide-react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";

const DetailNotification = ({ id }) => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const res = await getDetailNotification(id);
    await postMarkReadNotif(id);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack
        text="Detail Notifikasi"
        click={() => router.replace("/Notification")}
      />
      <div className="section-box">
        {data && data.length == 0 ? (
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <Skeleton
              count={1}
              circle
              width={100}
              height={100}
              highlightColor={highlightSkeleton}
            />
            <div className="my-2">
              <Skeleton
                count={1}
                width={150}
                highlightColor={highlightSkeleton}
              />
              <Skeleton
                count={1}
                width={150}
                highlightColor={highlightSkeleton}
              />
            </div>
            <Skeleton count={3} highlightColor={highlightSkeleton} />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-4">
            <Bell
              size={75}
              color="white"
              className="bg-blue-semi p-2 rounded-full mx-auto"
            />
            <h1 className="font-semibold text-blue-dark text-center mt-4">
              {data?.title}
            </h1>
            <p className="text-text-gray font-sm text-center">
              {data.created_at}
            </p>
            <p className="text-text-gray font-medium mt-4">
              {data?.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailNotification;

export const getServerSideProps = (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
