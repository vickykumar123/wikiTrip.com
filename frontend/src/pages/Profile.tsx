import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {QueryClient, useMutation, useQuery} from "react-query";
import {currentUserApi, updateUserApi} from "../api/userApi";
import Loader from "../components/ui/Loader";
import {useAppContext} from "../context/AppContext";
import {signInUser} from "../redux/userSlice";
import {useAppDispatch} from "../redux/hooks";
import {Link} from "react-router-dom";

export type UpdateProfileForm = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  avatar: string;
};

export default function Profile() {
  const {showToast} = useAppContext();
  const dispatch = useAppDispatch();
  const queryClient = new QueryClient();
  const {data: user, isLoading} = useQuery("fetchUser", currentUserApi);
  const [isTypePassword, setIsTypePassword] = useState("password");

  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<UpdateProfileForm>({
    defaultValues: {
      id: user?._id,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      avatar: user?.avatar,
    },
  });

  function handlePasswordToggle() {
    if (isTypePassword === "password") {
      setIsTypePassword("text");
    } else {
      setIsTypePassword("password");
    }
  }

  const {mutate, isLoading: updateLoading} = useMutation(updateUserApi, {
    onSuccess: (data) => {
      showToast({message: "Profile Updated Successfully!", type: "SUCCESS"});
      queryClient.invalidateQueries({queryKey: ["fetchUser"]});
      const user = data.user;
      const userObj = {
        name: user.fullName,
        email: user.email,
        avatar: user.avatar,
      };
      dispatch(signInUser(userObj));
    },
    onError: (error: Error) => {
      showToast({message: `⛔ ${error}`, type: "ERROR"});
    },
    onSettled: () => {
      // Invalidate the 'hotelById' query when the mutation is complete
      queryClient.invalidateQueries({queryKey: ["fetchUser"]});
    },
  });

  if (isLoading) return <Loader />;

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className="flex items-center justify-center p-6">
      <div className="flex flex-col w-full max-w-3xl">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold">Update Your Profile</h2>
          <div className="flex flex-col gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
              Email
              <input
                className="border rounded text-gray-800 bg-gray-200 cursor-not-allowed   w-full py-1 px-2 font-medium focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
                disabled={true}
                value={user?.email}
                readOnly
                {...register("email", {required: "This field is required"})}
              />
            </label>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <div className="grid md:grid-cols-2 gap-2">
              <label className="text-gray-700 text-sm font-bold flex-1">
                First Name
                <input
                  className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
                  value={user?.firstName}
                  {...register("firstName", {
                    required: "This field is required",
                  })}
                />
              </label>
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
              <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name
                <input
                  className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
                  value={user?.lastName}
                  {...register("lastName", {
                    required: "This field is required",
                  })}
                />
              </label>
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Update Password
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
                    <EyeIcon className="h-5 text-blue-500 opacity-70" />
                  ) : (
                    <EyeSlashIcon className="h-5 text-blue-500 opacity-70" />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </label>
          </div>

          <span>
            <button
              disabled={updateLoading}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 md:text-xl rounded-md opacity-90 disabled:opacity-60 w-full"
            >
              {updateLoading ? "Updating..." : "Update the Profile"}
            </button>
          </span>
        </form>
        <div className="flex justify-between mt-4">
          <Link
            to="/my-bookings"
            className="bg-blue-900 p-3 text-white rounded-md shadow-md shadow-slate-500 font-medium hover:opacity-85"
          >
            My Bookings
          </Link>

          <Link
            to="/my-hotels"
            className="bg-blue-900 p-3 text-white rounded-md shadow-md shadow-slate-500 font-medium hover:opacity-85"
          >
            My Hotels
          </Link>
        </div>
      </div>
    </div>
  );
}
