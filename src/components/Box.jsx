const { default: Link } = require("next/link");

const BoxItem = ({ components, href, isMore, text }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3.75">
        <h1 className="text-[16px] font-semibold">{text}</h1>
        {isMore ? (
          <Link href={href} className="text-[10px] font-medium text-blue-light">
            Lihat Semua
          </Link>
        ) : null}
      </div>
      {components}
    </div>
  );
};

export default BoxItem;
