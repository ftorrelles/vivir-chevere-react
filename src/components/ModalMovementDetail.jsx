import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ModalMovementDetail = ({
    showMovementDetails,
    handleCloseMovementDetail,
    dataMovemet,
}) => {
    // console.log(dataMovemet);
    const [totalWithoutPromotion, setTotalWithoutPromotion] = useState(0);
    // Calcula el total de los subtotales en función de productsCart
    useEffect(() => {
        const calculateTotal = () => {
            if (dataMovemet && dataMovemet.Movement_items) {
                const subtotal = dataMovemet.Movement_items.reduce(
                    (acc, product) => acc + parseFloat(product.total_line),
                    0
                ).toFixed(2);
                setTotalWithoutPromotion(subtotal);
            }
        };
        calculateTotal();
    }, [dataMovemet]);

    const printMovement = (data) => {
        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.text("Detalles del Movimiento", 80, 10);
        doc.text(
            `Fecha: ${dataMovemet?.movement_date?.slice(0, 10)}  |  Sede: ${
                dataMovemet?.Branch?.name
            }  |  Categoria: ${dataMovemet?.Type_movement?.name}`,
            10,
            30
        );
        doc.text(
            `Quien despacha: ${`${dataMovemet?.dispatcher?.first_name} ${dataMovemet?.dispatcher?.last_name}`}`,
            10,
            40
        );
        doc.text(
            `Quien recibe: ${`${dataMovemet?.customer?.first_name} ${dataMovemet?.customer?.last_name}`}`,
            10,
            50
        );
        // doc.text(`Sede: ${dataMovemet?.Branch?.name}`, 10, 60);
        // doc.text(`Categoria: ${dataMovemet?.Type_movement?.name}`, 10, 70);
        doc.text(`Total: ${totalWithoutPromotion}`, 10, 60);
        doc.text(
            `Descuento: ${(totalWithoutPromotion - dataMovemet.total).toFixed(
                2
            )}`,
            10,
            70
        );
        doc.text(`Total a pagar: ${dataMovemet.total}`, 10, 80);

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
                top: 90,
            },
        });

        doc.save(`Movimiento_${dataMovemet?.id}`);
    };
    // console.log(totalWithoutPromotion);
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
                            <Table striped bordered hover responsive>
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

                            <h6
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    paddingRight: "2rem",
                                }}
                            >
                                <strong>Total: {totalWithoutPromotion}</strong>
                            </h6>
                            <h6
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    paddingRight: "2rem",
                                }}
                            >
                                <strong>
                                    Descuento:{" "}
                                    {(
                                        totalWithoutPromotion -
                                        dataMovemet.total
                                    ).toFixed(2)}
                                </strong>
                            </h6>
                            <h6
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    paddingRight: "2rem",
                                }}
                            >
                                <strong>
                                    Total a pagar: {dataMovemet.total}
                                </strong>
                            </h6>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="secondary"
                        onClick={handleCloseMovementDetail}
                    >
                        Cerrar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => printMovement(dataMovemet)}
                    >
                        Imprimir PDF
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalMovementDetail;
