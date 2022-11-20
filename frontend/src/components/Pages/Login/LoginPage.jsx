import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../api/users";

export const LoginPage = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/";

  function validateEmail(email) {
    return !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  /**
   *
   * @param {Event} e
   */
  async function handleLogin(e) {
    e.preventDefault();
    if (
      !validateEmail(emailRef.current.value) ||
      passwordRef.current.value.length < 6
    ) {
      setError(true);
      return;
    }
    try {
      const response = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      const body = await response.json();
      if (response.status !== 200) {
        setError(true);
        return;
      }
      setAuth({ accessToken: body.accessToken, user: { ...body.user } });
      navigate(from, { replace: true });
    } catch (err) {
      setError(true);
    }
  }

  return (
    <Form
      className="mx-auto"
      style={{ maxWidth: "640px" }}
      onSubmit={handleLogin}
    >
      <h1 className="mt-3 mb-3">Login</h1>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </Form.Group>
      <Button variant="light" type="submit" className="mt-3">
        Login
      </Button>
      <br />
      <br />
      {error && (
        <Form.Text className="text-danger">
          Email and/or Password is incorrect
        </Form.Text>
      )}
    </Form>
  );
};
