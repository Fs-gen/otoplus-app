import { useEffect, useState } from "react";
import { getDetailNotification } from "../api/api";

const DetailNotification = ({ id }) => {
  const [data, setData] = useState([]);

  console.log(data);

  const fetchData = async () => {
    const res = await getDetailNotification(id);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <div className="section-box"></div>
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
