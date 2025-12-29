import Link from "next/link";

const buttonStyle =
  "bg-blue-dark rounded-[10px] text-xs font-medium py-3 px-20 mx-auto text-white";

export const ButtonForm = ({ click,type, text }) => {
  return (
    <button type={type} className={buttonStyle} onClick={click}>
      {text}
    </button>
  );
};

export const ButtonLink = ({ href, text }) => {
  return (
    <Link href={href} className={buttonStyle}>
      {text}
    </Link>
  );
};
