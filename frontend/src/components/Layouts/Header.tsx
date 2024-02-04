import {Link} from "react-router-dom";
import DarkModeToggle from "../ui/DarkModeToggle";
import NotLoggedIn from "./NotLoggedIn";
import {useAppSelector} from "../../redux/hooks";
import LoggedIn from "./LoggedIn";
import {useAppContext} from "../../context/AppContext";

export default function Header() {
  const user = useAppSelector((state) => state.user.user);
  const {isLoggedIn} = useAppContext();
  return (
    <nav className="bg-blue-800 py-6 dark:bg-slate-900 pb-11">
      <div className="container mx-auto flex flex-col sm:flex-row  space-y-4 sm:space-y-0 items-center justify-between">
        <span className="ml-3 sm:ml-0 text-2xl sm:text-3xl text-white font-bold tracking-tight font-mono">
          <Link to="/">wikiTrip.com</Link>
        </span>
        <div className="flex items-center space-x-4">
          {!isLoggedIn && !user && <NotLoggedIn />}
          {user && <LoggedIn avatar={user!.avatar!} />}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
