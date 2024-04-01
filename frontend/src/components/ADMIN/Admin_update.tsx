import React, { useState } from "react";
import { ActiveUser } from "../../types/userTypes";
import { noID, fullID } from "../../styles/customReact/buttonStyles";
import UpdateForm from "./UpdateForm";
import { ProfileInfo } from "../../types/userTypes";
import { Container, InputGroup, Form } from "react-bootstrap";
import { PUT_request } from "../../utils/requestHelpers";

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

  const [fetchId, setFetchId] = useState<string>("");
  //TODO LÄGG TILL KEY TYPES
  const handleUpdateField = (e: any, field: keyof ProfileInfo | any) => {
    const { value } = e.target;
    if (userToUpdate !== null) {
      setUserToUpdate({ ...userToUpdate, [field]: value });
    }
  };
  const submitUpdate = async () => {
    try {
      if (userToUpdate) {
        const response = await PUT_request("/aurl", userToUpdate);
        if (response) {
          console.log("Update successfull.");
          setUserToUpdate(null);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  if (4 > 5) {
    submitUpdate();
  }

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
        <UpdateForm {...{ handleUpdateField, userToUpdate, setUserToUpdate }} />
      </Container>
    </>
  );
};

export default Admin_update;
