import {createContext, useContext, useState} from "react";
import Toast from "../components/ui/Toast";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  // isLoggedIn: boolean;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export function AppContextProvider({children}: {children: React.ReactNode}) {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // const {isError} = useQuery("validateToken", validateToken);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => setToast(toastMessage),
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};