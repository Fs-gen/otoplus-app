import HeaderBack from "@/components/Header/HeaderBack";
import { getDetailPromotion } from "@/pages/api/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeletons from "./Skeletons";

const DetailPromotion = ({ id }) => {
  const [data, setData] = useState([]);
  const fecthData = async () => {
    const res = await getDetailPromotion(id);
    setData(res);
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <section>
      {data && data?.length == 0 ? (
        <Skeletons />
      ) : (
        <div>
          <HeaderBack text="Promo" />
          <Image
            src={data?.image_url}
            width={1000}
            height={1000}
            alt={data?.title}
            className="max-h-50"
          />
          <div className="p-4">
            <h1 className="text-xl font-bold">{data?.title}</h1>
            <h2 className="text-text-gray text-sm my-3">
              Tanggal: {data?.created_at}
            </h2>
            <div className="border-b-2 mx-2 border-gray-200 my-4"></div>
            <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailPromotion;

export const getServerSideProps = (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
