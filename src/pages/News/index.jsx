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
    setPage((e) => e - 1);
  };

  const handlerNext = () => {
    setPage((e) => e + 1);
  };

  const fetchData = async (currentPage = 1) => {
    setData([]);
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
      .then((res) => {
         setData(res?.data?.data || []);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <section>
      <HeaderBack text="News" />
      <div className="section-box">
        {data && data.length == 0 ? (
          <div className="grid grid-cols-2 gap-4">
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {data?.map((item, index) => {
              return (
                <Link 
                  href={item.slug} 
                  key={index} 
                  target="_blank"
                  className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={item.image}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-3 md:p-4">
                    <h1 className="text-sm md:text-base font-bold line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                      {item.title}
                    </h1>
                    <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                      {item.spoiler}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-center gap-6 mt-8">
          {page == 1 ? null : (
            <button
              onClick={handlerPrev}
              disabled={data && data.length == 0 ? true : false}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ArrowLeft size={25} color="black" />
            </button>
          )}
          <span className="text-sm font-medium text-gray-600">Halaman {page}</span>
          <button
            onClick={handlerNext}
            disabled={data && data.length == 0 ? true : false}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ArrowRight size={25} color="black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;
