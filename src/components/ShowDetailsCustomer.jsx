import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setSelectedCustomer } from "../store/slices/selectedCustomer.slice";
import { useState } from "react";
import CustomerForm from "./CustomerForm";

const ShowDetailsCustomer = ({ show, handleClose, data }) => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);
    const selected = (data) => {
        dispatch(setSelectedCustomer(data));
        setShowForm(true);
        handleClose();
    };
    return (
        <>
            <Modal className="modal-lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {data.first_name} {data.last_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>
                            <strong>Cedula de identidad: </strong>{" "}
                            {data.identification_document}
                        </li>
                        <li>
                            <strong>Rol: </strong> {data?.Role?.name_role}
                        </li>
                        <li>
                            <strong>Tipo de cliente: </strong>{" "}
                            {data?.TypeCustomer?.name}
                        </li>
                        <li>
                            <strong>Auspiciador: </strong> {data?.ref}
                        </li>
                        <li>
                            <strong>Correo Electronico: </strong> {data.email}
                        </li>
                        <li>
                            <strong>Telefono: </strong> {data.phone}
                        </li>
                        <li>
                            <strong>Fecha de nacimiento: </strong>{" "}
                            {data.birthdate}
                        </li>
                        <li>
                            <strong>Email verificado: </strong>{" "}
                            {data.is_verified
                                ? "Si fue verificado"
                                : "No fue verificado"}
                            {}
                        </li>
                    </ul>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            onClick={() => selected(data)}
                            variant="primary"
                            size="sm"
                        >
                            Editar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <CustomerForm
                showForm={showForm}
                handleCloseForm={handleCloseForm}
            />
        </>
    );
};

export default ShowDetailsCustomer;
