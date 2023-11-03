import React, { useState, useEffect } from "react";
import { Form, Table, Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ModalWarehouse from "../components/modalWarehouse";
import { setAddToCart } from "../store/slices/addToCart.slice";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../store/slices/isLoading.slice";

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productsCart, setProductsCart] = useState([]);
    const [typeMovements, setTypeMovements] = useState([]);
    const [filteredTypeMovemet, setFilteredTypeMovemet] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [filteredWarehouses, setFilteredWarehouses] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalWithPromotion, setTotalWithPromotion] = useState(0);

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
    // console.log(addToCart);

    // Obtener tipos de movimientos y almacenes
    const getTypeMovements = () => {
        dispatch(setIsLoading(true));
        axios
            .get(
                "https://back-end-vivirchevere.onrender.com/api/v1/typeMovements"
            )
            .then((resp) => setTypeMovements(resp.data?.typeMovements))
            .catch((error) => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    };
    const getWarehouses = () => {
        dispatch(setIsLoading(true));
        axios
            .get("https://back-end-vivirchevere.onrender.com/api/v1/warehouses")
            .then((resp) => {
                setWarehouses(resp.data.warehouses);
            })
            .catch((error) => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    };
    useEffect(() => {
        getTypeMovements();
        getWarehouses();
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

    // console.log(addToCart);
    // Agregar productos al carrito
    useEffect(() => {
        if (addToCart && Object.keys(addToCart).length > 0) {
            const productExists = productsCart?.some(
                (product) => product.product_id === addToCart.product_id
            );
            const availableQuantity = addToCart?.quantity || 0;

            if (!productExists && availableQuantity > 0) {
                // Obtener el valor de promotion_type del producto
                const promotionType = addToCart?.Product?.promotion_type;
                console.log(promotionType);
                // Obtener el tipo de cliente
                const customerType =
                    selectedCustomerForMovements?.TypeCustomer?.name;
                console.log(customerType);

                let newprice;

                if (customerType === "Afiliado") {
                    // Si el cliente es afiliado, aplicamos las siguientes condiciones
                    if (promotionType === 1) {
                        // Si promotionType es 1, aplicamos un 20% de descuento
                        newprice = addToCart?.Product?.price_afiliate * 0.8;
                    } else if (promotionType === 2) {
                        // Si promotionType es 2, calculamos 2 productos por el precio de 1
                        newprice = addToCart?.Product?.price_afiliate / 2;
                    } else if (promotionType === 3) {
                        // Si promotionType es 3, establecemos un precio fijo de $5.00
                        newprice = 5.0;
                    } else {
                        // Si promotionType no es 1, 2 o 3, el precio se mantiene sin descuento
                        newprice = addToCart?.Product?.price_afiliate;
                    }
                } else {
                    // Si el cliente no es afiliado, aplicamos el precio general
                    newprice = addToCart?.Product?.price_general;
                }
                console.log(newprice);

                let newCart = {
                    product_id: addToCart.product_id,
                    name: addToCart?.Product?.name,
                    price:
                        selectedCustomerForMovements?.TypeCustomer?.name ===
                        "Afiliado"
                            ? addToCart?.Product?.price_afiliate
                            : addToCart?.Product?.price_general,
                    quantity: 1,
                    total_line:
                        (selectedCustomerForMovements?.TypeCustomer?.name ===
                        "Afiliado"
                            ? Number(addToCart?.Product?.price_afiliate)
                            : Number(addToCart?.Product?.price_general)) * 1,
                    availableQuantity,
                    promotion_price: newprice,
                };

                setProductsCart((prevProducts) => [...prevProducts, newCart]);
                dispatch(setAddToCart({}));
            } else if (availableQuantity <= 0) {
                alert("No hay disponibilidad de este producto en el almacén.");
            }
        }
    }, [addToCart, productsCart, selectedCustomerForMovements]);

    // Función para incrementar la cantidad del producto
    const incrementQuantityHandler = (index) => {
        const updatedProducts = [...productsCart];
        const product = updatedProducts[index];

        if (product.availableQuantity > product.quantity) {
            // Verificar si la cantidad deseada es menor que la cantidad disponible antes de incrementar
            product.quantity += 1;
            product.total_line = product.quantity * product.price; // Actualiza total_line
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
            updatedProducts[index].total_line =
                updatedProducts[index].quantity * updatedProducts[index].price; // Actualiza total_line
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
            const subtotal = productsCart?.reduce(
                (acc, product) =>
                    acc + product.quantity * Number(product.price),
                0
            );
            setTotal(subtotal);
        };
        calculateTotal();
        const calculateTotal2 = () => {
            const subtotal = productsCart?.reduce(
                (acc, product) =>
                    acc + product.quantity * Number(product.promotion_price),
                0
            );
            setTotalWithPromotion(subtotal);
        };
        calculateTotal2();
    }, [productsCart]);

    // Función para enviar el formulario
    const submit = async (data) => {
        if (productsCart.length > 0) {
            dispatch(setIsLoading(true));
            // Agrega los objetos movement_items al objeto de datos a enviar
            const dataToSend = {
                ...data,
                status: "true",
                total: totalWithPromotion,
                movement_items: productsCart.map((product) => ({
                    product_id: product.product_id,
                    quantity: product.quantity,
                    total_line: product.total_line,
                    status: "true",
                })),
            };

            // Envía la solicitud POST con el movimiento y los movement_items utilizando Axios
            axios
                .post(
                    "https://back-end-vivirchevere.onrender.com/api/v1/movements",
                    dataToSend
                )
                .then((response) => {
                    setProductsCart([]);
                    navigate("/movementControl");
                })
                .catch((error) => {
                    // Maneja errores si ocurren
                    console.error(error);
                })
                .finally(() => dispatch(setIsLoading(false)));
        } else {
            alert(
                "Agrega al menos un producto al carrito antes de enviar el formulario."
            );
        }
    };

    //funcion para filtrar los tipo de movimientos aceptados en esta pagina
    useEffect(() => {
        setFilteredTypeMovemet(
            typeMovements.filter(
                (typeMovement) => typeMovement.id !== 2 && typeMovement.id !== 5
            )
        );
    }, [typeMovements]);
    // console.log(filteredTypeMovemet);
    // console.log(productsCart);
    // console.log(total);
    // console.log(totalWithPromotion);
    return (
        <>
            <div className="container_orders">
                <div className="sidebarOrders">
                    <ul>
                        <li>Sede: {loggedUser?.Branches[0]?.name}</li>
                        <li>
                            Quien despacha:{" "}
                            {`${loggedUser?.first_name} ${loggedUser?.last_name} (${loggedUser?.TypeCustomer?.name})`}
                        </li>
                        <li>
                            Quien recibe:{" "}
                            {`${selectedCustomerForMovements?.first_name} ${selectedCustomerForMovements?.last_name} (${selectedCustomerForMovements?.TypeCustomer?.name})`}
                        </li>
                    </ul>

                    <hr />
                    <h5>Completar formulario</h5>
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
                        <div className="typeMovement_date_form">
                            <Form.Group controlId="typemovementId">
                                <Form.Label>Tipo de movimiento</Form.Label>
                                <Form.Control
                                    as="select"
                                    placeholder="Tipo de movimiento"
                                    {...register("typemovement_id", {
                                        required: true,
                                    })}
                                >
                                    <option value="">
                                        Seleccione un tipo de movimiento
                                    </option>
                                    {filteredTypeMovemet.map((typeMovement) => (
                                        <option
                                            key={typeMovement?.id}
                                            value={typeMovement?.id}
                                        >
                                            {typeMovement?.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                {errors.typemovementId && (
                                    <p className="error-message">
                                        El tipo de movimiento es requerido.
                                    </p>
                                )}
                            </Form.Group>
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
                                        La fecha de movimiento es requerida.
                                    </p>
                                )}
                            </Form.Group>
                        </div>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción o Detalles</Form.Label>
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
                                    La descripción o detalles son requeridos.
                                </p>
                            )}
                        </Form.Group>
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
                            <p>Total a pagar: ${total?.toFixed(2)}</p>

                            <Button type="submit" variant="primary">
                                Confirmar compra
                            </Button>
                        </Col>
                    </Form>
                </div>
                <div className="section_table">
                    {productsCart.length !== 0 ? (
                        <>
                            <h5>Productos en el movimiento</h5>
                            <br />
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cant</th>
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
                                                    product.quantity *
                                                    product.price
                                                ).toFixed(2)}
                                            </td>
                                            <td>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
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
                                                            deleteProductHandler(
                                                                index
                                                            )
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
                            <h6
                                style={{
                                    textAlign: "end",
                                    paddingRight: "1rem",
                                }}
                            >
                                <strong>Total : ${total?.toFixed(2)}</strong>
                            </h6>
                            <h6
                                style={{
                                    textAlign: "end",
                                    paddingRight: "1rem",
                                }}
                            >
                                <strong>
                                    Descuento: $
                                    {(total - totalWithPromotion).toFixed(2)}
                                </strong>
                            </h6>
                            <h6
                                style={{
                                    textAlign: "end",
                                    paddingRight: "1rem",
                                }}
                            >
                                <strong>
                                    Total a pagar: $
                                    {totalWithPromotion?.toFixed(2)}
                                </strong>
                            </h6>
                        </>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img src="/empty-cart.png" alt="" />
                        </div>
                    )}
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
