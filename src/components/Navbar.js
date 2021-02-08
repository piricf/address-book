import React, { useEffect, useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/userAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);

  const { user } = useSelector((state) => state.userReducer);

  const logout = () => {
    dispatch(logoutUser());
    history.push("/");
    setRedirect(true);
  };

  // useEffect(() => {
  //   if (!user) {
  //     history.push("/");
  //   }
  // }, [user, history]);

  const redirectTo = redirect;
  if (redirectTo) {
    return <Redirect to="/" />;
  }

  return (
    <Menu secondary>
      {user ? (
        <Menu.Menu position="left">
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
          <Button to="/" onClick={logout}>
            <Menu.Item>Log Out</Menu.Item>
          </Button>
        ) : (
          <Button to="/">
            <Menu.Item>Log In</Menu.Item>
          </Button>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
