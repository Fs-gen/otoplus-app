import Link from "next/link";

const CardHistory = ({ href, props, reward, status }) => {
  const fontSemi = "text-xs font-semibold";
  return (
    <div>
      {props.map((item, index) => {
        const statusColor = `${
          item.status == "Sukses"
            ? "text-green-semi"
            : item.status == "Pending"
            ? "text-yellow-semi"
            : "text-red-semi"
        }`;
        return (
          <Link
            href={href}
            className="flex justify-between items-center px-3.75 py-2.5 border border-[#e3e3e3] rounded-[20px] mb-2.5"
            key={index}
          >
            <div className="flex gap-2.5">
              <h1 className="p-1.5 bg-gray-light h-max rounded-full">I</h1>
              <div className="flex flex-col gap-1.25">
                <h1 className={fontSemi}>{item.title}</h1>
                <p className="text-xs text-text-gray">{item.date}</p>
                <h2
                  className={`${
                    reward ? "text-green-semi" : "text-text-gray"
                  } ${fontSemi}`}
                >
                  Rp {item.price}
                </h2>
              </div>
            </div>
            {status ? (
              <h1 className={`${statusColor} ${fontSemi}`}>{item.status}</h1>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
};

export default CardHistory;
