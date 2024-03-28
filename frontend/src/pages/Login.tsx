import React from "react";
import Login_Input from "../components/LOGIN/Login_Input";
import axios from "axios";
import { useState, useEffect } from "react";
import { ActiveUser } from "../types/userTypes";
import { Stack } from "react-bootstrap";
import Login_Register from "../components/LOGIN/Login_Register";
import { RegisterFormType, defaultRegisterState } from "../types/userTypes";
import { POST_request } from "../utils/requestHelpers";
type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<ActiveUser>>;
  loggedIn: any;
};
const BaseUrl = import.meta.env.VITE_BaseUrl;

const Login: React.FC<Props> = ({ setLoggedIn, loggedIn }) => {
  const [login_username, set_login_username] = useState<string>("");
  const [login_password, set_login_password] = useState<string>("");
  const [loginData, setLoginData] = useState<any>();
  const [registerForm, setRegisterForm] =
    useState<RegisterFormType>(defaultRegisterState);

  // LOGIN BLOCK
  const submit_login_info = async (e: HTMLFormElement) => {
    console.log(BaseUrl + "/api/v1/users/login");
    e.preventDefault();
    const login_body: any = {
      username: login_username,
      password: login_password,
    };
    setLoginData(login_body);
    console.log("LOGIN BODY:", loginData);

    try {
      const response = await axios.post(
        BaseUrl + "/api/v1/users/login",
        JSON.stringify(loginData),
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data) {
        console.log(response.data?.access);
        if (response.data.access) {
          setLoggedIn({
            access: true,
            admin_access: true,
            id: response.data.user,
          });
        }
      }
    } catch (err: any) {
      console.error(err.message);
      return;
    }
    setLoginData({});
    set_login_password("");
    set_login_username("");
  };
  // REGISTER BLOCK
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      registerForm &&
      registerForm.password === registerForm.repeat_password
    ) {
      try {
        const response = await POST_request(
          "/api/v1/users/create",
          registerForm
        );
        if (response.data) {
          console.log("response.data");
          console.log("request successful!");
        }
        setRegisterForm(defaultRegisterState);
      } catch (err: any) {
        console.error(err.message);
        return;
      }
    } else {
      console.log("Error matching password");
      //Set error state message for login field or something
    }
  };
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div style={{ border: "2px solid black" }}>
          <Login_Input
            {...{
              set_login_password,
              set_login_username,
              submit_login_info,
              login_password,
              login_username,
            }}
          />
          <h3>Are you logged in?</h3>
          <h4>{loggedIn.id ? "Yes" : "No"}</h4>
        </div>
        <div>
          <Login_Register
            {...{ registerForm, setRegisterForm, handleRegister }}
          />
        </div>
      </Stack>
    </>
  );
};

export default Login;
