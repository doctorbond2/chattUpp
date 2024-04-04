import React, { useEffect } from "react";
import NotFound from "../../SIMPLE/NotFound";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ProfileInfo } from "../../../types/userTypes";
import UpdateUserForm from "./UpdateUserForm";
type Props = {
  userToUpdate: ProfileInfo;
  setUserToUpdate: React.Dispatch<React.SetStateAction<ProfileInfo>>;
};
//TODO: UpdateForm innehåller modalen.
//Modalen har del-forms. UserUpdateForm, ProductUpdateForm. Dessa applies beroende på vilken data.
const UpdateForm: React.FC<Props> = ({ userToUpdate, setUserToUpdate }) => {
  //TODO Fixa types för incoming data
  const [data, setData] = useState(null);
  const [replica, setReplica] = useState<ProfileInfo | any>(null);
  //MODAL - - - - - - -
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  //MODAL - - - - - - -

  const active_Component = () => {
    if (userToUpdate?.email) {
      return (
        <UpdateUserForm {...{ userToUpdate, setUserToUpdate, setReplica }} />
      );
    } else {
      return <NotFound />;
    }
  };
  return (
    <>
      <div style={{ border: "1px solid black" }}>
        <Button
          variant="primary"
          onClick={handleShow}
          disabled={userToUpdate ? false : true}
        >
          {" "}
          {userToUpdate ? "Edit user" : "No user selected"}
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <form onSubmit={handleClose}>
              {active_Component()}
              <Button
                variant="secondary"
                onClick={() => {
                  setUserToUpdate(replica);
                  setReplica(null);
                  handleClose();
                  console.log("replicated:", userToUpdate);
                }}
              >
                Cancel
              </Button>
              <Button type={"submit"} variant="primary">
                Update
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default UpdateForm;
