const FormLine = ({
  bold,
  name,
  inputmode,
  keyDown,
  placeholder,
  readOnly,
  small,
  title,
  type,
  value,
  white,
  required,
  change,
}) => {
  return (
    <div>
      {title ? (
        <label className={`text-xs mb-1.25 ${bold ? "font-bold" : ""}`}>
          {title} {required ? <span>(Wajib)</span> : null}
        </label>
      ) : null}
      <input
        name={name}
        inputMode={inputmode}
        onChange={change}
        onKeyDown={keyDown}
        required={required}
        readOnly={readOnly}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`${small ? "py-2 px-4" : "p-3"} placeholder:text-gray-semi ${
          white ? "read-only:bg-[#F4F5F7]" : "read-only:bg-gray-light"
        } focus:outline-blue-light font-semibold w-full ${
          small ? "text-xs" : "text-sm"
        } rounded-xl border ${
          white ? "border-[#F4F5F7]" : "border-gray-light"
        } `}
      />
    </div>
  );
};

export default FormLine;
