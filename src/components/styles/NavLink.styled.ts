import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 10px;
  font-size: 18px;

  &.active {
    color: red; /* Change this to your preferred active color */
    font-weight: bold;
    border-bottom: 2px solid red;
  }
`;
