import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {Inputs} from "../../pages/Register";
import {useFormContext} from "react-hook-form";
// import {SignInInputs} from "../../pages/SignIn";

interface PasswordToggleProps {
  name: "password" | "passwordConfirm";
  //   onChange(): void;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}
export default function PasswordToggle({
  name,
  //onChange,
  required = true,
  disabled = false,
}: PasswordToggleProps) {
  const {
    register,
    formState: {errors},
  } = useFormContext<Inputs>();
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
        className="border p-2 rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 input w-full "
        id={name}
        required={required}
        disabled={disabled}
        {...register(name, {required: "This field is required"})}
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
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
    </div>
  );
}
