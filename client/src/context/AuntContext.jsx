import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No existe el contexto");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const singIn = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuth(true);
      setUser(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError([]);
    }, 8000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuth(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuth(false);
          setLoading(false);
          return;
        }

        setIsAuth(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ singIn, login, logout, user, isAuth, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
