import { useState, useEffect } from "react";
import { Col, Row, Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    createCustomerThunk,
    updateCustomerThunk,
    getCustomersThunk,
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
    const customers = useSelector((state) => state.customers);
    useEffect(() => {
        dispatch(getCustomersThunk()); // Cargar los datos iniciales de los clientes
    }, []);
    const [roles, setRoles] = useState([]);

    //obtencion de los datos de los roles
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/roles")
            .then((resp) => setRoles(resp.data.roles))
            .catch((error) => console.error(error));
    }, []);

    //reseteo del formulario
    const resetForm = () => {
        return {
            first_name: "",
            last_name: "",
            identification_document: "",
            email: "",
            phone: "",
            birthdate: "",
            ref: "",
        };
    };

    //obtencion de los datos del cliente a modificar
    useEffect(() => {
        if (customerSelected) {
            setValue("first_name", customerSelected.first_name);
            setValue("last_name", customerSelected.last_name);
            setValue(
                "identification_document",
                customerSelected.identification_document
            );
            setValue("phone", customerSelected.phone);
            setValue("birthdate", customerSelected.birthdate);
            setValue("email", customerSelected.email);
            setValue("id", customerSelected.id);
            setValue("role_id", customerSelected.role_id);
            setValue("ref", customerSelected.ref);
        } else {
            reset(resetForm());
        }
    }, [customerSelected, setValue]);

    //funcion de cargar los datos del fomulario (envio a las peticiones)
    const submit = async (data) => {
        const allowedFieldsForUpdate = [
            "id",
            "first_name",
            "last_name",
            "identification_document",
            "phone",
            "birthdate",
            "role_id",
            "ref",
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
            const defaultType_customer_id = "2";
            // const defaultRef = "1";
            const defaultStatus = "true";
            const first_nameFirstLetter = data.first_name
                ? data.first_name.charAt(0)
                : "";
            // Convertir el correo electrónico a minúsculas
            const emailLowerCase = data.email ? data.email.toLowerCase() : "";
            // Verificar si role_id está definido, si no, establecerlo en "1"
            const role_id =
                data.role_id !== null && data.role_id !== undefined
                    ? data.role_id
                    : "1";
            const formDataWithDefaults = {
                ...data,
                type_customer_id:
                    data.type_customer_id || defaultType_customer_id,
                ref: data.ref || defaultRef,
                frontBaseUrl: frontBaseUrl,
                user_name:
                    data.user_name ||
                    `${first_nameFirstLetter}${Date.now().toString()}`,
                password:
                    data.password ||
                    `${first_nameFirstLetter}${Date.now().toString()}`,
                status: data.status || defaultStatus,
                email: emailLowerCase,
                role_id: role_id,
            };
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
                                        {...register("first_name", {
                                            required: true,
                                        })}
                                    />
                                    {errors.first_name && (
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
                                        {...register("last_name", {
                                            required: true,
                                        })}
                                    />
                                    {errors.last_name && (
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
                                {...register("identification_document", {
                                    required: true,
                                })}
                            />
                            {errors.identification_document && (
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
                        <Row>
                            <Col>
                                <Form.Group controlId="dispatcher_id">
                                    <Form.Label>Quien recomienda</Form.Label>
                                    <Form.Control
                                        as="select"
                                        placeholder="Nombre de quien recomienda"
                                        {...register(
                                            "ref",

                                            {
                                                required: true,
                                            }
                                        )}
                                    >
                                        <option value="">
                                            quien recomienda
                                        </option>
                                        {customers.map((customer) => (
                                            <option
                                                key={customer?.id}
                                                value={customer?.id}
                                            >
                                                {`${customer?.first_name} ${customer?.last_name}, ${customer.identification_document}`}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    {errors.dispatcher_id && (
                                        <p className="error-message">
                                            Quien despacha es requerido.
                                        </p>
                                    )}
                                </Form.Group>
                            </Col>
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
                                        {...register("role_id")}
                                        defaultValue="1"
                                    >
                                        {/* Aquí renderizar las opciones de roles */}
                                        {roles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role?.id}
                                            >
                                                {role?.name_role}
                                            </option>
                                        ))}
                                    </Form.Control>
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
