import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const value = {
    userInfo,
    setUserInfo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
