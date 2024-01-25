import {Link} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {logoutUser} from "../../redux/userSlice";

export default function LoggedIn({avatar}: {avatar: string}) {
  const dispatch = useAppDispatch();
  return (
    <>
      <span className="flex items-center justify-center gap-3">
        <Link to="/my-booking" className="text-white font-sans font-semibold">
          My Bookings
        </Link>
        <Link to="/my-hotels" className="text-white font-sans font-semibold">
          My Hotels
        </Link>
        <Link to="/profile">
          <img
            src={avatar}
            alt="profile"
            className="h-8 rounded-full border-2 border-yellow-600 cursor-pointer"
          />
        </Link>
        <button
          onClick={() => dispatch(logoutUser())}
          className=" bg-white rounded-md p-1  text-blue-600 px-3 font-semibold hover:opacity-85"
        >
          Sign out
        </button>
      </span>
    </>
  );
}
