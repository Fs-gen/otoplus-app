import HeaderBack from "@/components/Header/HeaderBack";
import { useState } from "react";

const News = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const data = JSON.stringify({
        sort: "-created_at",
        page: 1
    })

  }
  
  return (
    <section>
      <HeaderBack text="News" />
      <div className="section-box"></div>
    </section>
  );
};

export default News;