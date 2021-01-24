import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser } from "../redux/auth/userAction";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const { user, error } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) {
      history.push("/address-book");
    }
  }, [user, history]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUser(values.email, values.password));
  };

  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <h1>Log In!</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email.."
            value={values.email}
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password.."
            value={values.password}
            onChange={handleLoginChange}
          />
        </div>
        {error ? <p>{error}</p> : null}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
