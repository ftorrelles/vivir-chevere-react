import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertError from "../components/AlertError";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        axios

            .post(
                "http://localhost:3000/api/v1/customers/login",
                data
            )
            .then((resp) => {
                localStorage.setItem("token", resp.data.token);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                setAlert(true);
            });
    };
    const [isLogged, setIsLogged] = useState(localStorage.getItem("token"));
    const logout = () => {
        localStorage.clear();
        setIsLogged(false);
    };
    return (
        <>
            {isLogged ? (
                <Card
                    style={{
                        maxWidth: 500,
                        margin: "3rem auto",
                        padding: "2rem",
                    }}
                >
                    <i className="bx bx-user"></i>
                    <Button onClick={logout}>Cerrar sesión</Button>
                </Card>
            ) : (
                <Card
                    style={{
                        maxWidth: 500,
                        margin: "3rem auto",
                        padding: "2rem",
                    }}
                >
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <h1>Inicio de sesión</h1>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>
                                Correo electronico
                                <strong>
                                    {" "}
                                    correo prueba: 'miguel@gmail.com'
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>
                                Contraseña{" "}
                                <strong> test data: 'miguel1234'</strong>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Iniciar
                        </Button>
                    </Form>
                </Card>
            )}

            <AlertError isVisible={alert} dismiss={() => setAlert(false)} />
        </>
    );
};

export default Login;
