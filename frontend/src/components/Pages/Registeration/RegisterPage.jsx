import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { signup } from "../../../api/users";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  // use in register page
  function validateEmail(e) {
    const email = e.target.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }

  function validatePassword(e) {
    const psw = e.target.value;
    if (psw.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  function validateName(e) {
    const name = e.target.value;
    if (name.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }

  function canSubmit() {
    return (
      !(
        emailRef.current.value === "" ||
        nameRef.current.value === "" ||
        passwordRef.current.value === ""
      ) &&
      !emailError &&
      !nameError &&
      !passwordError
    );
  }

  /**
   *
   * @param {Event} event
   */
  async function onSubmitHandler(event) {
    event.preventDefault();
    if (!canSubmit()) {
      return;
    }
    try {
      const response = await signup(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      const body = await response.json();
      if (response.status !== 201) {
        setSignupError(true);
        return;
      }
      setAuth({ accessToken: body.accessToken, user: { ...body.user } });
      navigate("/", { replace: true });
    } catch (err) {
      setSignupError(true);
    }
  }

  return (
    <Form
      className="mx-auto"
      style={{ maxWidth: "640px" }}
      onSubmit={onSubmitHandler}
    >
      <h1 className="mt-3 mb-3">Register</h1>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={validateEmail}
          ref={emailRef}
        />
        {emailError && (
          <Form.Text className="text-danger">incorrect email</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          onChange={validateName}
          ref={nameRef}
        />
        {nameError && (
          <Form.Text className="text-danger">enter a valid name</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={validatePassword}
          ref={passwordRef}
        />
        {passwordError && (
          <Form.Text className="text-danger">
            Password must be atleast 8 characters long
          </Form.Text>
        )}
      </Form.Group>
      <Button
        variant="light"
        type="submit"
        className="mt-3"
        disabled={!canSubmit()}
      >
        Signup
      </Button>
      <br />
      <br />
      {signupError && (
        <Form.Text className="text-danger">
          Something went wrong. Contact support for assistance.
        </Form.Text>
      )}
    </Form>
  );
};
