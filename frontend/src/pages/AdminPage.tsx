import React, { useEffect } from "react";
import Admin_update from "../components/ADMIN/update/Admin_update";
import { useNavigate } from "react-router-dom";
import { ActiveUser } from "../types/userTypes";
import { Tabs, Tab } from "react-bootstrap";
type Props = { loggedIn: ActiveUser };

const AdminPage: React.FC<Props> = ({ loggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn.admin_access) {
      console.error("REJECTED: NOT ADMIN");
      navigate("/");
    } else {
      console.log("Welcome admin!");
    }
  }, []);
  //UPDATE USER CONTROL FETCH

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
          <Admin_update {...{ loggedIn }} />
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
