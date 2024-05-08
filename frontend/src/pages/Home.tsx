import React from 'react';
// import { Container } from 'react-bootstrap';
// import { useEffect, useState } from 'react';
// import { ProfileInfo } from '../types/userTypes';
// import { useAuth } from '../utils/hooks/AuthContext';
// // import ChatterWindow from '../components/CHAT/Chatv2/ChatterWindow';
// import UserAPI from '../utils/helper/apiHandlers/userApi';
// import { useNavigate } from 'react-router-dom';
type Props = {};
const Home: React.FC<Props> = ({}) => {
  // const { loggedIn, profileData } = useAuth();
  // const [allUsersList, setAllUsersList] = useState<ProfileInfo[]>([]);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       refreshChatterList();
  //     } catch (err: any) {
  //       console.log(err.message);
  //     }
  //   };
  //   fetchData();
  //   if (loggedIn.access) {
  //     navigate('/chat');
  //   }
  // }, []);
  // const refreshChatterList = async () => {
  //   try {
  //     const response = await UserAPI.getUserList();
  //     if (response) {
  //       console.log('refreshed chatter list');
  //       setAllUsersList(response.data);
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // };

  return (
    <>
      {/* <Container>
        <div>Homepage</div>
        <h2>All current chatters!</h2>
        {allUsersList &&
          allUsersList
            .filter((user) => user._id !== profileData._id)
            .map((user: ProfileInfo, i: number) => {
              return (
                <ChatterWindow
                  key={'i' + i + 'chattUser'}
                  {...{ profileData, user, refreshChatterList,  }}
                />
              );
            })}
      </Container> */}
      asd
    </>
  );
};

export default Home;
