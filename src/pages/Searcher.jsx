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
import ModalCreateProduct from "../components/ModalCreateProduct";

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
    useEffect(() => {
        handleFilter();
    }, [first_name, last_name, identification_document]);

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

    //modal crear producto
    //Show form
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const handleCloseCreateProduct = () => setShowModalCreateProduct(false);
    const handleShowCreateProduct = () => setShowModalCreateProduct(true);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10; // Cantidad de clientes por página

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
            <div className="sidebarMovement">
                <div className="infoUserLoged">
                    <h6>
                        Bienvenido{" "}
                        {loggedUser?.first_name + " " + loggedUser?.last_name}
                    </h6>
                    <h6>Tipo de cuenta: {loggedUser?.Role?.name_role}</h6>
                    <h6>Sede: {loggedUser?.Branches[0]?.name}</h6>
                </div>{" "}
                <div className="sidebarCustomer">
                    <h5>Clientes</h5>{" "}
                    <div className="formSidebarCurtomer">
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
                        <div>
                            <p>Crear nuevo cliente</p>
                            <Button
                                type="button"
                                className="btCreateCustomer"
                                onClick={handleShowForm}
                            >
                                Formulario aqui +
                            </Button>
                        </div>
                    </div>
                </div>
                <Link className="linkSidbar" to="/warehouse">
                    Ingreso al almacen
                </Link>
                <Link className="linkSidbar" to="/movementControl">
                    Control de movimiento
                </Link>
                <Link className="linkSidbar" to="/products">
                    Productos
                </Link>
                <Link className="linkSidbar" to="/balanceBranches">
                    Saldo sede
                </Link>
                {loggedUser?.role_id == 3 ? (
                    <div>
                        <Button
                            type="button"
                            className="btCreateCustomer"
                            onClick={handleShowCreateProduct}
                        >
                            Crear nuevo producto
                        </Button>
                    </div>
                ) : null}
            </div>

            <div className="bodySearcher">
                <br />
                {/* Tabla de clientes */}
                {currentCustomers && currentCustomers.length > 0 ? (
                    <>
                        <h3>Resultados</h3>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Nombre y apellido</th>
                                    <th>Identificación</th>
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
                                        <td>
                                            {customer.identification_document}
                                        </td>
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
                                length: Math.ceil(
                                    customers.length / customersPerPage
                                ),
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
                                        prevPage <
                                        customers.length / customersPerPage
                                            ? prevPage + 1
                                            : prevPage
                                    )
                                }
                                disabled={
                                    currentPage ===
                                    Math.ceil(
                                        customers.length / customersPerPage
                                    )
                                }
                            />
                        </Pagination>
                    </>
                ) : (
                    <img src="/noEncontrado.jpg" alt="No encontrado" />
                )}
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
            <ModalCreateProduct
                showModalCreateProduct={showModalCreateProduct}
                handleCloseCreateProduct={handleCloseCreateProduct}
            />
        </section>
    );
};

export default Searcher;
