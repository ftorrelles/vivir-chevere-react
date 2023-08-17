import { useState, useEffect } from "react";
import { Col, Row, Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    createCustomerThunk,
    updateCustomerThunk,
} from "../store/slices/customers.slice";
import { useForm } from "react-hook-form";
import axios from "axios";

const CustomerForm = ({ showForm, handleCloseForm }) => {
    //funciones de de react hook form
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    // funciones de redux
    const dispatch = useDispatch();
    const customerSelected = useSelector((state) => state.selectedCustomer);
    const loggedUser = useSelector((state) => state.loggedUser);

    const [roles, setRoles] = useState([]);

    //obtencion de los datos de los roles
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/roles")
            .then((resp) => setRoles(resp.data.roles))
            .catch((error) => console.error(error));
    }, []);
    // console.log(roles);

    //reseteo del formulario
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
    // console.log(customerSelected);

    //obtencion de los datos del cliente a modificar
    useEffect(() => {
        if (customerSelected) {
            setValue("firstName", customerSelected.firstName);
            setValue("lastName", customerSelected.lastName);
            setValue(
                "identificationDocument",
                customerSelected.identificationDocument
            );
            setValue("phone", customerSelected.phone);
            setValue("birthdate", customerSelected.birthdate);
            setValue("email", customerSelected.email);
            setValue("id", customerSelected.id);
            setValue("roleId", customerSelected.roleId);
        } else {
            reset(resetForm());
        }
    }, [customerSelected, setValue]);

    //funcion de cargar los datos del fomulario (envio a las peticiones)
    const submit = async (data) => {
        const allowedFieldsForUpdate = [
            "id",
            "firstName",
            "lastName",
            "identificationDocument",
            "phone",
            "birthdate",
            "roleId",
        ];

        const formDataForUpdate = Object.keys(data)
            .filter((field) => allowedFieldsForUpdate.includes(field))
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});

        if (customerSelected) {
            // console.log(formDataForUpdate);
            // // Convertir el correo electrónico a minúsculas usar cuando se necesite
            // const emailLowerCase = data.email ? data.email.toLowerCase() : "";

            // const formDataWithUpdate = {
            //     ...formDataForUpdate,
            //     email: emailLowerCase, // Usar el correo electrónico en minúsculas
            // };
            dispatch(updateCustomerThunk(formDataForUpdate));
        } else {
            const frontBaseUrl = window.location.origin + "/#";
            const defaultTypeCustomerId = "2";
            const defaultRef = "1";
            const defaultStatus = "true";
            const firstNameFirstLetter = data.firstName
                ? data.firstName.charAt(0)
                : "";
            // Convertir el correo electrónico a minúsculas
            const emailLowerCase = data.email ? data.email.toLowerCase() : "";

            const formDataWithDefaults = {
                ...data,
                typecustomerId: data.typecustomerId || defaultTypeCustomerId,
                ref: data.ref || defaultRef,
                frontBaseUrl: frontBaseUrl,
                username:
                    data.username ||
                    `${firstNameFirstLetter}${Date.now().toString()}`,
                password:
                    data.password ||
                    `${firstNameFirstLetter}${Date.now().toString()}`,
                status: data.status || defaultStatus,
                email: emailLowerCase,
            };
            // console.log(formDataWithDefaults);
            dispatch(createCustomerThunk(formDataWithDefaults));
        }
        reset(resetForm());
        handleCloseForm();
    };

    return (
        <>
            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {customerSelected
                            ? "Formulario de actualización"
                            : "Formulario de registro"}{" "}
                    </Modal.Title>
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
                                disabled={customerSelected ? true : false}
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
                        <hr />
                        <Col>
                            {/* habilitar el campo de roles solo si el rol es "administrador" */}
                            <Form.Group>
                                <Form.Label>Rol</Form.Label>
                                <Form.Control
                                    as="select"
                                    disabled={
                                        loggedUser?.Role?.name_role ===
                                        "Administrador"
                                            ? false
                                            : true
                                    }
                                    {...register("roleId")}
                                    defaultValue="1"
                                >
                                    {/* Aquí renderizar las opciones de roles */}
                                    {roles.map((role) => (
                                        <option key={role.id} value={role?.id}>
                                            {role?.name_role}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
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
                                {customerSelected ? (
                                    <Button type="submit" variant="primary">
                                        Actualizar
                                    </Button>
                                ) : (
                                    <Button type="submit" variant="primary">
                                        Crear
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CustomerForm;
