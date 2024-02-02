import {Link, useLocation} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {logoutUser} from "../../redux/userSlice";
import {logout} from "../../api/loginAndLogoutApi";

const NavLinks = [
  {
    link: "/my-booking",
    label: "My Bookings",
  },
  {
    link: "/my-hotels",
    label: "My Hotels",
  },
];

export default function LoggedIn({avatar}: {avatar: string}) {
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const convertedPath = pathname.split("-").join(" ").slice(1);

  async function handleLogout() {
    await logout();
    dispatch(logoutUser());
  }

  return (
    <>
      <span className="flex items-center justify-center gap-3">
        {NavLinks.map((link) => (
          <Link
            key={link.label}
            to={link.link}
            className={`font-sans font-semibold ${
              convertedPath === link.label.toLowerCase()
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/profile">
          <img
            src={avatar}
            alt="profile"
            className="h-8 rounded-full border-2 border-yellow-600 cursor-pointer"
          />
        </Link>
        <button
          onClick={handleLogout}
          className=" bg-white rounded-md p-1  text-blue-600 px-3 font-semibold hover:opacity-85"
        >
          Sign out
        </button>
      </span>
    </>
  );
}
