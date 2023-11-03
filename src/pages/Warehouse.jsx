import React, { useState, useEffect } from "react";
import { Form, Table, Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ModalWarehouse from "../components/modalWarehouse";
import ModalProducts from "../components/ModalProducts";
import { setAddToCart } from "../store/slices/addToCart.slice";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { getCustomersThunk } from "../store/slices/customers.slice";

const Warehouse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productsCart, setProductsCart] = useState([]);
    const [typeMovements, setTypeMovements] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [filteredWarehouses, setFilteredWarehouses] = useState([]);
    const [total, setTotal] = useState(0);
    // const [isFormValid, setIsFormValid] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Obtener datos de los estados de Redux
    const loggedUser = useSelector((state) => state.loggedUser);
    const addToCart = useSelector((state) => state.addToCart);

    const customers = useSelector((state) => state.customers);
    useEffect(() => {
        dispatch(getCustomersThunk()); // Cargar los datos iniciales de los clientes
    }, []);

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
    // Modal de productos
    const [showProducts, setShowProducts] = useState(false);
    const handleCloseProducts = () => setShowProducts(false);
    const handleShowProducts = () => {
        setShowProducts(true);
    };
    //useEffect usado para recargar el almacen filtrado
    useEffect(() => {
        getWarehouses();
    }, [showProducts]);

    // Agregar productos al carrito
    useEffect(() => {
        if (addToCart && Object.keys(addToCart).length > 0) {
            const productExists = productsCart.some(
                (product) => product.product_id === addToCart.product_id
            );
            const availableQuantity = addToCart?.quantity || 0;

            if (!productExists) {
                let newCart = {
                    product_id: addToCart.product_id,
                    name: addToCart?.Product?.name,
                    price:
                        loggedUser?.TypeCustomer?.name === "Afiliado"
                            ? addToCart?.Product?.price_afiliate
                            : addToCart?.Product?.price_general,
                    quantity: 1,
                    total_line:
                        (loggedUser?.TypeCustomer?.name === "Afiliado"
                            ? Number(addToCart?.Product?.price_afiliate)
                            : Number(addToCart?.Product?.price_general)) * 1,
                    availableQuantity,
                };

                setProductsCart((prevProducts) => [...prevProducts, newCart]);
                dispatch(setAddToCart({}));
            }
        }
    }, [addToCart, productsCart]);

    const incrementQuantityHandler = (index) => {
        const updatedProducts = [...productsCart];
        const product = updatedProducts[index];

        product.quantity += 1;
        product.total_line = product.quantity * product.price; // Actualiza total_line
        setProductsCart(updatedProducts);
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
            const subtotal = productsCart.reduce(
                (acc, product) =>
                    acc + product.quantity * Number(product.price),
                0
            );
            setTotal(subtotal);
        };
        calculateTotal();
    }, [productsCart]);

    // Función para enviar el formulario
    const submit = async (data) => {
        if (productsCart.length > 0) {
            dispatch(setIsLoading(true));
            // Agrega los objetos movement_items al objeto de datos a enviar
            const dataToSend = {
                ...data,
                status: "true",
                total,
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
    return (
        <>
            <div className="container_warehouse">
                <div className="sidebarWarehouse">
                    <ul>
                        <li>Sede: {loggedUser?.Branches[0]?.name}</li>

                        <li>
                            Quien recibe:{" "}
                            {`${loggedUser?.first_name} ${loggedUser?.last_name} (${loggedUser?.Role?.name_role})`}
                        </li>
                        <li>
                            Tipo de movimiento: {`${typeMovements[1]?.name} `}
                        </li>
                    </ul>
                    <hr />
                    <Form onSubmit={handleSubmit(submit)}>
                        <input
                            type="hidden"
                            {...register("customer_id", {
                                value: loggedUser?.id,
                            })}
                        />
                        <input
                            type="hidden"
                            {...register("branch_id", {
                                value: loggedUser?.Branches[0]?.id,
                            })}
                        />
                        <input
                            type="hidden"
                            {...register("typemovement_id", {
                                value: 2,
                            })}
                        />
                        <div className="warehouse_date_form">
                            <Form.Group controlId="dispatcher_id">
                                <Form.Label>Quien despacha</Form.Label>
                                <Form.Control
                                    as="select"
                                    placeholder="Nombre de quien despacha"
                                    {...register(
                                        "dispatcher_id",

                                        {
                                            required: true,
                                        }
                                    )}
                                >
                                    <option value="">quien despacha</option>
                                    {customers.map((customer) => (
                                        <option
                                            key={customer?.id}
                                            value={customer?.id}
                                        >
                                            {`${customer?.first_name} ${customer?.last_name}`}
                                        </option>
                                    ))}
                                </Form.Control>
                                {errors.dispatcher_id && (
                                    <p className="error-message">
                                        Quien despacha es requerido.
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
                        <br />
                        <ul>
                            <li>
                                Aumentar almacen{" "}
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
                            </li>
                            <li>
                                Agregar nuevo producto{" "}
                                <Button
                                    onClick={handleShowProducts}
                                    type="button"
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                    }}
                                >
                                    <i className="bx bx-cart-add"></i>
                                </Button>
                            </li>
                        </ul>
                        <Col>
                            <Button type="submit" variant="primary">
                                Confirmar ingreso
                            </Button>
                        </Col>
                    </Form>
                </div>
                <div className="section_table">
                    {productsCart.length !== 0 ? (
                        <>
                            <Table striped bordered hover responsive>
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
                            <h5
                                style={{
                                    textAlign: "end",
                                    paddingRight: "1rem",
                                }}
                            >
                                <strong>
                                    Total a pagar: ${total?.toFixed(2)}
                                </strong>
                            </h5>
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
            <ModalProducts
                showProducts={showProducts}
                handleCloseProducts={handleCloseProducts}
                dataWarehouse={filteredWarehouses}
            />
        </>
    );
};

export default Warehouse;
