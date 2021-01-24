import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser } from "../redux/auth/userAction";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

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
      history.push("/adresar");
    }
  }, [user, history]);

  let [errors, setErrors] = useState({});
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

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (
      values.email !== validation(values) &&
      values.password !== validation(values)
    ) {
      dispatch(createUser(values.email, values.password));
    } else {
      setErrors(validation(values));
    }
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          New to us? Sign Up!
        </Header>
        <Form size="large" onSubmit={handleSignupSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              name="email"
              value={values.email}
              onChange={handleSignupChange}
            />
            {errors.email && <Message content={errors.email} />}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleSignupChange}
            />
            {errors.password && <Message content={errors.password} />}
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