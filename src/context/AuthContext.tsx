import { createContext, ReactNode, useState, useContext } from "react";
import AuthService from "../services/AuthService";
import { TUser, TAuthContext } from "../types/auth";

type TProps = {
  children: ReactNode;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children }: TProps) => {
  const [{ isAuthenticated, token }, setAuthState] = useState(() => {
    const token = localStorage.getItem("token");

    return {
      token,
      isAuthenticated: !!token,
    };
  });

  const login = async (email: string, password: string): Promise<void> => {
    const { token } = await AuthService.login(email, password);
    setAuthState({
      token,
      isAuthenticated: !!token,
    });
    localStorage.setItem("token", token);
  };

  const register = async (userDetails: TUser): Promise<void> => {
    await AuthService.register(userDetails);
  };

  const logout = () => {
    AuthService.logout();
    setAuthState({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
