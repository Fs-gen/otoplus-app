const Form = ({ placeholder, small, title, type, value }) => {
  return (
    <div>
      {title ? <h1 className="text-xs mb-1.25">{title}</h1> : null}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={`${ small ? "py-2 px-4" : "p-3" } placeholder:text-gray-light focus:outline-blue-light font-semibold w-full ${
          small ? "text-xs" : "text-sm"
        } rounded-2xl border border-gray-light`}
      />
    </div>
  );
};

export default Form;
