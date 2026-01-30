const { default: Link } = require("next/link");

const BoxItem = ({ components, href, isMore, direct, text, subtext }) => {
  return (
    <div className="section-box">
      <div className="flex justify-between items-center mb-3.75">
        <div>
          <h1 className="text-[16px] font-semibold">{text}</h1>
          <p className="text gray-dark text-xs w-5/6">{subtext}</p>
        </div>
        {isMore ? (
          <Link
            href={href}
            target={direct ? "_blank" : null}
            className="text-xs font-semibold text-blue-light text-nowrap"
          >
            Lihat Semua
          </Link>
        ) : null}
      </div>
      {components}
    </div>
  );
};

export default BoxItem;
