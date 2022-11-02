import { useContext } from "react";
import { ClientContext } from "../context/context";

export function useClient() {
  return useContext(ClientContext);
}
