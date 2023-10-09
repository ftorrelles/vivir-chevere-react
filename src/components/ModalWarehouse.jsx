import { Button, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setAddToCart } from "../store/slices/addToCart.slice";

const ModalWarehouse = ({
    showWarehouse,
    handleCloseWarehouse,
    dataWarehouse,
}) => {
    const dispatch = useDispatch();
    const productSelected = (data) => {
        dispatch(setAddToCart(data));
    };
    return (
        <>
            <Modal
                className="modal-lg"
                show={showWarehouse}
                onHide={handleCloseWarehouse}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Almacen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Presentacion</th>
                                <th>Stock</th>
                                <th>Precio publico</th>
                                <th>Precio afiliado</th>
                                <th>Agregar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataWarehouse?.map((product) => (
                                <tr key={product?.id}>
                                    <td>{product?.Product?.name}</td>
                                    <td>{product?.Product?.measure}</td>
                                    <td>{product?.quantity}</td>
                                    <td>{product?.Product?.price_general}</td>
                                    <td>{product?.Product?.price_afiliate}</td>

                                    <td>
                                        <Button
                                            type="button"
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                            }}
                                            onClick={() =>
                                                productSelected(product)
                                            }
                                        >
                                            <i className="bx bx-cart-add"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalWarehouse;
