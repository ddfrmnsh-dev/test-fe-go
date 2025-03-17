import React, { createContext, use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData, token) => {
    setIsAuthenticated(true);
    setUserInfo(userData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo({});
    localStorage.removeItem("token");
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true;

    try {
      const replaceToken = token.replace("Bearer", "");
      const decoded = jwtDecode(replaceToken);

      if (decoded.exp * 1000 < Date.now()) {
        logout();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to decode token", error);
      logout();
      return true;
    }
  };

  useEffect(() => {
    console.log("checkUserInfo:", userInfo);
  }, [userInfo]);

  useEffect(() => {
    console.log("checkIsAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userInfo,
        login,
        logout,
        isLoading,
        setIsLoading,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
