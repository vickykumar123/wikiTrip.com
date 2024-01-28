import {useEffect} from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({message, type, onClose}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-emerald-500 text-white max-w-md "
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={`${styles}  transition-all duration-150`}>
      <div className="flex justify-center items-center space-x-6">
        <span className="text-lg font-semibold mt-">{message}</span>
        <span
          className="font-bold  right-6 top-0 cursor-pointer"
          onClick={() => onClose()}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default Toast;
