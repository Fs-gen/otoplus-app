import HeaderBack from "@/components/Header/HeaderBack";
import { useEffect, useState } from "react";
import { mainURL } from "../api/api";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { highlightSkeleton } from "@/styles/style";

const News = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  console.log(page);
  console.log(data)

  const Skeletons = () => {
    return (
      <Skeleton
        count={1}
        height={350}
        borderRadius={10}
        highlightColor={highlightSkeleton}
        className="mb-4"
      />
    );
  };

  const handlerPrev = () => {
    setData([]);
    setPage((e) => e - 1);
    fetchData();
  };

  const handlerNext = () => {
    setData([]);
    setPage((e) => e + 1);
    fetchData();
  };

  const fetchData = async () => {
    const data = JSON.stringify({
      sort: "-created_at",
      page: page,
      limit: 10,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: mainURL("home/get-newsv2"),
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderBack text="News" />
      <div className="section-box">
        {data && data.length == 0 ? (
          <div>
            <Skeletons />
            <Skeletons />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {data?.map((item, index) => {
              return (
                <Link href={item.slug} key={index} target="_blank">
                  <Image
                    src={item.image}
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    alt=""
                  />
                  <div className="rounded-b-lg shadow-lg p-4">
                    <h1 className="line-clamp-2 font-semibold">{item.title}</h1>
                    <p className="text-text-gray text-sm line-clamp-3 mt-2">
                      {item.spoiler}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-center gap-4 mt-6">
          {page == 1 ? null : (
            <button
              onClick={handlerPrev}
              disabled={data && data.length == 0 ? true : false}
            >
              <ArrowLeft size={25} color="black" />
            </button>
          )}
          <p></p>
          <button
            onClick={handlerNext}
            disabled={data && data.length == 0 ? true : false}
          >
            <ArrowRight size={25} color="black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;
