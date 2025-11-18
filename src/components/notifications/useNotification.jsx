import toast from "react-hot-toast";

const useNotification = () => {
  const notify = ({message, type = "error"}) => {
    switch (type) {
      case "error":
        return toast.error(message);
      case "success":
        return toast.success(message);
      case "loading":
        return toast.loading(message);

      case "info":
      default:
        return toast(message);
    }
  };

  return notify;
};

export default useNotification;
