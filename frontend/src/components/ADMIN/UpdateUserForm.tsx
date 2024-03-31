import React from "react";
import { ProfileInfo } from "../../types/userTypes";
type Props = {
  userToUpdate: ProfileInfo;
  setUserToUpdate: React.Dispatch<React.SetStateAction<ProfileInfo>>;
};

const UpdateForm: React.FC<Props> = ({ userToUpdate, setUserToUpdate }) => {
  return (
    <>
      {userToUpdate && (
        <form>
          <label>firstname:</label>{" "}
          <input
            value={userToUpdate?.firstname}
            onChange={(e) => {
              setUserToUpdate({ ...userToUpdate, firstname: e.target.value });
            }}
          />
          <br></br>
          <br></br>
          <label>lastname:</label> <input value={userToUpdate?.lastname} />
          <br></br>
          <br></br>
          <label>Role:</label>{" "}
          <select>
            <option selected={true}>{userToUpdate?.role}</option>
            <option>
              {userToUpdate?.role === "standard" ? "admin" : "standard"}
            </option>
          </select>
        </form>
      )}
    </>
  );
};

export default UpdateForm;
