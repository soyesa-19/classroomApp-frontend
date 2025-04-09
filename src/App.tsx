import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AuthContextProvider } from "./context/AuthContext";
import Logout from "./pages/auth/Logout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { SocketProvider } from "./context/SocketProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
