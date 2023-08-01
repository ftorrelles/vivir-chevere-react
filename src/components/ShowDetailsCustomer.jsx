import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ShowDetailsCustomer = ({ show, handleClose, data }) => {
    return (
        <>
            <Modal className="modal-lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {data.firstName} {data.lastName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>
                            <strong>Cedula de identidad: </strong>{" "}
                            {data.identificationDocument}
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
                            <strong>Cedula verificada: </strong>{" "}
                            {String(data.isVerified)}
                        </li>
                    </ul>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button variant="primary" size="sm">
                            Editar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ShowDetailsCustomer;
