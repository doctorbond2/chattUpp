import React from "react";

import { ProfileInfo } from "../../types/userTypes";
type Props = {
  userToUpdate: ProfileInfo;
  setUserToUpdate: React.Dispatch<React.SetStateAction<ProfileInfo>>;
};

const UpdateUserForm: React.FC<Props> = ({ userToUpdate, setUserToUpdate }) => {
  return (
    <>
      {userToUpdate && (
        <>
          <label>firstname:</label>{" "}
          <input
            value={userToUpdate?.firstname}
            onChange={(e) => {
              setUserToUpdate({ ...userToUpdate, firstname: e.target.value });
            }}
            id={"firstname_update_input"}
          />
          <br></br>
          <br></br>
          <label>lastname:</label>{" "}
          <input
            value={userToUpdate?.lastname}
            id={"lastname_update_input"}
            onChange={(e) => {
              setUserToUpdate({ ...userToUpdate, lastname: e.target.value });
            }}
          />
          <br></br>
          <br></br>
          <label>email:</label>
          <input
            type="email"
            value={userToUpdate?.email}
            onChange={(e) => {
              setUserToUpdate({ ...userToUpdate, email: e.target.value });
            }}
          />
          <br></br>
          <br></br>
          <label>Role:</label>{" "}
          <select
            value={userToUpdate.role}
            onChange={(e) => {
              setUserToUpdate({ ...userToUpdate, role: e.target.value });
              console.log(userToUpdate);
            }}
          >
            <option selected={true}>{userToUpdate?.role}</option>
            <option>
              {userToUpdate?.role === "standard" ? "admin" : "standard"}
            </option>
          </select>
          <br></br>
          <br></br>
          <label>Change password</label>
          <br></br>
          <input type="password" placeholder="*Old password WIP*" />
          <br></br>
          <br></br>
          <input id="pw-change-1" type="password" placeholder="New password" />
          <br></br>
          <input
            id="pw-change-2"
            type="password"
            placeholder="Repeat new password"
          />
        </>
      )}
    </>
  );
};

export default UpdateUserForm;
