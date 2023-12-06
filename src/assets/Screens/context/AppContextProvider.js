import { createContext, useEffect, useMemo,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
export const AppContext = createContext();

export default function AppContextProvider  ({ children })  {
  const [user, setUser] = useState({})
  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    window.localStorage.setItem("myaccount", JSON.stringify(data));
  };
  // call this function to sign out logged in user
  const logout = () => {
    setUser({});
  };
  useEffect(()=>{

    let uData=localStorage.getItem("myaccount");
    if (uData!="null"&& uData!=null && uData!=undefined) {
      setUser(JSON.parse(uData))
    }
  },[])


  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
