import React from "react";

type Props = {
  set_login_password: React.Dispatch<React.SetStateAction<string>>;
  set_login_username: React.Dispatch<React.SetStateAction<string>>;
  submit_login_info: (e: any) => void;
  login_password: string;
  login_username: string;
};

const Login_Input: React.FC<Props> = ({
  set_login_password,
  set_login_username,
  submit_login_info,
  login_password,
  login_username,
}) => {
  return (
    <>
      {" "}
      <form
        onSubmit={async (e) => {
          submit_login_info(e);
        }}
      >
        <label htmlFor={"LOGIN-INPUT-FIELD-USERNAME"}>Username</label>
        <input
          id={"LOGIN-INPUT-FIELD-USERNAME"}
          name="username"
          type={"text"}
          min={0}
          max={50}
          value={login_username}
          onChange={(e) => {
            set_login_username(e.target.value);
          }}
        ></input>
        <label htmlFor={"LOGIN-INPUT-FIELD-PASSWORD"}></label>
        <input
          type="password"
          name="password"
          id={"LOGIN-INPUT-FIELD-PASSWORD"}
          value={login_password}
          onChange={(e) => {
            set_login_password(e.target.value);
          }}
        ></input>
        <button type={"submit"}>Login!</button>
      </form>
    </>
  );
};

export default Login_Input;
