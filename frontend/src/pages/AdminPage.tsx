import React, { useEffect, useState } from "react";
import Admin_update from "../components/ADMIN/Admin_update";
import { GET_request } from "../utils/requestHelpers";
import { useNavigate } from "react-router-dom";
import { ActiveUser } from "../types/userTypes";
import { ProfileInfo } from "../types/userTypes";
import { Tabs, Tab } from "react-bootstrap";
type Props = { loggedIn: ActiveUser };

const AdminPage: React.FC<Props> = ({ loggedIn }) => {
  const [userToUpdate, setUserToUpdate] = useState<ProfileInfo>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn.admin_access) {
      console.error("REJECTED: NOT ADMIN");
      navigate("/");
    } else {
      console.log("Welcome admin!");
    }
  }, []);
  //UPDATE CONTROL
  const getUserById = async (url: string, id: string) => {
    try {
      const response = await GET_request(url + "/" + id);
      if (response.data) {
        setUserToUpdate({ ...response.data });
      } else {
        console.log("Something went wrong, user not found");
        console.error(response.status);
        if (response.statusText) {
          console.log(response.statusText);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <>
      <Tabs
        defaultActiveKey="create"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="create" title="Create"></Tab>
        <Tab eventKey="update" title="Update">
          <Admin_update
            {...{ loggedIn, getUserById, userToUpdate, setUserToUpdate }}
          />
        </Tab>
        <Tab eventKey="delete" title="Delete">
          Tab content for Contact
        </Tab>
        <Tab eventKey="users" title="Userlist">
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
};

export default AdminPage;
