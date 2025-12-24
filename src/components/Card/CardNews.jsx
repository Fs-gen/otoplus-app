const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

const CardNews = ({ href, props }) => {
  const lightFont = "text-xs md:text-sm font-light";
  return (
    <div className="flex overflow-x-scroll gap-3.5 scrollbar-hide">
      {props.dataNews.map((item, index) => {
        return (
          <div className="flex flex-col gap-2.5 min-w-2/3" key={index}>
            <Image src={item.image} width={400} height={200} alt="News Image"/>
            <h1 className="text-sm font-semibold">{item.title}</h1>
            <p className={`line-clamp-3 ${lightFont}`}>{item.desc}</p>
            <div className="flex justify-between items-center">
              <p className={lightFont}>{item.date}</p>
              <Link href={href} className="text-xs md:text-sm font-bold">
                Read More...
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardNews;
