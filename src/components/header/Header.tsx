import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  const { isAuthenticated } = useAuth();
  const routes = [
    { to: "/", text: "Home" },
    isAuthenticated
      ? { to: "/logout", text: "Logout" }
      : { to: "/login", text: "LogIn" },
  ];
  return (
    <header className="flex justify-between items-center p-4 bg-sidebar-primary-foreground">
      <p className=" text-primary text-2xl font-bold">ClassRoom app</p>
      <nav>
        <ul>
          {routes?.map(({ to, text }) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "mx-4 text-chart-5 text-xl"
                    : "mx-4 text-sidebar-primary"
                }
                to={to}
              >
                {text}
              </NavLink>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
