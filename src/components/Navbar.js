import React, { useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/userAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  const { user } = useSelector((state) => state.userReducer);

  const logout = () => {
    dispatch(logoutUser());
    setRedirect(true);
  };

  const redirectTo = redirect;
  if (redirectTo) {
    return <Redirect to="/" />;
  }

  return (
    <Menu secondary>
      {user ? (
        <Menu.Menu
          style={{ marginLeft: "400px", marginTop: "50px" }}
          position="left"
        >
          <Link to="/adresar">
            <Menu.Item name="adresar">Adresar</Menu.Item>
          </Link>
          <Link to="/kontakti">
            <Menu.Item name="kontakti">Kontakti</Menu.Item>
          </Link>
        </Menu.Menu>
      ) : null}
      <Menu.Menu position="right">
        {user ? (
          <Button onClick={logout}>
            <Menu.Item>Log Out</Menu.Item>
          </Button>
        ) : (
          <Button>
            <Menu.Item>Log In</Menu.Item>
          </Button>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
