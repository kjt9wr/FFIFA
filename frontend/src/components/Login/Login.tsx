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
      <h1 className="page-title"> Login to FFIFA </h1>
      <SpinnerWrapper loading={isLoading} />

      <div className="d-flex justify-content-center align-items-center">
        <Form
          style={{
            backgroundColor: "#3a3c4a",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
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
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            disabled={!username || !password || isLoading}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
