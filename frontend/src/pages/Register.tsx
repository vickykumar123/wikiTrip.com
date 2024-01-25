import {useForm} from "react-hook-form";
import {useState} from "react";
import Logo from "../components/Logo";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useMutation} from "react-query";
import {registerApi} from "../api/registerApi";
import {useAppContext} from "../context/AppContext";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/hooks";
import {signInUser} from "../redux/userSlice";

export interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function Register() {
  const {showToast} = useAppContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isTypePassword, setIsTypePassword] = useState("password");
  const [isTypePasswordConfirm, setIsTypePasswordConfirm] =
    useState("password");

  const {
    register,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>();

  function handlePasswordToggle() {
    if (isTypePassword === "password") {
      setIsTypePassword("text");
    } else {
      setIsTypePassword("password");
    }
  }
  function handlePasswordToggleConfirm() {
    if (isTypePasswordConfirm === "password") {
      setIsTypePasswordConfirm("text");
    } else {
      setIsTypePasswordConfirm("password");
    }
  }
  //   React Query
  const mutation = useMutation(registerApi, {
    onSuccess: (data) => {
      showToast({message: "Registration Successfully!", type: "SUCCESS"});
      const user = data.user;
      const userObj = {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        avatar: user.avatar,
      };
      dispatch(signInUser(userObj));
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: `⛔ ${error.message}`,
        type: "ERROR",
      });
    },
  });

  const isLoading = mutation.isLoading;

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-between p-6 gap-10">
      <Logo />
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">
          Create an Account with wikiTrip.com
        </h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              {...register("firstName", {required: "This field is required"})}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              {...register("lastName", {required: "This field is required"})}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
            {...register("email", {required: "This field is required"})}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <div className="relative flex">
            <input
              key="password"
              type={isTypePassword}
              className="border p-2 rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 input w-full "
              {...register("password", {
                required: "This field is required",
              })}
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
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <div className="relative flex">
            <input
              key="passwordConfirm"
              type={isTypePasswordConfirm}
              className="border p-2 rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 input w-full "
              {...register("passwordConfirm", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your password doesn't match";
                  }
                },
              })}
            />
            <span
              className="absolute right-1 bottom-[10px]"
              onClick={handlePasswordToggleConfirm}
            >
              {isTypePasswordConfirm !== "password" ? (
                <EyeIcon className="h-6 text-blue-500 opacity-70" />
              ) : (
                <EyeSlashIcon className="h-6 text-blue-500 opacity-70" />
              )}
            </span>
          </div>
          {errors.passwordConfirm && (
            <span className="text-red-500">
              {errors.passwordConfirm.message}
            </span>
          )}
        </label>
        <span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 md:text-xl rounded-md opacity-90 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </span>
      </form>
    </div>
  );
}
