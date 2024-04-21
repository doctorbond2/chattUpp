import React from "react";
import { LoginStateType } from "../../types/userTypes";
import { Button } from "react-bootstrap";
type Props = {
  submit_login_info: (e: any) => void;
  handleLoginData: (
    e: React.ChangeEvent<HTMLInputElement>,
    input: keyof LoginStateType
  ) => void;
  loginData: LoginStateType;
};

const Login_Input: React.FC<Props> = ({
  submit_login_info,
  handleLoginData,
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
            handleLoginData(e, "username");
          }}
        ></input>
        <label htmlFor={"LOGIN-INPUT-FIELD-PASSWORD"}></label>
        <input
          type="password"
          name="password"
          id={"LOGIN-INPUT-FIELD-PASSWORD"}
          value={loginData.password}
          onChange={(e) => {
            handleLoginData(e, "password");
          }}
        ></input>
        <Button type={"submit"} className="bg-success rounded-pill">
          Login!
        </Button>
      </form>
    </>
  );
};

export default Login_Input;
