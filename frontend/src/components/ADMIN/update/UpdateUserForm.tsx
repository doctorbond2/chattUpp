import React, { useEffect } from "react";

import { ProfileInfo } from "../../../types/userTypes";
type Props = {
  userToUpdate: ProfileInfo;
  setUserToUpdate: React.Dispatch<React.SetStateAction<ProfileInfo>>;
};

const UpdateUserForm: React.FC<Props> = ({ userToUpdate, setUserToUpdate }) => {
  useEffect(() => {
    console.log("USERTO;", userToUpdate);
  }, []);
  return <>Update user form</>;
};

export default UpdateUserForm;
