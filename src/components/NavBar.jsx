import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setloggedUser } from "../store/slices/loggedUser.slice";

const NavBar = () => {
    const logged = useSelector((state) => state.loggedUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(logged);
    const handleLogout = () => {
        localStorage.clear();
        dispatch(setloggedUser(null));
        navigate("/");
    };
    const handleChangePass = () => {
        localStorage.clear();
        dispatch(setloggedUser(null));
        navigate("/password_recovery");
    };
    const handleProducts = () => {
        navigate("/products");
    };
    const handleBranch = () => {
        navigate("/warehouse");
    };
    const handleMovements = () => {
        navigate("/movementControl");
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
                                            title={`${logged.first_name} ${logged.last_name}`}
                                        >
                                            <i className="bx bxs-user"></i>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="user-dropdown-menu">
                                        <Dropdown.Item
                                            onClick={handleChangePass}
                                        >
                                            Cambiar contraseña
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>
                                            Cerrar sesión
                                        </Dropdown.Item>
                                        <hr />
                                        <Dropdown.Item onClick={handleProducts}>
                                            Productos
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleBranch}>
                                            Ingreso al almacen
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={handleMovements}
                                        >
                                            Control de movimientos
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
                                            ? `${logged.first_name} ${logged.last_name}`
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
