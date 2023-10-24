import React from "react";
import { Table, Button, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ModalMovementDetail = ({
    showMovementDetails,
    handleCloseMovementDetail,
    dataMovemet,
}) => {
    // console.log(dataMovemet);
    const printModal = (data) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Detalles del Movimiento", 80, 10);
        doc.text(`Fecha: ${dataMovemet?.movement_date?.slice(0, 10)}`, 10, 20);
        doc.text(
            `Quien despacha: ${`${dataMovemet?.dispatcher?.first_name} ${dataMovemet?.dispatcher?.last_name}`}`,
            10,
            30
        );

        doc.text(
            `Quien recibe: ${`${dataMovemet?.customer?.first_name} ${dataMovemet?.customer?.last_name}`}`,
            10,
            40
        );
        doc.text(`Categoria: ${dataMovemet?.Type_movement?.name}`, 10, 50);
        doc.text(`Total: ${dataMovemet.total}`, 10, 60);

        autoTable(doc, {
            theme: "grid",
            head: [["Cant", "Producto", "P.unit", "Total"]],
            body: data.Movement_items.map((item) => {
                return [
                    item.quantity,
                    item.Product.name,
                    (item.total_line / item.quantity).toFixed(2),
                    item.total_line,
                ];
            }),
            margin: {
                top: 70,
            },
        });

        doc.save(`Movimiento_${dataMovemet?.id}`);
    };

    return (
        <>
            <Modal
                show={showMovementDetails}
                onHide={handleCloseMovementDetail}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Movimiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dataMovemet && (
                        <div>
                            <ul>
                                <li>
                                    {" "}
                                    Fecha:{" "}
                                    {dataMovemet?.movement_date?.slice(0, 10)}
                                </li>
                                <li>
                                    Quien despacha:{" "}
                                    {`${dataMovemet?.dispatcher?.first_name} ${dataMovemet?.dispatcher?.last_name}`}
                                </li>
                                <li>
                                    Quien recibe:{" "}
                                    {`${dataMovemet?.customer?.first_name} ${dataMovemet?.customer?.last_name}`}
                                </li>
                                <li>
                                    Categoria:{" "}
                                    {dataMovemet?.Type_movement?.name}
                                </li>
                            </ul>

                            <h4>Detalles del Movimiento:</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Cant</th>
                                        <th>Producto</th>
                                        <th>P.unit</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataMovemet?.Movement_items?.map(
                                        (item) => (
                                            <tr key={item.id}>
                                                <td>{item.quantity}</td>
                                                <td>{item?.Product?.name}</td>
                                                <td>
                                                    {(
                                                        item.total_line /
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </td>
                                                <td>{item.total_line}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
                            <strong
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    paddingRight: "2rem",
                                }}
                            >
                                Total: {dataMovemet.total}
                            </strong>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseMovementDetail}
                    >
                        Cerrar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => printModal(dataMovemet)}
                    >
                        Imprimir PDF
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalMovementDetail;
