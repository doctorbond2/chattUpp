import React from "react";
import Login_Input from "../components/LOGIN/Login_Input";
import axios from "axios";
import { useState, useEffect } from "react";
import { ActiveUser } from "../types/userTypes";

type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<ActiveUser>>;
  loggedIn: any;
};
const BaseUrl = import.meta.env.VITE_BaseUrl;

const Login: React.FC<Props> = ({ setLoggedIn, loggedIn }) => {
  const [login_username, set_login_username] = useState<string>("");
  const [login_password, set_login_password] = useState<string>("");
  const [loginData, setLoginData] = useState<any>();

  const submit_login_info = async (e: HTMLFormElement) => {
    console.log(BaseUrl + "api/v1/users/login");
    e.preventDefault();
    const login_body: any = {
      username: login_username,
      password: login_password,
    };
    setLoginData(login_body);
    console.log("LOGIN BODY:", loginData);

    try {
      const response = await axios.post(
        BaseUrl + "api/v1/users/login",
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
  useEffect(() => {}, [login_password, login_username]);

  return (
    <>
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
    </>
  );
};

export default Login;
