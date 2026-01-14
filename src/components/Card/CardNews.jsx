import { Swiper, SwiperSlide } from "swiper/react";
const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

const CardNews = ({ props }) => {
  const lightFont = "text-xs md:text-sm font-light";
  return (
    <Swiper slidesPerView={"auto"} spaceBetween={20} className="swiper">
      {props && props?.map((item, index) => {
        return (
          <SwiperSlide key={index} className="flex flex-col gap-2.5 max-w-2/3">
            <Link href={item.slug} target="_blank">
              <Image
                src={item.image}
                width={300}
                height={200}
                alt="News Image"
                className="object-fit max-h-50"
                priority
              />
              <div className="flex flex-col gap-2.5 mt-2.5">
                <h1 className="text-sm font-semibold line-clamp-2">
                  {item.title}
                </h1>
                <p className={`line-clamp-3 ${lightFont}`}>{item.spoiler}</p>
                <div className="flex justify-between items-center">
                  <p className={lightFont}>{item.publishedAt}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardNews;
