const HeaderText = ({ text, center }) => {
  return (
    <div
      className={`section-box ${
        center ? "text-center" : ""
      } shadow-lg shadow-slate-100`}
    >
      <h1 className="text-sm font-medium">{text}</h1>
    </div>
  );
};

export default HeaderText;
