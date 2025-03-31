import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/header/Header";

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};

export default Layout;
