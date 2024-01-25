import {Link} from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <>
      <span className="flex space-x-2 ">
        <Link
          to="/register"
          className="flex bg-white rounded-md p-1 items-center text-blue-600 px-3 font-semibold hover:opacity-85"
        >
          Register
        </Link>
        <Link
          to="/sign-in"
          className="flex bg-white rounded-md p-1 items-center text-blue-600 px-3 font-semibold hover:opacity-85"
        >
          Sign In
        </Link>
      </span>
    </>
  );
}
