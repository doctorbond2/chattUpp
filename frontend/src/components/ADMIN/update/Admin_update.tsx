import React from 'react';
import { ActiveUser } from '../../../types/userTypes';
// import { noID, fullID } from '../../../styles/customReact/buttonStyles';
// import UpdateModal from './UpdateModal';
// import { GET_request } from '../../../utils/requestHelpers';
// import { ProfileInfo } from '../../../types/userTypes';
// import { Container, InputGroup, Form } from 'react-bootstrap';
type Props = {
  loggedIn: ActiveUser;
};

const Admin_update: React.FC<Props> = (
  {
    // loggedIn,
  }
) => {
  // TODO: Gör att jag kan uppdatera en användare i databasen från min adminpanel
  //En form som skrivs ut när man fetchar en användare.
  //När man sparar formen, så uppdateras användaren.
  // const [userToUpdate, setUserToUpdate] = useState<ProfileInfo>(null);
  // const [productToUpdate, setProductToUpdate] = useState<any>(null);
  // const [fetchId, setFetchId] = useState<string>('');
  // const getUserById = async (url: string, id: string) => {
  //   setUserToUpdate(null);
  //   try {
  //     const response = await GET_request(url + '/' + id);
  //     if (response.data) {
  //       setUserToUpdate({ ...response.data });
  //       console.log(userToUpdate);
  //     } else {
  //       console.log('Something went wrong, user not found');
  //       console.error(response.status);
  //       if (response.statusText) {
  //         console.log(response.statusText);
  //       }
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // };
  // const handleUpdateUser = async () => {};
  // useEffect(() => {
  //   if (userToUpdate) {
  //     setProductToUpdate(null);
  //   }
  //   if (productToUpdate) {
  //     setUserToUpdate(null);
  //   }
  // }, [userToUpdate, productToUpdate]);

  //TODO LÄGG TILL KEY TYPES
  // const handleUpdateField = (e: any, field: keyof ProfileInfo | any) => {
  //   const { value } = e.target;
  //   if (userToUpdate !== null) {
  //     setUserToUpdate({ ...userToUpdate, [field]: value });
  //   }
  // };

  return (
    <>
      <div>Adminupdate?</div>
      {/* <Container className="w-25">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <button
              onClick={async () => {
                await getUserById('/api/v1/users/profile', fetchId);
              }}
              style={fetchId.length === 24 ? fullID : noID}
            >
              {fetchId.length === 24 ? 'GET USER' : 'ENTER ID'}
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

        <h2>{userToUpdate ? 'User found, start editing!' : 'Get a user'}</h2>
        <UpdateModal {...{ userToUpdate, setUserToUpdate }} />
      </Container> */}
    </>
  );
};

export default Admin_update;
