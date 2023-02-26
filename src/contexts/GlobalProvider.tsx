import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";

import { NotificationBase } from "../helpers/base/NotificationBase";
import { notificationInstance } from "../helpers/notification";
import { queryClient } from "../services/query";

interface GlobalContextProps {
  notification: NotificationBase;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [notification, setNotification] = useState<NotificationBase>(
    {} as NotificationBase
  );

  useEffect(() => {
    (async () => {
      const instance = await notificationInstance();
      const notificationBase = new NotificationBase(instance);
      setNotification(notificationBase);
    })();
  }, []);

  return (
    <GlobalContext.Provider value={{ notification: notification }}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools position="bottom-right" />
        )}
      </QueryClientProvider>
      <ToastContainer position="bottom-right" />
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
