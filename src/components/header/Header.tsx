import Header from "../styles/Header.styled";
import { StyledNavLink } from "../styles/NavLink.styled";
import { useAuth } from "../../hooks/useAuth";

const HeaderComponent = () => {
  const { isAuthenticated } = useAuth();
  const routes = [
    { to: "/", text: "Home" },
    isAuthenticated
      ? { to: "/logout", text: "Logout" }
      : { to: "/login", text: "LogIn" },
  ];
  return (
    <Header>
      <p>ClassRoom app</p>
      <nav>
        <ul>
          {routes?.map(({ to, text }) => {
            return <StyledNavLink to={to}>{text}</StyledNavLink>;
          })}
        </ul>
      </nav>
    </Header>
  );
};

export default HeaderComponent;
