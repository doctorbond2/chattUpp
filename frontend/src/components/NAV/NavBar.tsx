import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../utils/hooks/AuthContext";
import { NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
type Props = {
  // loggedIn: ActiveUser;
  // setLoggedIn: React.Dispatch<React.SetStateAction<ActiveUser>>;
};

const mainNavBar: React.FC<Props> = ({}) => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg" className="bg-info border-bottom">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <Nav.Item className="d-inline-flex">
              {" "}
              <img
                src={"/hubot.svg"}
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
                title={loggedIn?.access ? "Profile" : "Logged out"}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => navigate("/login")}>
                  {loggedIn.access ? "Profile" : "Sign in"}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/register")}>
                  {loggedIn.access ? "Friendlist" : "Sign up"}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                {loggedIn.adminToken && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => navigate("/admin")}>
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
          {loggedIn.access && <button onClick={logout}>LOG OUT</button>}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default mainNavBar;
