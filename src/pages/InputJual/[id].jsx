import { useEffect, useState } from "react";
import { getDetailInputJual } from "../api/api";
import HeaderBack from "@/components/Header/HeaderBack";
import { Clock } from "lucide-react";

const CardDetail = ({ text, title }) => {
  return (
    <div>
      <h1 className="font-semibold text-text-gray">{title}</h1>
      <p className="text-sm font-medium text-text-gray">{text}</p>
    </div>
  );
};

const DetailInputJual = ({ id }) => {
  const [data, setData] = useState([]);

  console.log(data);
  console.log(id);

  const fetchData = async () => {
    const res = await getDetailInputJual(16);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="Detail Penjualan" />
      <div className="section-box">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-center mt-2">
            <Clock
              size={75}
              color="white"
              className="p-2 rounded-full bg-yellow-semi mx-auto"
            />
            <h1 className="font-semibold mt-4">Pending</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailInputJual;

export const getServerSideProps = (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
