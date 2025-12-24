const { default: Link } = require("next/link");

const LinkText = ({ href, linkText, text }) => {
  return (
    <h1 className="mb-9 text-xs text-center">
      {text}{" "}
      <Link href={href} className="font-bold text-blue-semi">
        {linkText}
      </Link>
    </h1>
  );
};

export default LinkText;
