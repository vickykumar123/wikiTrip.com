import {HiMoon, HiSun} from "react-icons/hi2";
import {useDarkMode} from "../../context/DarkModeContext";

export default function DarkModeToggle() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  return (
    <button onClick={toggleDarkMode} className="text-white w-5 h-5">
      {isDarkMode ? <HiSun /> : <HiMoon />}
    </button>
  );
}
