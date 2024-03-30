import React from "react";
import Login_Input from "../components/LOGIN/Login_Input";
import { useState } from "react";
import { ActiveUser } from "../types/userTypes";
import { Stack } from "react-bootstrap";
import { POST_request } from "../utils/requestHelpers";
import { defaultLoginState, LoginStateType } from "../types/userTypes";
type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<ActiveUser>>;
  loggedIn: any;
};
const BaseUrl = import.meta.env.VITE_BaseUrl;

const Login: React.FC<Props> = ({ setLoggedIn, loggedIn }) => {
  // const [login_username, set_login_username] = useState<string>("");
  // const [login_password, set_login_password] = useState<string>("");
  const [loginData, setLoginData] = useState<LoginStateType>(defaultLoginState);

  // LOGIN BLOCK
  const submit_login_info = async (e: HTMLFormElement) => {
    e.preventDefault();
    console.log(BaseUrl + "/api/v1/users/login");
    console.log("LOGIN BODY:", loginData);

    try {
      const response = await POST_request("/api/v1/users/login", loginData);
      if (response.data) {
        console.log(response.data?.access);
        if (response.data.access) {
          setLoggedIn({
            access: true,
            admin_access: true,
            id: response.data.user,
          });
          console.log("LOGIN SUCCESS: Logged in as ADMIN");
        } else {
          setLoggedIn({
            access: true,
            admin_access: false,
            id: response.data.user,
          });
          console.log("LOGIN SUCCESS: Logged in as standard user");
        }
      }
      setLoginData(defaultLoginState);
    } catch (err: any) {
      console.error(err.message);
      return;
    }
  };
  // REGISTER BLOCK

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div style={{ border: "2px solid black" }}>
          <Login_Input
            {...{
              submit_login_info,
              setLoginData,
              loginData,
            }}
          />
          <h3>Are you logged in?</h3>
          <h4>{loggedIn.id ? "Yes" : "No"}</h4>
        </div>
      </Stack>
    </>
  );
};

export default Login;
