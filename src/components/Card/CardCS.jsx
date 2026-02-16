import { getCS } from "@/pages/api/api";
import Images from "@/assets/images/illustration/CS.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const CardCS = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await getCS();
    setData(res?.url);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Link
      href={data}
      className="bg-blue-semi text-white flex justify-between px-4 rounded-xl items-center gap-4"
      target="_blank"
    >
      <div className="py-8">
        <h1 className="font-bold text-lg mb-4">
          Butuh informasi lebih lanjut?
        </h1>
        <p className="text-xs font-bold rounded-full px-4 py-2 bg-white text-blue-semi inline">
          Hubungi CS
        </p>
      </div>
      <div>
        <Image src={Images} width={150} height={150} alt="Icon" />
      </div>
    </Link>
  );
};

export default CardCS;
