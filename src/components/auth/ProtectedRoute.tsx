import { ReactNode, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type TProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
