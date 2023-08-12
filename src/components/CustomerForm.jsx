import React, { useState, useEffect } from "react";
import { Col, Row, Modal, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    createCustomerThunk,
    updateCustomerThunk,
} from "../store/slices/customers.slice";
import { useForm } from "react-hook-form";

const CustomerForm = ({ showForm, handleCloseForm }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const customerSelected = useSelector((state) => state.selectedCustomer);

    const submit = async (data) => {
        // if (Object.keys(errors).length > 0) {
        //     return; // No continuar con el envío del formulario
        // }

        const frontBaseUrl = window.location.origin + "/#";

        // Establecer valores por defecto si no se ingresaron en el formulario
        const defaultTypeCustomerId = "2"; // Cambiar al valor correcto para "Público"
        const defaultRoleId = "2"; // Cambiar al valor correcto para "Sin rol"
        const defaultRef = "1";
        const defaultStatus = "true";

        const formDataWithDefaults = {
            ...data,
            typecustomerId: data.typecustomerId || defaultTypeCustomerId,
            roleId: data.roleId || defaultRoleId,
            ref: data.ref || defaultRef,
            frontBaseUrl: frontBaseUrl,
            username: data.username || `${data.firstName || ""}1234`,
            password: data.password || `${data.firstName || ""}1234`,
            status: data.status || defaultStatus,
        };

        if (customerSelected) {
            dispatch(updateCustomerThunk(formDataWithDefaults));
            // handleCloseForm();
        } else {
            dispatch(createCustomerThunk(formDataWithDefaults));
            resetForm();
            // handleCloseForm();
        }
        console.log(formDataWithDefaults);
        handleCloseForm();
    };

    useEffect(() => {
        customerSelected ? reset(customerSelected) : reset(resetForm());
    }, [customerSelected]);

    const resetForm = () => {
        return {
            firstName: "",
            lastName: "",
            identificationDocument: "",
            email: "",
            phone: "",
            birthdate: "",
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
                                    {errors.firstName && (
                                        <p className="error-message">
                                            El nombre es requerido.
                                        </p>
                                    )}
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
                                    {errors.lastName && (
                                        <p className="error-message">
                                            El apellido es requerido.
                                        </p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Documento de identidad</Form.Label>
                            <Form.Control
                                placeholder="Cedula"
                                {...register("identificationDocument", {
                                    required: true,
                                })}
                            />
                            {errors.identificationDocument && (
                                <p className="error-message">
                                    La cédula es requerida.
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo electronico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <p className="error-message">
                                    El correo electrónico es requerido.
                                </p>
                            )}
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        placeholder="Telefono"
                                        {...register("phone", {
                                            required: true,
                                        })}
                                    />
                                    {errors.phone && (
                                        <p className="error-message">
                                            El teléfono es requerido.
                                        </p>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Fecha de nacimiento"
                                        {...register("birthdate", {
                                            required: true,
                                        })}
                                    />
                                    {errors.birthdate && (
                                        <p className="error-message">
                                            La fecha de nacimiento es requerida.
                                        </p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
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
                                    onClick={handleCloseForm}
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
                                <Button
                                    type="submit"
                                    variant="primary"
                                    // onClick={handleCloseForm}
                                >
                                    Enviar
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
