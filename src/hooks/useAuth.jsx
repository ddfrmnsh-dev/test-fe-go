import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
export const useAuth = () => {
  const {
    isAuthenticated,
    isLoading,
    login,
    logout,
    userInfo,
    setIsLoading,
    isTokenExpired,
  } = useContext(AuthContext);
  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    userInfo,
    setIsLoading,
    isTokenExpired,
  };
};
