import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

export const CardNewsSwiper = ({ props }) => {
  const lightFont = "text-xs md:text-sm font-light";
  return (
    <Swiper slidesPerView={"auto"} spaceBetween={20} className="swiper">
      {props &&
        props?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex flex-col gap-2.5 bg-white p-4 rounded-xl shadow-lg max-w-2/3"
            >
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

export const CardNewsBasic = ({ props }) => {
  return (
    <Link className="rounded-xl shadow-sm" href={props.slug} target="_blank">
      <Image
        src={props.image}
        width={300}
        height={200}
        alt="News Image"
        className="object-fit max-h-50 rounded-t-xl"
        priority
      />
      <div className="flex flex-col gap-2 px-3 py-4 min-h-34 md:min-h-max justify-between">
        <div className="">
          <h1 className="font-semibold line-clamp-2">{props.title}</h1>
          <div className="text-[11px] text-text-gray font-semibold line-clamp-3">
            {props.spoiler}
          </div>
        </div>
        <Link
          className="bg-blue-semi w-full py-2 text-[10px] font-semibold text-white rounded-md flex gap-1 items-center justify-center"
          href={props.slug}
          target="_blank"
        >
          Lihat Lengkap
          <ChevronRight size={15} strokeWidth={2} />
        </Link>
      </div>
    </Link>
  );
};
