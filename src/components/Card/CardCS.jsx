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
      className="bg-blue-semi text-white flex justify-between px-4 pt-4 rounded-xl items-center"
      target="_blank"
    >
      <div className="pb-4">
        <h1 className="font-bold text-lg">Mengalami Kesulitan?</h1>
        <p className="text-xs font-medium mt-2">
          Kami selalu siap membantu anda!
        </p>
      </div>
      <div>
        <Image src={Images} width={150} height={150} alt="Icon" />
      </div>
    </Link>
  );
};

export default CardCS;
