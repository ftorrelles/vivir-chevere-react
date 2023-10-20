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
import { useNavigate } from "react-router-dom";
import { setSelectedCustomerForMovements } from "../store/slices/selectedCustomerForMovements.slice";
import { Link } from "react-router-dom";

const Searcher = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //estados de filtro
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [identification_document, setIdentification_document] = useState("");

    // Acceder a los clientes desde el estado de Redux.

    const loggedUser = useSelector((state) => state.loggedUser);
    const customers = useSelector((state) => state.customers);

    useEffect(() => {
        dispatch(getCustomersThunk()); // Cargar los datos iniciales de los clientes
    }, [dispatch]);

    const handleFilter = () => {
        const filterOptions = {
            first_name,
            last_name,
            identification_document,
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

    //pages Order
    const handleOrder = (customerOrderName) => {
        dispatch(setSelectedCustomerForMovements(customerOrderName));
        localStorage.setItem(
            "selectedCustomerForMovements",
            JSON.stringify(customerOrderName)
        ); // Guardar el usuario seleccionado
        navigate("/orders");
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
                        {loggedUser?.first_name + " " + loggedUser?.last_name}
                    </h6>
                    <h6>Tipo de cuenta: {loggedUser?.Role?.name_role}</h6>
                    <h6>Sede: {loggedUser?.Branches[0]?.name}</h6>
                </div>{" "}
                <hr />
                <br />
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
                <br />
                <h5>Almacen y facturación</h5>
                <Link to="/warehouse">Ingreso al almacen</Link>
                <Link to="/movementControl">Control de movimiento</Link>
            </div>

            <div className="bodySearcher">
                <h2>Buscar cliente</h2>
                <div className="bodySearcher_input">
                    <Col>
                        <InputGroup className="mb-3">
                            <Form.Control
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                id="first_name"
                                type="text"
                                value={first_name}
                                placeholder="Filtrar por nombre"
                                onChange={(event) =>
                                    setFirst_name(
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
                                id="last_name"
                                type="text"
                                value={last_name}
                                placeholder="Filtrar por apellido"
                                onChange={(event) =>
                                    setLast_name(
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
                        id="identification_document"
                        type="text"
                        value={identification_document}
                        placeholder="Filtrar por cédula"
                        onChange={(event) =>
                            setIdentification_document(
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
                                        {customer.first_name}{" "}
                                        {customer.last_name}
                                    </td>
                                    <td>{customer.identification_document}</td>
                                    <td>
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
                                                onClick={() =>
                                                    handleOrder(customer)
                                                }
                                            >
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
