import {createContext, useContext, useEffect, useState} from "react";

interface DarkMode {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkMode | null>(null);

function DarkModeProvider({children}: {children: React.ReactNode}) {
  const [isDarkMode, setIsDarkMode] = useState(function () {
    const storedValue = localStorage.getItem("dark");
    return storedValue?.startsWith("true") ? true : false;
  });

  useEffect(() => {
    function removeClass() {
      if (isDarkMode) {
        localStorage.setItem("dark", "true");
        document.documentElement.classList.add("dark");
      } else {
        localStorage.setItem("dark", "false");
        document.documentElement.classList.remove("dark");
      }
    }
    removeClass();
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext) as DarkMode;
  if (context === undefined)
    throw new Error("DarkMode context used outside the children context");
  return context;
}

export {DarkModeProvider, useDarkMode};
