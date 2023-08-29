import { useState, useEffect } from "react";
import {
    Col,
    InputGroup,
    Form,
    Button,
    Table,
    Pagination,
} from "react-bootstrap";
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

    const loggedUser = useSelector((state) => state.loggedUser);
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
    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 5; // Cantidad de clientes por página

    //Calculo de índices del primer y último cliente para cada página
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(
        indexOfFirstCustomer,
        indexOfLastCustomer
    );
    // función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="searcher">
            <div className="sidebar">
                <div className="infoUserLoged">
                    <h6>
                        Bienvenido{" "}
                        {loggedUser?.firstName + " " + loggedUser?.lastName}
                    </h6>
                    <h6>Tipo de cuenta: {loggedUser?.Role?.name_role}</h6>
                </div>{" "}
                <hr />
                <h5>Registrar nuevo cliente</h5>
                <div>
                    <span>Formulario aqui</span>
                    <Button
                        type="button"
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                        }}
                        onClick={handleShowForm}
                    >
                        <i className="bx bx-user-plus"></i>
                    </Button>
                </div>
                <hr />
                <h5>Detalles inventario y facturación</h5>
                <p>Invetario sede</p>
                <p>Control de facturacion</p>
            </div>

            <div className="bodySearcher">
                <h2>Buscar cliente</h2>
                <div className="bodySearcher_input">
                    <Col>
                        <InputGroup className="mb-3">
                            <Form.Control
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                id="firstName"
                                type="text"
                                value={firstName}
                                placeholder="Filtrar por nombre"
                                onChange={(event) =>
                                    setFirstName(
                                        event.target.value.toLowerCase()
                                    )
                                }
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <Form.Control
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                id="lastName"
                                type="text"
                                value={lastName}
                                placeholder="Filtrar por apellido"
                                onChange={(event) =>
                                    setLastName(
                                        event.target.value.toLowerCase()
                                    )
                                }
                            />
                        </InputGroup>
                    </Col>
                </div>

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
                    <Button size="sm" variant="primary" onClick={handleFilter}>
                        Buscar
                    </Button>
                    <br />
                    <br />
                    <br />
                </div>
                <br />
                <hr />
                <h3>Resultados</h3>
                <br />
                {/* Tabla de clientes */}
                {currentCustomers && currentCustomers.length > 0 ? (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Nombre y apellido</th>

                                <th>Número de Identificación</th>
                                <th>Comprar</th>
                                <th>Detalles cliente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>
                                        {customer.firstName} {customer.lastName}
                                    </td>
                                    <td>{customer.identificationDocument}</td>
                                    <td>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Button variant="primary" size="sm">
                                                <i className="bx bx-cart"></i>
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        {" "}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                type="button"
                                                onClick={() =>
                                                    handleShow(customer)
                                                }
                                            >
                                                <i className="bx bx-search-alt"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
                <Pagination className="justify-content-center">
                    <Pagination.Prev
                        onClick={() =>
                            setCurrentPage((prevPage) =>
                                prevPage > 1 ? prevPage - 1 : prevPage
                            )
                        }
                        disabled={currentPage === 1}
                    />
                    {Array.from({
                        length: Math.ceil(customers.length / customersPerPage),
                    }).map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() =>
                            setCurrentPage((prevPage) =>
                                prevPage < customers.length / customersPerPage
                                    ? prevPage + 1
                                    : prevPage
                            )
                        }
                        disabled={
                            currentPage ===
                            Math.ceil(customers.length / customersPerPage)
                        }
                    />
                </Pagination>
            </div>

            <ShowDetailsCustomer
                show={show}
                handleClose={handleClose}
                data={dataSelected}
            />
            <CustomerForm
                showForm={showForm}
                handleCloseForm={handleCloseForm}
            />
        </section>
    );
};

export default Searcher;
