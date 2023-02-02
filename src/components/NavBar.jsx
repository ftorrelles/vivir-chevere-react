import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useState } from "react";


const NavBar = () => {
    const [show, setShow] = useState(false);
    const navigate= useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setShow(true)
        } else {
            navigate("/login")
        }
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container >
                    <Navbar.Brand as={Link} to="/">
                        Friend Shop App
                    </Navbar.Brand>
                    <div>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">
                                <div style={{fontSize:'2rem'}}><i className='bx bxs-user'></i></div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/purchases">
                                <div style={{fontSize:'2rem'}}><i className='bx bx-box'></i></div>
                            </Nav.Link>
                            <Nav.Link onClick={handleShow} href="#">
                                <div style={{fontSize:'2rem'}}><i className='bx bx-cart'></i></div>
                            </Nav.Link>
                        </Nav>
                    </div>
                    
                </Container>
            </Navbar>
            <SideBar show={show} handleClose={handleClose} />
        </>
    );
};

export default NavBar;
