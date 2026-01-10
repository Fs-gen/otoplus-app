const FormArea = ({
  bold,
  change,
  name,
  placeholder,
  required,
  small,
  title,
  value,
  white,
}) => {
  return (
    <div>
      {title ? (
        <h1 className={`text-xs mb-1.25 ${bold ? "font-bold" : ""}`}>
          {title} {required ? <span>(Wajib)</span> : null}
        </h1>
      ) : null}
      <textarea
        placeholder={placeholder}
        required={required}
        rows={4}
        name={name}
        id=""
        onChange={change}
        value={value}
        className={`${small ? "py-2 px-4" : "p-3"} placeholder:text-gray-semi ${
          white ? "read-only:bg-[#F4F5F7]" : "read-only:bg-gray-light"
        } focus:outline-blue-light font-semibold w-full ${
          small ? "text-xs" : "text-sm"
        } rounded-xl border ${
          white ? "border-[#F4F5F7]" : "border-gray-light"
        }`}
      ></textarea>
    </div>
  );
};

export default FormArea;
