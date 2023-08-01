import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Vivir Chevere
                    </Navbar.Brand>
                    <div>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">
                                <div style={{ fontSize: "2rem" }}>
                                    <i className="bx bxs-user"></i>
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/searcher">
                                <div style={{ fontSize: "2rem" }}>
                                    <i className="bx bx-store"></i>
                                </div>
                            </Nav.Link>
                        </Nav>
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
