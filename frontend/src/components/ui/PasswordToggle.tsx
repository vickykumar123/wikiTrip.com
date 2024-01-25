import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";

interface PasswordToggleProps {
  placeholder?: string;
  name?: string;
  //   onChange(): void;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}
export default function PasswordToggle({
  placeholder,
  name,
  //onChange,
  required = true,
  disabled = false,
  ...rest
}: PasswordToggleProps) {
  const [isTypePassword, setIsTypePassword] = useState("password");

  function handlePasswordToggle() {
    if (isTypePassword === "password") {
      setIsTypePassword("text");
    } else {
      setIsTypePassword("password");
    }
  }
  return (
    <div className="relative flex">
      <input
        type={isTypePassword}
        placeholder={placeholder}
        className="border p-2 rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 input w-full "
        name={name}
        id={name}
        //onChange={onChange}
        required={required}
        disabled={disabled}
        {...rest}
      />
      <span
        className="absolute right-1 bottom-[10px]"
        onClick={handlePasswordToggle}
      >
        {isTypePassword !== "password" ? (
          <EyeIcon className="h-6 text-blue-500 opacity-70" />
        ) : (
          <EyeSlashIcon className="h-6 text-blue-500 opacity-70" />
        )}
      </span>
    </div>
  );
}
