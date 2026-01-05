const FormOption = ({ change, components, defaultValue, selected, title }) => {
  return (
    <div>
      <h1 className="text-xs mb-1.25">{title}</h1>
      <select
        aria-label="Default select example"
        className="py-2 px-4 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full text-xs rounded-xl border border-gray-light"
        onChange={change}
      >
        <option value={defaultValue} selected>
          {selected}
        </option>
        {components}
      </select>
    </div>
  );
};

export default FormOption;
