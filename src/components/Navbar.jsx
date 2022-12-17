import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

function NavbarSection({ handleShow, session, handleSignOut, account }) {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="text-white">
          Psalm Tv
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Tv" id="basic-nav-dropdown">
              <NavDropdown.Item href="/popular">Popular</NavDropdown.Item>
              <NavDropdown.Item href="/rating">Top Rating</NavDropdown.Item>
              <NavDropdown.Item href="/similar">Similar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Movie&Video" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Upcoming">Upcoming</NavDropdown.Item>
              <NavDropdown.Item href="/recommendation">
                Recommendation
              </NavDropdown.Item>
              <NavDropdown.Item href="/similarmovie">
                Similar Movie
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/discussion">Discussion</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {!session && (
            <Button onClick={handleShow} className="buttonnsignin">
              Sign In
            </Button>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            fill="pink"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
          {account?.username && (
            <Button className="Profile">Profile {account?.username}</Button>
          )}
          {session && (
            <Button onClick={handleSignOut} className="buttonsignout">
              Sign Out
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarSection;
