import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../utils/hooks/AuthContext';
import { NavDropdown, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSocketV2 } from '../../utils/hooks/SocketContextV2';
import localStorageKit from '../../utils/helper/localstorageKit';
type Props = {
  // loggedIn: ActiveUser;
  // setLoggedIn: React.Dispatch<React.SetStateAction<ActiveUser>>;
};

const mainNavBar: React.FC<Props> = ({}) => {
  const { loggedIn, logout, profileData } = useAuth();
  const navigate = useNavigate();
  const { socket, room: activeRoom } = useSocketV2();
  const [newNotifications, setNewNotifications] = useState<boolean>(false);
  const handleNavNotification = (data: any) => {
    if (activeRoom !== data.room) {
      const currentNotifications = localStorageKit.getNavNotification();
      if (!currentNotifications.includes(data.room)) {
        localStorageKit.notificationStorage(data.room);
        const updatedNotifications = localStorageKit.getNavNotification();
        setNewNotifications((prev) => updatedNotifications.length);
      }
    }
  };
  const handleJoinNotification = (data: string) => {
    if (data === activeRoom) {
      setNewNotifications(false);
      console.log(newNotifications);
    }
  };
  const mountNotificationSocket = () => {
    socket.on('notification_message', handleNavNotification);
    socket.on('join_notification', handleJoinNotification);
  };
  const unMountNotificationSocket = () => {
    socket.off('notification_message', handleNavNotification);
    socket.off('join_notification', handleJoinNotification);
  };
  useEffect(() => {
    if (!socket) {
      return;
    }
    console.log('mounting for nav');
    mountNotificationSocket();
    return () => {
      if (!socket) {
        return;
      }
      unMountNotificationSocket();
    };
  }, [socket, loggedIn]);

  useEffect(() => {
    const news = localStorageKit.getNavNotification();
    if (news.length > 0) {
      setNewNotifications(true);
    } else {
      setNewNotifications(false);
    }
  }, [activeRoom]);

  return (
    <>
      <Navbar expand="lg" className="bg-info border-bottom">
        <Container>
          <Navbar.Brand
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <Nav.Item className="d-inline-flex">
              {' '}
              <img
                src={'/hubot.svg'}
                width="60"
                height="45"
                className="align-top "
                alt="chattupp-logo"
              />
              <h1>CHATT UPP</h1>
            </Nav.Item>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title={loggedIn?.access ? 'Profile' : 'Logged out'}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => navigate('/login')}>
                  {loggedIn.access ? 'Profile' : 'Sign in'}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/register')}>
                  {loggedIn.access ? 'Friendlist' : 'Sign up'}
                </NavDropdown.Item>
                {loggedIn.adminToken && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => navigate('/admin')}>
                      Admin page
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>

              <Nav.Link
                onClick={() => {
                  navigate('/login');
                }}
              >
                {loggedIn.access
                  ? 'Logged in as ' + profileData.firstname
                  : 'Log in'}
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate('/chat');
                }}
              >
                Chat
              </Nav.Link>
              <div>
                {/* {newNotifications && loggedIn.access && newNotifications} */}
                {newNotifications && loggedIn.access && (
                  <Spinner animation="grow" />
                )}
              </div>

              {loggedIn.access ? (
                <Nav.Link
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  Profile
                </Nav.Link>
              ) : (
                ''
              )}
            </Nav>
          </Navbar.Collapse>
          {loggedIn.access && (
            <Button
              onClick={logout}
              className="bg-warning"
              style={{ color: 'black', fontFamily: 'Arial' }}
            >
              LOG OUT
            </Button>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default mainNavBar;
