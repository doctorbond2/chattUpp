import React, { useEffect } from "react";
import Login_Input from "../components/LOGIN/Login_Input";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useAuth } from "../utils/hooks/AuthContext";
import { defaultLoginState, LoginStateType } from "../types/userTypes";
type Props = {};

const Login: React.FC<Props> = ({}) => {
  const { login, loggedIn } = useAuth();
  const [loginData, setLoginData] = useState<LoginStateType>(defaultLoginState);
  const handleLoginData = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: keyof LoginStateType
  ) => {
    setLoginData({ ...loginData, [input]: e.target.value });
  };

  const submit_login_info = async (e: HTMLFormElement) => {
    e.preventDefault();
    console.log("LOGIN BODY:", loginData);
    try {
      await login(loginData);
    } catch (err: any) {
      console.log("Login error: ", err.message);
    }
  };
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div style={{ border: "2px solid black" }}>
          <Login_Input
            {...{
              handleLoginData,
              submit_login_info,
              loginData,
            }}
          />
          <h3>Are you logged in?</h3>
          <h4>{loggedIn && loggedIn?.access ? "Yes" : "No"}</h4>
        </div>
      </Stack>
    </>
  );
};

export default Login;
