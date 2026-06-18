import { createContext, useContext } from "react";
import type { AdminInfo } from "../types";

export interface AuthContextType {
  admin: AdminInfo | null;
  setAdmin: React.Dispatch<React.SetStateAction<AdminInfo | null>>;
}

const noopSetAdmin = () => {
  console.warn("useAuth digunakan di luar AuthContext.Provider");
};
export const AuthContext = createContext<AuthContextType>({ admin: null, setAdmin: noopSetAdmin });
export const useAuth = () => useContext(AuthContext);
