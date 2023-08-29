import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

const PasswordRecoveryStep1 = () => {
    //funciones de de react hook form
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const params = {
            ...data,
            frontBaseUrl: window.location.origin + "/#",
        };
        console.log(params);
        axios
            .post(
                "http://localhost:3000/api/v1/customers/sendrecoveryemail",
                params
            )
            .then((resp) => {
                console.log(resp.data);
                alert(
                    "Correo de recuperación enviado. Por favor, revisa tu bandeja de entrada."
                );
                navigate("/login");
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
                <h5>Recuperación de Contraseña - Paso 1</h5>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="email">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese su correo"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <Form.Text className="text-danger">
                                Correo requerido
                            </Form.Text>
                        )}
                    </Form.Group>
                    <br />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button variant="primary" type="submit">
                            Enviar Correo de Recuperación
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    );
};

export default PasswordRecoveryStep1;
