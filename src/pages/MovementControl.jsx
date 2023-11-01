import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Alert } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalMovementDetail from "../components/ModalMovementDetail";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MovementControl = () => {
    const [movements, setMovements] = useState([]);
    const [selectedMovement, setSelectedMovement] = useState([]);
    const [filteredMovement, setFilteredMovement] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branches, setBranches] = useState([]);
    const [typeMovements, setTypeMovements] = useState([]);
    const [selectedTypeMovement, setSelectedTypeMovement] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredBranch, setFilteredBranh] = useState([]);

    const loggedUser = useSelector((state) => state.loggedUser);
    const isAdmin = loggedUser?.role_id == 3;

    // Función para manejar cambios en la fecha seleccionada
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Función para limpiar el filtro de fecha
    const clearDateFilter = () => {
        setSelectedDate(null);
    };
    const clearTypeMovementFilter = () => {
        setSelectedTypeMovement(null);
    };
    // Realiza una solicitud para obtener la lista de movimientos con sus items, las sedes y los tipos de movimientos
    const getTypeMovements = () => {
        axios
            .get("http://localhost:3000/api/v1/typeMovements")
            .then((response) => {
                setTypeMovements(response.data);
            })
            .catch((error) => console.error(error));
    };
    const getBranches = () => {
        axios
            .get("http://localhost:3000/api/v1/branches")
            .then((response) => {
                setBranches(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las sedes:", error);
            });
    };
    const getMovements = () => {
        axios
            .get("http://localhost:3000/api/v1/movements")
            .then((response) => {
                setMovements(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los movimientos:", error);
            });
    };
    useEffect(() => {
        getBranches();
        getMovements();
        getTypeMovements();
    }, []);

    // Filtrar almacenes por sede del usuario autenticado y ordenar por fecha mas actual
    function sortByDate(movements) {
        return movements?.sort((a, b) => {
            const dateA = new Date(a.movement_date);
            const dateB = new Date(b.movement_date);
            return dateB - dateA;
        });
    }
    useEffect(() => {
        let filtered = movements?.movements;
        if (!isAdmin) {
            // No es un administrador, filtra por sede actual del usuario
            filtered = filtered?.filter((movement) => {
                return movement?.branch_id == loggedUser?.Branches[0]?.id;
            });
        } else {
            // Es un administrador y ha seleccionado una sede
            filtered = filtered?.filter((movement) => {
                return movement?.branch_id == selectedBranch?.value;
            });
        }
        if (selectedDate) {
            // Nuevo filtro por fecha
            filtered = filtered?.filter((movement) => {
                const movementDate = new Date(movement.movement_date);
                return (
                    movementDate.toDateString() === selectedDate.toDateString()
                );
            });
        }
        // Filtro por tipo de movimiento
        if (selectedTypeMovement) {
            console.log(selectedTypeMovement);
            filtered = filtered?.filter((movement) => {
                return movement?.typemovement_id == selectedTypeMovement?.value;
            });
        }
        setFilteredMovement(sortByDate(filtered));
    }, [
        movements,
        selectedBranch,
        selectedTypeMovement,
        selectedDate,
        loggedUser,
    ]);

    // Función para mostrar el detalle de un movimiento y sus productos
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const showMovementDetails = (movement) => {
        setSelectedMovement(movement);
        setShowDetailsModal(true);
    };
    // Función para cerrar el modal de detalles
    const closeDetailsModal = () => {
        setSelectedMovement([]);
        setShowDetailsModal(false);
    };

    useEffect(() => {
        if (!isAdmin) {
            const loggedBranch = branches?.branches?.find((branch) => {
                return branch?.id == loggedUser?.Branches[0]?.id;
            });
            setFilteredBranh(loggedBranch ? [loggedBranch] : []);
        } else {
            setFilteredBranh(branches?.branches);
        }
    }, [branches]);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const movementsPerPage = 10; // Cantidad de movimientos por página

    //Calculo de índices del primer y último movimiento para cada página
    const indexOfLastMovement = currentPage * movementsPerPage;
    const indexOfFirstMovement = indexOfLastMovement - movementsPerPage;
    const currentMovement = filteredMovement?.slice(
        indexOfFirstMovement,
        indexOfLastMovement
    );
    // función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // console.log(movements);

    return (
        <section className="movements">
            <div className="sidebarMovement">
                <div>
                    <p>Sede: {loggedUser?.Branches[0]?.name}</p>
                    <p>
                        Encargado:{" "}
                        {`${loggedUser?.first_name} ${loggedUser?.last_name} `}
                    </p>
                    <p></p>Rol:{loggedUser?.Role?.name_role}
                </div>
                <hr />

                <Select
                    defaultValue={selectedBranch}
                    onChange={(selectedOption) => {
                        setSelectedBranch(selectedOption);
                    }}
                    options={filteredBranch?.map((branch) => ({
                        value: branch.id,
                        label: branch.name,
                    }))}
                    placeholder="Selecciona una sede"
                    className="selectBranch"
                />

                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecciona una fecha"
                        className="custom-datepicker"
                    />
                    <div>
                        <Button
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                            }}
                            onClick={clearDateFilter}
                        >
                            <i className="bx bx-trash"></i>
                        </Button>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Select
                        value={selectedTypeMovement}
                        onChange={(selectedOption) => {
                            setSelectedTypeMovement(selectedOption);
                        }}
                        options={typeMovements?.typeMovements?.map(
                            (typeMovement) => ({
                                value: typeMovement?.id,
                                label: typeMovement?.name,
                            })
                        )}
                        placeholder="Tipo movimientos"
                        className="selectTypeMovemet"
                    />
                    <div>
                        <Button
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                            }}
                            onClick={clearTypeMovementFilter}
                        >
                            <i className="bx bx-trash"></i>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bodyMovement">
                {selectedBranch ? (
                    <>
                        <h4>Control de Movimientos</h4>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Recibe</th>
                                    <th>Categoria</th>
                                    <th>Total</th>
                                    <th>Ver</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMovement?.map((movement) => (
                                    <tr key={movement.id}>
                                        <td>{movement.id}</td>

                                        {/* <td>
                                    {new Date(
                                        movement.movement_date
                                    ).toLocaleDateString()}
                                </td> */}
                                        <td>
                                            {movement.movement_date.slice(
                                                0,
                                                10
                                            )}
                                        </td>
                                        <td>{`${movement?.customer?.first_name} ${movement?.customer?.last_name}`}</td>
                                        <td>{movement?.Type_movement?.name}</td>
                                        <td>{movement.total}</td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    showMovementDetails(
                                                        movement
                                                    )
                                                }
                                            >
                                                Ver Detalles
                                            </Button>
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
                                    filteredMovement.length / movementsPerPage
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
                                        filteredMovement.length /
                                            movementsPerPage
                                            ? prevPage + 1
                                            : prevPage
                                    )
                                }
                                disabled={
                                    currentPage ===
                                    Math.ceil(
                                        filteredMovement.length /
                                            movementsPerPage
                                    )
                                }
                            />
                        </Pagination>
                    </>
                ) : (
                    <img src="/sedes.jpg" alt="Buscar sedes" />
                )}

                <ModalMovementDetail
                    showMovementDetails={showDetailsModal}
                    handleCloseMovementDetail={closeDetailsModal}
                    dataMovemet={selectedMovement}
                />
            </div>
        </section>
    );
};

export default MovementControl;
