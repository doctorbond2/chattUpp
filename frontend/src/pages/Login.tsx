import React from 'react';
import Login_Input from '../components/LOGIN/Login_Input';
import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks/AuthContext';
import Login_Register from '../components/LOGIN/Login_Register';
import { POST_request } from '../utils/requestHelpers';
import {
  defaultLoginState,
  LoginStateType,
  defaultRegisterState,
  RegisterFormType,
} from '../types/userTypes';
type Props = {};
const Login: React.FC<Props> = ({}) => {
  const [registerMode, setRegisterMode] = useState<boolean>(false);
  const { login, loggedIn } = useAuth();
  const [loginData, setLoginData] = useState<LoginStateType>(defaultLoginState);
  const navigate = useNavigate();
  const handleLoginData = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: keyof LoginStateType
  ) => {
    setLoginData({ ...loginData, [input]: e.target.value });
  };

  useEffect(() => {
    if (loggedIn.access) {
      navigate('/chat');
    }
  }, []);
  const submit_login_info = async (e: HTMLFormElement) => {
    e.preventDefault();
    console.log('LOGIN BODY:', loginData);
    try {
      await login(loginData);
    } catch (err: any) {
      console.log('Login error: ', err.message);
    }
  };
  const [registerForm, setRegisterForm] =
    useState<RegisterFormType>(defaultRegisterState);
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      registerForm &&
      registerForm.password === registerForm.repeat_password
    ) {
      try {
        const response = await POST_request('/user/create', registerForm);
        if (response) {
          alert(
            `Welcome to chatupp ${registerForm.firstname}! You can now login!`
          );
          setRegisterForm(defaultRegisterState);
          return true;
        } else {
          console.log('Something went wrong with register');
          return false;
        }
      } catch (err: any) {
        console.error(err.message);
        return false;
      }
    } else {
      console.log('Error matching password');
      return false;
      //Set error state message for login field or something
    }
  };
  const switchMode = () => {
    setRegisterMode(!registerMode);
  };
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            marginLeft: '25%',
          }}
        >
          {!loggedIn.access && !registerMode && (
            <Login_Input
              {...{
                handleLoginData,
                submit_login_info,
                loginData,
                switchMode,
              }}
            />
          )}

          {!loggedIn.access && registerMode && (
            <Login_Register
              {...{ registerForm, setRegisterForm, handleRegister, switchMode }}
            />
          )}
        </div>
      </Stack>
    </>
  );
};

export default Login;
