import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storeToken = (serverToken) => {
    return sessionStorage.setItem("token", serverToken);
  };
  const getToken = async () => {
    return await sessionStorage.getItem("token");
  };

  return (
    <AuthContext.Provider value={{ storeToken, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextvalue = useContext(AuthContext);
  if (!authContextvalue) {
    throw new Error("UseAuth Used Outside of the Provider !!");
  }
  return authContextvalue;
};
