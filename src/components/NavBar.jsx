import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setloggedUser } from "../store/slices/loggedUser.slice";

const NavBar = () => {
    const logged = useSelector((state) => state.loggedUser);
    const dispatch = useDispatch();
    // const history = useHistory();

    // console.log(logged);
    const handleLogout = () => {
        localStorage.clear();
        dispatch(setloggedUser(null));
        // history.push("/"); // Redirige a la página de inicios
    };
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Vivir Chevere
                    </Navbar.Brand>
                    <div>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/searcher">
                                <div style={{ fontSize: "2rem" }}>
                                    <i className="bx bx-store"></i>
                                </div>
                            </Nav.Link>
                            {logged ? (
                                <Dropdown>
                                    <Dropdown.Toggle
                                        // variant="secondary"
                                        id="dropdown-basic"
                                        className="user-dropdown-toggle"
                                    >
                                        <div
                                            style={{
                                                fontSize: "2rem",
                                                display: "inline-block", // Agregar esta propiedad para evitar la flecha hacia abajo
                                            }}
                                            title={`${logged.firstName} ${logged.lastName}`}
                                        >
                                            <i className="bx bxs-user"></i>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="user-dropdown-menu">
                                        <Dropdown.Item href="/account-settings">
                                            Configuración de la cuenta
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>
                                            Cerrar sesión
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Nav.Link as={Link} to="/login">
                                    <div style={{ fontSize: "2rem" }}>
                                        <i className="bx bxs-user"></i>
                                    </div>
                                </Nav.Link>
                            )}

                            {/* <Nav.Link as={Link} to="/login">
                                <div
                                    style={{ fontSize: "2rem" }}
                                    title={
                                        logged
                                            ? `${logged.firstName} ${logged.lastName}`
                                            : null
                                    }
                                >
                                    <i className="bx bxs-user"></i>
                                </div>
                            </Nav.Link> */}
                        </Nav>
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
