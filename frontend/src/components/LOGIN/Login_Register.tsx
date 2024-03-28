import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { RegisterFormType } from "../../types/userTypes";
import { useState } from "react";
type Props = {
  registerForm: RegisterFormType;
  handleRegister: any;
  setRegisterForm: React.Dispatch<React.SetStateAction<RegisterFormType>>;
};

const Login_Register: React.FC<Props> = ({
  setRegisterForm,
  registerForm,
  handleRegister,
}) => {
  return (
    <>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="register-form-username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={registerForm.username}
            required
            placeholder="Göran"
            onChange={(e) => {
              setRegisterForm({
                ...registerForm,
                username: e.currentTarget.value,
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register-form-firstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            value={registerForm.firstname}
            required
            placeholder="Göran"
            onChange={(e) => {
              setRegisterForm({
                ...registerForm,
                firstname: e.currentTarget.value,
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register-form-lastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            value={registerForm.lastname}
            minLength={0}
            maxLength={40}
            required
            placeholder="Göransson"
            onChange={(e) => {
              setRegisterForm({
                ...registerForm,
                lastname: e.currentTarget.value,
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register-form-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            minLength={6}
            maxLength={100}
            type="email"
            value={registerForm.email}
            placeholder="Enter email"
            required
            onChange={(e) => {
              setRegisterForm({
                ...registerForm,
                email: e.currentTarget.value,
              });
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register-form-password-1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={registerForm.password}
            placeholder="Password"
            required
            onChange={(e) => {
              setRegisterForm({
                ...registerForm,
                password: e.currentTarget.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="register-form-password-2">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            value={registerForm.repeat_password}
            placeholder="Password"
            required
            onChange={(e) => {
              setRegisterForm({
                ...registerForm,
                repeat_password: e.currentTarget.value,
              });
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Let's go!
        </Button>
      </Form>
    </>
  );
};

export default Login_Register;
