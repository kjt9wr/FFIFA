import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import { useLogin } from "../../custom-hooks/useLogin";

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
      <h1 className="text-center"> Login to FFIFA </h1>
      {error && <Alert color="danger">{error.response.data.error}</Alert>}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          <FormGroup>
            <Input
              id="username-input"
              name="username"
              placeholder="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          {username}
          <FormGroup>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {password}
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
