import { createContext, ReactNode, useState, useContext } from "react";

type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type TError = {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
};

type TAuthContext = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userDetails: TUser) => Promise<void>;
  logout: () => void;
};

type TProps = {
  children: ReactNode;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children }: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response?.ok) {
      if (data?.errors) {
        const errorMessage =
          data?.errors?.map((error: TError) => error?.message).join(", ") ||
          "An unknown error occurred";
        throw new Error(errorMessage);
      } else {
        throw new Error(data?.message);
      }
    }

    const { token } = data;
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const register = async (userDetails: TUser): Promise<void> => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();
    if (!response?.ok) {
      if (data?.errors) {
        const errorMessage =
          data?.errors?.map((error: TError) => error?.message).join(", ") ||
          "An unknown error occurred";
        throw new Error(errorMessage);
      } else {
        throw new Error(data?.message);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
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
