import React from "react";
import { LoginStateType } from "../../types/userTypes";
type Props = {
  submit_login_info: (e: any) => void;
  setLoginData: React.Dispatch<React.SetStateAction<LoginStateType>>;
  loginData: LoginStateType;
};

const Login_Input: React.FC<Props> = ({
  submit_login_info,
  setLoginData,
  loginData,
}) => {
  return (
    <>
      {" "}
      <form onSubmit={submit_login_info}>
        <label htmlFor={"LOGIN-INPUT-FIELD-USERNAME"}>Username</label>
        <input
          id={"LOGIN-INPUT-FIELD-USERNAME"}
          name="username"
          type={"text"}
          min={0}
          max={50}
          value={loginData.username}
          onChange={(e) => {
            setLoginData({ ...loginData, username: e.target.value });
          }}
        ></input>
        <label htmlFor={"LOGIN-INPUT-FIELD-PASSWORD"}></label>
        <input
          type="password"
          name="password"
          id={"LOGIN-INPUT-FIELD-PASSWORD"}
          value={loginData.password}
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
          }}
        ></input>
        <button type={"submit"}>Login!</button>
      </form>
    </>
  );
};

export default Login_Input;
