import React from "react";
import { Button, Form } from "semantic-ui-react";

const LoginFormView = () => {
  return (
    <div>
      <Form>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email.." />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password!" />
        </Form.Field>
        <Button type="submit">Log In</Button>
      </Form>
    </div>
  );
};

export default LoginFormView;
