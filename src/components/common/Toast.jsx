/* eslint-disable react/prop-types */
import { BiCheck } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";

const Toast = ({ type, message, show }) => {
  // Define background color based on the type prop
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  return (
    <div
      className={`fixed px-6 py-3 flex gap-x-2 top-4 left-4 w-fit text-white duration-75 ease-in ${bgColor} ${
        show ? "z-[1000] opacity-100" : "opacity-0 z-0"
      }`}
    >
      <span>{message}</span>
      {type === "error" ? (
        <FaXmark className="w-6 h-auto" />
      ) : (
        <BiCheck className="w-6 h-auto" />
      )}
    </div>
  );
};

export default Toast;
