import React from "react";
import { UserProvider } from "../contexts/UserContext";

export const useAppProvider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
