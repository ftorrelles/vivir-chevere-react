import { Button, Table, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { setAddToCart } from "../store/slices/addToCart.slice";
import { useState, useEffect } from "react";
import axios from "axios";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { useNavigate } from "react-router-dom";

const ModalProducts = ({
    showProducts,
    handleCloseProducts,
    dataWarehouse,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    // Obtener usuario logueado y los productos

    const loggedUser = useSelector((state) => state.loggedUser);
    const branchId = loggedUser?.Branches[0]?.id;
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/products")
            .then((resp) => setProducts(resp.data))
            .catch((error) => console.error(error));
    }, []);

    const productSelected = (data) => {
        // Verificar si el producto ya existe en el almacén de la sede
        const existingProductInWarehouse = dataWarehouse.find(
            (item) => item.product_id === data.id
        );
        if (existingProductInWarehouse) {
            // El producto ya existe en el almacén, puedes mostrar un mensaje de error o manejarlo de acuerdo a tus necesidades.
            alert("El producto ya existe en el almacén de esta sede.");
        } else {
            const addToWarehouse = {
                branch_id: branchId,
                product_id: data?.id,
                quantity: 0,
                status: true,
            };
            dispatch(setIsLoading(true));
            axios
                .post(`http://localhost:3000/api/v1/warehouses`, addToWarehouse)
                .then((resp) => {
                    navigate("/warehouse");
                    handleCloseProducts(); // Cierra el modal
                })
                .catch((error) => console.error(error))
                .finally(() => dispatch(setIsLoading(false)));
        }
    };
    return (
        <>
            <Modal
                className="modal-lg"
                show={showProducts}
                onHide={handleCloseProducts}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Productos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Presentacion</th>
                                <th>Precio publico</th>
                                <th>Precio afiliado</th>
                                <th>Agregar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.products?.map((product) => (
                                <tr key={product?.id}>
                                    <td>{product?.name}</td>
                                    <td>{`${product?.measure} ${product?.Specification?.name}`}</td>
                                    <td>{product?.price_general}</td>
                                    <td>{product?.price_afiliate}</td>

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

export default ModalProducts;
