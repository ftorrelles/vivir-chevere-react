import { useState, useEffect } from "react";
import { Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    filterCustomersThunk,
    getCustomersThunk,
} from "../store/slices/customers.slice";

const Searcher = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identificationDocument, setIdentificationDocument] = useState("");

    const customers = useSelector((state) => state.customers);

    const customerData = Array.isArray(customers) ? customers : [customers];

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

    return (
        <div>
            <h2>Buscar cliente</h2>
            <br />
            <Col style={{ marginTop: "1rem" }}>
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

                <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={handleFilter}
                >
                    Buscar
                </Button>
            </Col>
            <br />
            <hr />
            <h3>Resultados</h3>
            <br />
            {/* Tabla de clientes */}
            {customerData.length > 0 ? (
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
                        {customerData.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.identificationDocument}</td>
                                <td>{customer?.typeCustomer?.name}</td>
                                <td>
                                    <Button variant="primary" size="sm">
                                        Comprar
                                    </Button>{" "}
                                    {/* El botón de editar se puede implementar aquí */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No se encontraron resultados.</p>
            )}
        </div>
    );
};

export default Searcher;
