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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClassroomPage from "./pages/classroom/ClassroomPage";

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
      {
        path: "/classroom/:id",
        element: <ClassroomPage />,
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

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <RouterProvider router={router} />
          </SocketProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
