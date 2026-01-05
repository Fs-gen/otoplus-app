import { Swiper, SwiperSlide } from "swiper/react";
const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

const CardNews = ({ href, props }) => {
  const lightFont = "text-xs md:text-sm font-light";
  return (
    <Swiper slidesPerView={"auto"} spaceBetween={20} className="swiper">
      {props.map((item, index) => {
        return (
          <SwiperSlide key={index} className="flex flex-col gap-2.5 max-w-2/3">
            <Image
              src={item.image}
              width={300}
              height={200}
              alt="News Image"
              priority
            />
            <div className="flex flex-col gap-2.5 mt-2.5">
              <h1 className="text-sm font-semibold">{item.title}</h1>
              <p className={`line-clamp-3 ${lightFont}`}>{item.desc}</p>
              <div className="flex justify-between items-center">
                <p className={lightFont}>{item.date}</p>
                <Link href={href} className="text-xs md:text-sm font-bold">
                  Read More...
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardNews;
