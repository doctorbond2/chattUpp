import React, { useEffect } from "react";

import { ProfileInfo } from "../../../types/userTypes";
type Props = {
  userToUpdate: ProfileInfo;
  setUserToUpdate: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  setReplica: React.Dispatch<React.SetStateAction<ProfileInfo>>;
};

const UpdateUserForm: React.FC<Props> = ({
  userToUpdate,
  setUserToUpdate,
  setReplica,
}) => {
  useEffect(() => {
    setReplica(userToUpdate);
    console.log("USERTO;", userToUpdate);
    console.log("Replica:", userToUpdate);
    return () => {
      setReplica(null);
    };
  }, []);
  return (
    <>
      <label htmlFor={"update-user-email-input"}>Email:</label>
      <input
        id="update-user-email-input"
        type="email"
        required
        value={userToUpdate?.email}
      />
      <br></br>
      <label htmlFor="update-user-firstname-input">Firstname:</label>
      <input type={"text"} required value={userToUpdate?.firstname} />
      <br></br>
      <label htmlFor="update-user-lastname-input">Lastname:</label>
      <input type={"text"} required value={userToUpdate?.lastname} />
      <br></br>
      <label>role</label>
      <select>
        <option selected={true}>{userToUpdate?.role}</option>
        <option>{userToUpdate?.role === "admin" ? "standard" : "admin"}</option>
      </select>
    </>
  );
};

export default UpdateUserForm;
