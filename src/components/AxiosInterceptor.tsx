import axios from "axios";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AxiosInterceptor({ children }: Props) {
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
