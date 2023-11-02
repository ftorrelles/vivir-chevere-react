import { useForm } from "react-hook-form";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Card } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

const PasswordRecoveryStep2 = () => {
    const { code } = useParams();
    const location = useLocation();
    //funciones de de react hook form
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const email = decodeURIComponent(
        new URLSearchParams(location.search).get("email")
    );
    console.log(email);

    const [showPassword, setShowPassword] = useState(false); // visibilidad de la contraseña

    const onSubmit = (data) => {
        // console.log(data.newPassword);
        // // const email = decodeURIComponent(
        // //     new URLSearchParams(window.location.search).get("email")
        // // );
        // console.log(email);
        // console.log(code);
        axios
            .patch(
                `https://back-end-vivirchevere.onrender.com/api/v1/customers/reset-password/${code}`,
                {
                    email,
                    newPassword: data.newPassword,
                }
            )
            .then((resp) => {
                console.log(resp.data);
                alert(
                    "Contraseña actualizada exitosamente. Por favor, inicia sesión con tu nueva contraseña."
                );
                navigate("/login"); // Assuming you have a login route
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Card
                style={{
                    maxWidth: 500,
                    margin: "3rem auto",
                    padding: "2rem",
                }}
            >
                <h5>Recuperación de Contraseña - Paso 2</h5>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="newPassword">
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Nueva Contraseña"
                                {...register("newPassword", { required: true })}
                            />
                            {errors.newPassword && (
                                <Form.Text className="text-danger">
                                    Contraseña requerida
                                </Form.Text>
                            )}
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
                        <br />
                    </Form.Group>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button variant="primary" type="submit">
                            Actualizar Contraseña
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    );
};

export default PasswordRecoveryStep2;
