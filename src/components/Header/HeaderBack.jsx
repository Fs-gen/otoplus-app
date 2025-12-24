const HeaderBack = ({ click, text }) => {
  return (
    <div className="flex justify-between items-center p-5 shadow-md">
      <button type="button" className="w-6.25 cursor-pointer" onClick={click}>
        Back
      </button>
      <h1 className="text-sm font-medium">{text}</h1>
      <span className="w-6.25"></span>
    </div>
  );
};

export default HeaderBack;
