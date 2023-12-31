import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AlertError from "../components/AlertError";
import { setloggedUser } from "../store/slices/loggedUser.slice";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.loggedUser);

    const [showPassword, setShowPassword] = useState(false); // visibilidad de la contraseña

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convertir el correo electrónico a minúsculas
        const lowerCaseEmail = email.toLowerCase();

        const data = {
            email: lowerCaseEmail, // Usar el correo electrónico en minúsculas
            password,
        };
        dispatch(setIsLoading(true));
        axios
            .post(
                "https://back-end-vivirchevere.onrender.com/api/v1/customers/login",
                data
            )
            .then((resp) => {
                dispatch(setloggedUser(resp.data.customer));
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem(
                    "loggedUser",
                    JSON.stringify(resp.data.customer)
                ); // Guardar el usuario logueado
                navigate("/searcher");
            })
            .catch((error) => {
                console.error(error);
                setAlert(true);
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
    // const [isLogged, setIsLogged] = useState(localStorage.getItem("token"));
    // const logout = () => {
    //     localStorage.clear();
    //     dispatch(setloggedUser(null));
    //     setIsLogged(false);
    // };
    return (
        <>
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
                            {/* <strong>
                                {" "}
                                correo prueba: 'torrellef93@gmail.com'
                            </strong> */}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            Contraseña{" "}
                            {/* <strong> test data: 'Francisco1234'</strong> */}
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"} // Mostrar contraseña como texto o contraseña
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowPassword(!showPassword)} // Alternar la visibilidad de la contraseña
                            >
                                {showPassword ? (
                                    <i className="bx bx-low-vision"></i>
                                ) : (
                                    <i className="bx bx-show"></i>
                                )}{" "}
                                {/* Cambiar el texto del botón */}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button variant="primary" type="submit">
                            Iniciar
                        </Button>
                    </div>
                </Form>
                <br />
                <Link to="/password_recovery">Olvidaste la contraseña</Link>
            </Card>

            <AlertError isVisible={alert} dismiss={() => setAlert(false)} />
        </>
    );
};

export default Login;
