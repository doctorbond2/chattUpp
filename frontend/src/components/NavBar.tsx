import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router";
import { ActiveUser } from "../types/userTypes";
import { LOGGED_OUT } from "../types/userTypes";
import { useNavigate } from "react-router-dom";
type Props = {
  loggedIn: ActiveUser;
  setLoggedIn: React.Dispatch<React.SetStateAction<ActiveUser>>;
};

const mainNavBar: React.FC<Props> = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    if (loggedIn.id) {
      setLoggedIn(LOGGED_OUT);
    }
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">CHATTUP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title={loggedIn.id ? "Profile" : "Logged out"}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => navigate("/login")}>
                  {loggedIn.id ? "Profile" : "Sign in"}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/register")}>
                  {loggedIn.id ? "Friendlist" : "Sign up"}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                {loggedIn.admin_access && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Admin page
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>

              <Nav.Link
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Nav.Link>

              <Nav.Link
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {loggedIn.id && <button onClick={logoutUser}>LOG OUT</button>}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default mainNavBar;
