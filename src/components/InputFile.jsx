const InputFile = ({ change, component, id }) => {
  return (
    <label
      htmlFor={id}
      className="bg-[#F7F7F7] text-center p-2 font-semibold text-xs cursor-pointer w-full"
    >
      <div className="border-2 border-gray-dark px-2 py-4 border-dashed text-gray-700">
        <input
          type="file"
          id={id}
          name={id}
          onChange={change}
          className="hidden"
        />
        {component}
      </div>
    </label>
  );
};

export default InputFile;
