import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser } from "../redux/auth/userAction";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) {
      history.push("/kontakti");
    }
  }, [user, history]);

  const validation = (values) => {
    let errors = {};
    let Regex = new RegExp("^(?=.*[a-z])(?=.*[0-7])(?=.*[!@#$%^&*])(?=.{6,})");

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!Regex.test(values.password)) {
      errors.password =
        "Password must contain at least 6 characters, one special character, one number and one letter";
    }
    return errors;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    if (
      values !== validation(values).email &&
      values !== validation(values).password
    ) {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    dispatch(createUser(values.email, values.password));
    validation(values);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Login
        </Header>
        <Form size="large" onSubmit={handleLoginSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              name="email"
              value={values.email}
              onChange={handleLoginChange}
            />
            {values.email && <p> {validation(values).email} </p>}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleLoginChange}
            />
            {values.password && <p> {validation(values).password} </p>}
            <Button color="teal" fluid size="large" type="submit">
              Log In
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
