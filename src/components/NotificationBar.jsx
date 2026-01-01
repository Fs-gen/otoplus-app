const NotificationBar = ({ text, success, showNotif }) => {
  return (
    <div
      className={`fixed z-50 ${
        showNotif ? "top-0" : "-top-15"
      } transition-all p-2 text-white mx-auto max-w-125 text-sm left-0 right-0`}
    >
      <h1 className={`${ success ? "bg-green-semi" : "bg-red-semi" } py-2 px-4 rounded-sm`}>{text}</h1>
    </div>
  );
};

export default NotificationBar;
