import React from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const ModalForPay = ({ showModalPay, handleClosePay }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const loggedUser = useSelector((state) => state.loggedUser);

    const submit = (data) => {
        const dataForPay = {
            typemovement_id: 5,
            customer_id: loggedUser?.id,
            ingreso: 0.0,
            egreso: data.egreso,
            status: true,
        };
        axios
            .post(`http://localhost:3000/api/v1/cuenta_clientes`, dataForPay)
            .then((response) => console.log(response.data))
            .catch((error) => console.error(error));
        reset(resetForm());
        handleClosePay();
    };

    //reseteo del formulario
    const resetForm = () => {
        return {
            egreso: "",
        };
    };
    return (
        <Modal show={showModalPay} onHide={handleClosePay}>
            <Modal.Header closeButton>
                <Modal.Title>Realizar Pago a empresa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                    onSubmit={handleSubmit(submit)}
                >
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            placeholder="Abono a cuenta por pagar"
                            {...register("egreso", {
                                required: true,
                            })}
                        />
                        <InputGroup.Text>ejemplo 12.50</InputGroup.Text>
                        {errors.egreso && (
                            <p className="error-message">
                                El monto es requerido.
                            </p>
                        )}
                    </InputGroup>
                    <hr />
                    <Row>
                        <Col
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="secondary"
                                onClick={handleClosePay}
                            >
                                Cerrar
                            </Button>
                        </Col>
                        <Col
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button type="submit" variant="primary">
                                Pagar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForPay;
