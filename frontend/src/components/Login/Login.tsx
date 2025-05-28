import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import { useLogin } from "../../custom-hooks/useLogin";
import SpinnerWrapper from "../reusable/SpinnerWrapper";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div>
      <h1 className="page-title">Login to FFIFA</h1>
      <SpinnerWrapper loading={isLoading} />
      <div className="d-flex justify-content-center align-items-center">
        <Form
          className="login-form"
          title="Login to FFIFA"
          onSubmit={handleSubmit}
        >
          {error && <Alert color="danger">{error.response.data.error}</Alert>}
          <FormGroup>
            <Input
              id="username-input"
              name="username"
              placeholder="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              className="login-input"
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </FormGroup>
          <Button
            className="login-btn"
            disabled={!username || !password || isLoading}
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
