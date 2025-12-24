const Button = ({ type, text }) => {
  return <button type={type} className="bg-blue-dark rounded-[10px] text-xs font-medium py-3 px-20 mx-auto text-white">{text}</button>;
};

export default Button