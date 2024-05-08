import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import { RegisterFormType } from '../../types/userTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
type Props = {
  registerForm: RegisterFormType;
  handleRegister: any;
  setRegisterForm: React.Dispatch<React.SetStateAction<RegisterFormType>>;
  switchMode: () => void;
};

const Login_Register: React.FC<Props> = ({
  setRegisterForm,
  registerForm,
  handleRegister,
  switchMode,
}) => {
  const navigate = useNavigate();
  const [regErr, setRegErr] = useState<boolean>(false);
  return (
    <>
      <Container>
        <Row>
          <h2>Register to chat up!</h2>
          <Col lg={12}>
            <Form
              onSubmit={async (e) => {
                const reg: boolean = await handleRegister(e);
                if (!reg) {
                  setRegErr(true);
                  setTimeout(() => {
                    setRegErr(false);
                  }, 4000);
                }
                navigate('/login');
              }}
            >
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
              </Button>{' '}
              {regErr ? (
                <p style={{ color: 'red' }}>
                  Something went wrong, invalid login
                </p>
              ) : (
                ''
              )}
            </Form>
          </Col>
        </Row>
        <Button
          onClick={switchMode}
          style={{ backgroundColor: 'yellow', color: 'black' }}
        >
          Back to login
        </Button>
      </Container>
    </>
  );
};

export default Login_Register;
