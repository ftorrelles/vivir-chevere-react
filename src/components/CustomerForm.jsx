import { Col, Row, Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    createCustomerThunk,
    updateCustomerThunk,
} from "../store/slices/customers.slice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const CustomerForm = ({ showForm, handleCloseForm }) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const customerSelected = useSelector((state) => state.selectedCustomer);

    const submit = (data) => {
        if (customerSelected) {
            dispatch(updateCustomerThunk(data));
        } else {
            dispatch(createCustomerThunk(data));
            reset(resetForm);
        }
    };

    useEffect(() => {
        customerSelected ? reset(customerSelected) : reset(resetForm);
    }, [customerSelected]);

    const resetForm = () => {
        return {
            firstName: "Daniel",
            lastName: "Torrelles",
            identificationDocument: "21241642",
            email: "danieltorrellesg@gmail.com",
            phone: "04243355115",
            birthdate: "1991-04-28",
            typecustomerId: "2",
            roleId: "2",
            password: "daniel1234",
            ref: "4",
            username: "daniel1234",
            status: "true",
            frontBaseUrl: "http://localhost:3000",
        };
    };

    return (
        <>
            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Formulario de registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        placeholder="Nombre"
                                        {...register("firstName", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        placeholder="Apellido"
                                        {...register("lastName", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Documento de identidad</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Cedula"
                                {...register("identificationDocument", {
                                    required: true,
                                })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo electronico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                {...register("email", { required: true })}
                            />
                        </Form.Group>
                        <Row>
                            {/* <Col>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col> */}
                            <Col>
                                <Form.Group>
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        placeholder="Telefono"
                                        {...register("phone", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Fecha de nacimiento"
                                        {...register("birthdadate", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <hr />
                        <br />
                        <Row>
                            <Col
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {" "}
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseForm}
                                >
                                    Close
                                </Button>
                            </Col>
                            <Col
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={handleCloseForm}
                                >
                                    Save user
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CustomerForm;
