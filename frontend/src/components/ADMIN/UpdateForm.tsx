import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ProfileInfo } from "../../types/userTypes";
import UpdateUserForm from "./UpdateUserForm";
type Props = {
  userToUpdate: ProfileInfo;
  setUserToUpdate: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  handleUpdateField: (e: any, field: keyof ProfileInfo | any) => void;
};
//TODO: UpdateForm innehåller modalen.
//Modalen har del-forms. UserUpdateForm, ProductUpdateForm. Dessa applies beroende på vilken data.
const UpdateForm: React.FC<Props> = ({
  userToUpdate,
  setUserToUpdate,
  // handleUpdateField,
}) => {
  //MODAL - - - - - - -
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  //MODAL - - - - - - -
  const [replica, setReplica] = useState<ProfileInfo | null | any>(null);
  const [activeUpdateComponent, setActiveUpdateComponent] = useState<any>(null);
  useEffect(() => {
    if (userToUpdate) {
      setActiveUpdateComponent(
        <UpdateUserForm {...{ userToUpdate, setUserToUpdate }} />
      );
      setReplica(userToUpdate);
    }
  }, []);
  const handle_CANCEL = () => {
    if (userToUpdate) {
      setUserToUpdate(replica);
    }
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          if (userToUpdate) {
            handleShow();
          }
        }}
        disabled={userToUpdate ? false : true}
      >
        {userToUpdate ? "Edit user" : "No user"}
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
            {activeUpdateComponent && activeUpdateComponent}
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
                handle_CANCEL();
              }}
            >
              Cancel
            </Button>
            <Button type={"submit"} variant="primary" onClick={handleClose}>
              Understood
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateForm;
