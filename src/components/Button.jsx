import Link from "next/link";

const buttonStyle =
  "bg-blue-dark rounded-[10px] text-xs font-medium mx-auto text-white";

export const ButtonForm = ({ click, padding, type, text }) => {
  return (
    <button
      type={type}
      className={`${buttonStyle} ${padding ? padding : "px-20 py-3"}`}
      onClick={click}
    >
      {text}
    </button>
  );
};

export const ButtonLink = ({ href, padding, text }) => {
  return (
    <Link
      href={href}
      className={`${buttonStyle} ${padding ? padding : "px-20 py-3"}`}
    >
      {text}
    </Link>
  );
};
