import React, { useEffect } from "react";
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
  //MODAL - - - - - - -
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  //MODAL - - - - - - -

  return (
    <>
      <div style={{ border: "1px solid black" }}>
        asd
        <Button variant="primary" onClick={handleShow}>
          {" "}
          asd
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <UpdateUserForm {...{ userToUpdate, setUserToUpdate }} />
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type={"submit"} variant="primary" onClick={handleClose}>
                Understood
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default UpdateForm;
