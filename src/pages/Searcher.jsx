import { useState, useEffect } from "react";
import { Col, InputGroup, Form, Button, Table, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    filterCustomersThunk,
    getCustomersThunk,
} from "../store/slices/customers.slice";
import ShowDetailsCustomer from "../components/ShowDetailsCustomer";
import CustomerForm from "../components/CustomerForm";

const Searcher = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identificationDocument, setIdentificationDocument] = useState("");

    // Acceder a los clientes desde el estado de Redux.
    const customers = useSelector((state) => state.customers);

    useEffect(() => {
        dispatch(getCustomersThunk()); // Cargar los datos iniciales de los clientes
    }, [dispatch]);

    const handleFilter = () => {
        const filterOptions = {
            firstName,
            lastName,
            identificationDocument,
        };
        dispatch(filterCustomersThunk(filterOptions));
    };

    //modal detalles cliente
    const [dataSelected, setDataSelected] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (info) => {
        setShow(true);
        setDataSelected(info);
    };

    //modal crear cliente
    //Show form
    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShow(false);
    const handleShowForm = () => setShowForm(true);

    return (
        <div>
            <h2>Buscar cliente</h2>
            <br />
            <Row xs={1} md={2} lg={2}>
                <Col lg={7} style={{ marginTop: "1rem" }}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                            id="firstName"
                            type="text"
                            value={firstName}
                            placeholder="Filtrar por nombre"
                            onChange={(event) =>
                                setFirstName(event.target.value.toLowerCase())
                            }
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                            id="lastName"
                            type="text"
                            value={lastName}
                            placeholder="Filtrar por apellido"
                            onChange={(event) =>
                                setLastName(event.target.value.toLowerCase())
                            }
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                            id="identificationDocument"
                            type="text"
                            value={identificationDocument}
                            placeholder="Filtrar por cédula"
                            onChange={(event) =>
                                setIdentificationDocument(
                                    event.target.value.toLowerCase()
                                )
                            }
                        />
                    </InputGroup>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={handleFilter}
                        >
                            Buscar
                        </Button>
                        <br />
                        <br />
                        <br />
                    </div>
                </Col>
                <Col
                    lg={5}
                    style={{
                        display: "flex",
                        // justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {" "}
                    <h3>Registrar nuevo cliente</h3>
                    <h5>Por favor llenar el siguiente formulario</h5>
                    <Button
                        type="button"
                        style={{
                            backgroundColor: "transparent",
                        }}
                        onClick={handleShowForm}
                    >
                        <i className="bx bx-user-plus"></i>
                    </Button>
                </Col>
            </Row>
            <br />
            <hr />
            <h3>Resultados</h3>
            <br />
            {/* Tabla de clientes */}
            {customers && customers.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Número de Identificación</th>
                            <th>Tipo de Cliente</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.identificationDocument}</td>
                                <td>{customer?.typeCustomer?.name}</td>
                                <td>
                                    <Button variant="primary" size="sm">
                                        Comprar
                                    </Button>{" "}
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        type="button"
                                        onClick={() => handleShow(customer)}
                                    >
                                        ver detalles
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No se encontraron resultados.</p>
            )}

            <ShowDetailsCustomer
                show={show}
                handleClose={handleClose}
                data={dataSelected}
            />
            <CustomerForm
                showForm={showForm}
                handleCloseForm={handleCloseForm}
            />
        </div>
    );
};

export default Searcher;
