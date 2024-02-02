import {useForm} from "react-hook-form";
import Logo from "../components/Logo";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {useMutation} from "react-query";
import {loginApi} from "../api/loginAndLogoutApi";
import {useAppContext} from "../context/AppContext";
import {useAppDispatch} from "../redux/hooks";
import {signInUser} from "../redux/userSlice";
import {useNavigate} from "react-router";
import OAuth from "../components/OAuth";

export interface SignInInputs {
  email: string;
  password: string;
}
export default function SignIn() {
  const {showToast} = useAppContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isTypePassword, setIsTypePassword] = useState("password");
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<SignInInputs>();

  const mutation = useMutation(loginApi, {
    onSuccess: (data) => {
      showToast({message: "Loggedin Successfully!", type: "SUCCESS"});
      const user = data.user;
      const userObj = {
        name: user.fullName,
        email: user.email,
        avatar: user.avatar,
      };
      dispatch(signInUser(userObj));
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({message: `⛔ ${error}`, type: "ERROR"});
    },
  });

  const isLoading = mutation.isLoading;

  function handlePasswordToggle() {
    if (isTypePassword === "password") {
      setIsTypePassword("text");
    } else {
      setIsTypePassword("password");
    }
  }

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div>
      {/* With Email */}
      <div className="flex items-center justify-between p-6 gap-10">
        <Logo />
        <div className="flex flex-col">
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">
              Super secure login with wikiTrip.com
            </h2>
            <div className="flex flex-col gap-5">
              <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
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
                    disabled={isLoading}
                  />
                  <span
                    className="absolute right-1 bottom-[10px]"
                    onClick={handlePasswordToggle}
                  >
                    {isTypePassword !== "password" ? (
                      <EyeIcon className="h-5 text-blue-500 opacity-70" />
                    ) : (
                      <EyeSlashIcon className="h-5 text-blue-500 opacity-70" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            <span>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 md:text-xl rounded-md opacity-90 disabled:opacity-60 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging..." : "Login"}
              </button>
            </span>
          </form>
          {/* Without Email */}
          <div className="text-center mt-3">
            <p className="font-mono text-gray-500">OR</p>
            <OAuth disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
