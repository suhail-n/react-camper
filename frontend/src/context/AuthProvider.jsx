import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  function handleSetAuth(userAuthObject) {
    if (userAuthObject === null) {
      localStorage.removeItem("user");
      userAuthObject = {};
    } else {
      localStorage.setItem("user", JSON.stringify(userAuthObject));
    }
    setAuth(userAuthObject);
  }

  useEffect(() => {
    const userAuthString = localStorage.getItem("user");
    if (userAuthString !== null) {
      setAuth(JSON.parse(userAuthString));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth: handleSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
