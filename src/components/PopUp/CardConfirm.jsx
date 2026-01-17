const CardConfirm = ({ cancel, click, loading, icon, show, text }) => {
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed bottom-0 left-0 right-0 min-h-dvh bg-[rgba(0,0,0,0.3)]`}
    >
      <div
        className={`bottom-0 fixed flex bg-white flex-col gap-4 w-full px-4 py-6 rounded-t-4xl text-center transition-all duration-300`}
      >
        {icon}
        <h1 className="font-semibold">{text}</h1>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="flex justify-center items-center font-semibold gap-4">
            <button
              className="flex-1 border-blue-semi text-blue-semi border-2 p-2 rounded-full"
              onClick={cancel}
            >
              Tidak
            </button>
            <button
              className="flex-1 bg-blue-semi text-white p-2 rounded-full border-2 border-blue-semi"
              onClick={click}
            >
              Iya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardConfirm;
