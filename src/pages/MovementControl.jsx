import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalMovementDetail from "../components/ModalMovementDetail";

const MovementControl = () => {
    const [movements, setMovements] = useState([]);
    const [selectedMovement, setSelectedMovement] = useState([]);

    const [filteredMovement, setFilteredMovement] = useState([]);

    const loggedUser = useSelector((state) => state.loggedUser);
    // console.log(loggedUser);

    // Realiza una solicitud para obtener la lista de movimientos con sus items
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/movements")
            .then((response) => {
                setMovements(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los movimientos:", error);
            });
    }, []);

    // Filtrar almacenes por sede del usuario autenticado
    function sortByDate(movements) {
        return movements?.sort((a, b) => {
            const dateA = new Date(a.movement_date);
            const dateB = new Date(b.movement_date);
            return dateB - dateA;
        });
    }
    useEffect(() => {
        const filtered = movements?.movements?.filter((movement) => {
            return movement?.branch_id == loggedUser?.Branches[0]?.id;
        });
        setFilteredMovement(sortByDate(filtered));
    }, [movements]);
    // console.log(filteredMovement);

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
    // console.log(movements);
    // console.log(movementItems);
    // console.log(selectedMovement);
    return (
        <div className="PagesMovementControl">
            <h4>Control de Movimientos</h4>
            <ul>
                <li>Sede: {loggedUser?.Branches[0]?.name}</li>
                <li>
                    Responsable de sede:{" "}
                    {`${loggedUser?.first_name} ${loggedUser?.last_name} (${loggedUser?.Role?.name_role})`}
                </li>
            </ul>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Categoria</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMovement?.map((movement) => (
                        <tr key={movement.id}>
                            <td>{movement.id}</td>
                            <td>{movement.movement_date.slice(0, 10)}</td>
                            <td>{movement?.Type_movement?.name}</td>
                            <td>{movement.total}</td>
                            <td>
                                <Button
                                    onClick={() =>
                                        showMovementDetails(movement)
                                    }
                                >
                                    Ver Detalles
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalMovementDetail
                showMovementDetails={showDetailsModal}
                handleCloseMovementDetail={closeDetailsModal}
                dataMovemet={selectedMovement}
            />
        </div>
    );
};

export default MovementControl;
