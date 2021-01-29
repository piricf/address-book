import React from "react";
import { Input, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/userAction";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <Menu secondary>
      <Link to="/adresar">
        <Menu.Item name="adresar">Adresar</Menu.Item>
      </Link>
      <Link to="/kontakti">
        <Menu.Item name="kontakti">Kontakti</Menu.Item>
      </Link>
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        {user ? (
          <Link to="/" onClick={logout}>
            <Menu.Item>Log Out</Menu.Item>
          </Link>
        ) : (
          <Link to="/">
            <Menu.Item>Log In</Menu.Item>
          </Link>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
