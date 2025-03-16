import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="username-input">Username</Label>
        <Input
          id="username-input"
          name="username"
          placeholder="Enter username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
      {username}
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      {password}
      <Button>Login</Button>
    </Form>
  );
};

export default Login;
