import axios from "axios";
import { ReactNode, useEffect } from "react";
import { useClient } from "../hooks/useClient";

interface Props {
  children: ReactNode;
}

export function AxiosInterceptor({ children }: Props) {
  const { addAllNotes } = useClient();

  useEffect(() => {
    addAllNotes();
  }, []);

  axios.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return <>{children}</>;
}
