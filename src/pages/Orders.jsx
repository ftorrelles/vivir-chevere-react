import React, { useState, useEffect } from "react";
import { Form, Table, Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ModalWarehouse from "../components/modalWarehouse";
import { setAddToCart } from "../store/slices/addToCart.slice";

const Orders = () => {
    const dispatch = useDispatch();
    const [productsCart, setProductsCart] = useState([]);
    const [typeMovements, setTypeMovements] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [filteredWarehouses, setFilteredWarehouses] = useState([]);
    const [total, setTotal] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Obtener datos de los estados de Redux
    const selectedCustomerForMovements = useSelector(
        (state) => state.selectedCustomerForMovements
    );
    const loggedUser = useSelector((state) => state.loggedUser);
    const addToCart = useSelector((state) => state.addToCart);

    // Obtener tipos de movimientos y almacenes
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/typeMovements")
            .then((resp) => setTypeMovements(resp.data?.typeMovements))
            .catch((error) => console.error(error));

        axios
            .get("http://localhost:3000/api/v1/warehouses")
            .then((resp) => {
                setWarehouses(resp.data.warehouses);
            })
            .catch((error) => console.error(error));
    }, []);

    // Filtrar almacenes por sede del usuario autenticado
    useEffect(() => {
        const filtered = warehouses.filter((warehouse) => {
            return warehouse.branch_id == loggedUser?.Branches[0]?.id;
        });
        setFilteredWarehouses(filtered);
    }, [warehouses, loggedUser]);

    // Modal de almacén
    const [showWarehouse, setShowWarehouse] = useState(false);
    const handleCloseWarehouse = () => setShowWarehouse(false);
    const handleShowWarehouse = () => {
        setShowWarehouse(true);
    };

    // Agregar productos al carrito
    useEffect(() => {
        if (addToCart && Object.keys(addToCart).length > 0) {
            const productExists = productsCart.some(
                (product) => product.product_id === addToCart.product_id
            );
            const availableQuantity = addToCart?.quantity || 0;

            if (!productExists && availableQuantity > 0) {
                let newCart = {
                    product_id: addToCart.product_id,
                    name: addToCart?.Product?.name,
                    price:
                        selectedCustomerForMovements?.TypeCustomer?.name ===
                        "Afiliado"
                            ? addToCart?.Product?.price_afiliate
                            : addToCart?.Product?.price_general,
                    quantity: 1,
                    availableQuantity,
                };

                setProductsCart((prevProducts) => [...prevProducts, newCart]);
                dispatch(setAddToCart({}));
            } else if (availableQuantity <= 0) {
                alert("No hay disponibilidad de este producto en el almacén.");
            }
        }
    }, [addToCart, productsCart, selectedCustomerForMovements]);

    const incrementQuantityHandler = (index) => {
        const updatedProducts = [...productsCart];
        const product = updatedProducts[index];

        if (product.availableQuantity > product.quantity) {
            // Verificar si la cantidad deseada es menor que la cantidad disponible antes de incrementar
            product.quantity += 1;
            setProductsCart(updatedProducts);
        } else {
            alert("No hay suficiente cantidad disponible de este producto.");
        }
    };

    // Función para decrementar la cantidad del producto
    const decrementQuantityHandler = (index) => {
        const updatedProducts = [...productsCart];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity -= 1;
            setProductsCart(updatedProducts);
        }
    };

    // Función para eliminar un producto del carrito
    const deleteProductHandler = (index) => {
        const updatedProducts = [...productsCart];
        updatedProducts.splice(index, 1);
        setProductsCart(updatedProducts);
    };

    // Calcula el total de los subtotales en función de productsCart
    useEffect(() => {
        const calculateTotal = () => {
            const subtotal = productsCart.reduce(
                (acc, product) => acc + product.quantity * product.price,
                0
            );
            setTotal(subtotal);
        };
        calculateTotal();
    }, [productsCart]);

    const submit = (data) => {
        const dataToSend = { ...data, total };
        console.log(dataToSend);
    };

    return (
        <>
            <div className="container_orders">
                <div className="section_forms">
                    <div>
                        <h4>Detalles de la operación</h4>
                        <ul>
                            <li>Sede: {loggedUser?.Branches[0]?.name}</li>
                            <li>
                                Quien despacha:{" "}
                                {`${loggedUser?.first_name} ${loggedUser?.last_name} (${loggedUser?.Role?.name_role})`}
                            </li>
                            <li>
                                Quien recibe:{" "}
                                {`${selectedCustomerForMovements?.first_name} ${selectedCustomerForMovements?.last_name} (${selectedCustomerForMovements?.TypeCustomer?.name})`}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <Form onSubmit={handleSubmit(submit)}>
                            <input
                                type="hidden"
                                {...register("dispatcher_id", {
                                    value: loggedUser?.id,
                                })}
                            />
                            <input
                                type="hidden"
                                {...register("customer_id", {
                                    value: selectedCustomerForMovements?.id,
                                })}
                            />
                            <input
                                type="hidden"
                                {...register("branch_id", {
                                    value: loggedUser?.Branches[0]?.id,
                                })}
                            />
                            <div
                                style={{
                                    backgroundColor: "white",
                                    padding: "1rem",
                                    borderRadius: "1rem",
                                }}
                            >
                                <h5>completar formulario</h5>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        gap: "1rem",
                                    }}
                                >
                                    <div style={{ width: "25%" }}>
                                        <Form.Group controlId="typemovementId">
                                            <Form.Label>
                                                Tipo de movimiento
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                placeholder="Tipo de movimiento"
                                                {...register("typemovementId", {
                                                    required: true,
                                                })}
                                            >
                                                <option value="">
                                                    Seleccione un tipo de
                                                    movimiento
                                                </option>
                                                {typeMovements.map(
                                                    (typeMovement) => (
                                                        <option
                                                            key={
                                                                typeMovement?.id
                                                            }
                                                            value={
                                                                typeMovement?.id
                                                            }
                                                        >
                                                            {typeMovement?.name}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Control>
                                            {errors.typemovementId && (
                                                <p className="error-message">
                                                    El tipo de movimiento es
                                                    requerido.
                                                </p>
                                            )}
                                        </Form.Group>
                                    </div>
                                    <div style={{ width: "15%" }}>
                                        <Form.Group>
                                            <Form.Label>Fecha</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Fecha"
                                                {...register("movement_date", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.movement_date && (
                                                <p className="error-message">
                                                    La fecha de movimiento es
                                                    requerida.
                                                </p>
                                            )}
                                        </Form.Group>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <Form.Group controlId="description">
                                            <Form.Label>
                                                Descripción o Detalles
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                placeholder="Ingrese una descripción o detalles"
                                                {...register("description", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.description && (
                                                <p className="error-message">
                                                    La descripción o detalles
                                                    son requeridos.
                                                </p>
                                            )}
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <h6>
                                Agregar producto{" "}
                                <Button
                                    onClick={handleShowWarehouse}
                                    type="button"
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                    }}
                                >
                                    <i className="bx bx-cart-add"></i>
                                </Button>
                            </h6>

                            <Col>
                                <p>Total a pagar: ${total.toFixed(2)}</p>

                                <Button type="submit" variant="primary">
                                    Confirmar compra
                                </Button>
                            </Col>
                        </Form>
                        <br />
                    </div>
                </div>
                <div className="section_table">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>{" "}
                            </tr>
                        </thead>
                        <tbody>
                            {productsCart.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        {(
                                            product.quantity * product.price
                                        ).toFixed(2)}
                                    </td>
                                    <td>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "1rem",
                                            }}
                                        >
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() =>
                                                    incrementQuantityHandler(
                                                        index
                                                    )
                                                }
                                            >
                                                <i className="bx bx-plus"></i>
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    decrementQuantityHandler(
                                                        index
                                                    )
                                                }
                                            >
                                                <i className="bx bx-minus"></i>
                                            </Button>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() =>
                                                    deleteProductHandler(index)
                                                }
                                            >
                                                <i className="bx bxs-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h5>Total a pagar: ${total.toFixed(2)}</h5>
                    {/* <Button type="submit">Realizar compra</Button> */}
                </div>
            </div>
            <ModalWarehouse
                showWarehouse={showWarehouse}
                handleCloseWarehouse={handleCloseWarehouse}
                dataWarehouse={filteredWarehouses}
            />
        </>
    );
};

export default Orders;
