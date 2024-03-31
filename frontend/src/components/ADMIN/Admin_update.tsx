import React, { useState } from "react";
import { ActiveUser } from "../../types/userTypes";
import { noID, fullID } from "../../styles/customReact/buttonStyles";
import UpdateUserForm from "./UpdateUserForm";
import { ProfileInfo } from "../../types/userTypes";
import { Container, Modal, Button, InputGroup, Form } from "react-bootstrap";

type Props = {
  loggedIn: ActiveUser;
  getUserById: (url: string, id: string) => Promise<void>;
  userToUpdate: ProfileInfo;
  setUserToUpdate: React.Dispatch<React.SetStateAction<ProfileInfo>>;
};

const Admin_update: React.FC<Props> = ({
  // loggedIn,
  getUserById,
  userToUpdate,
  setUserToUpdate,
}) => {
  // TODO: Gör att jag kan uppdatera en användare i databasen från min adminpanel
  //En form som skrivs ut när man fetchar en användare.
  //När man sparar formen, så uppdateras användaren.
  const [show, setShow] = useState(false);
  const [fetchId, setFetchId] = useState<string>("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container className="w-25">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <button
              onClick={async () => {
                await getUserById("/api/v1/users/profile", fetchId);
              }}
              style={fetchId.length === 24 ? fullID : noID}
            >
              {fetchId.length === 24 ? "GET USER" : "ENTER ID"}
            </button>
          </InputGroup.Text>
          <Form.Control
            placeholder="mongoid"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={fetchId}
            onChange={(e) => {
              setFetchId(e.target.value);
            }}
          />
        </InputGroup>

        <h2>{userToUpdate?.firstname}</h2>
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
      </Container>

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
          {userToUpdate ? (
            <UpdateUserForm {...{ userToUpdate, setUserToUpdate }} />
          ) : (
            "Error fetching user."
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Admin_update;
