import React, { useEffect, useState } from "react";
import ModalCreateProduct from "../components/ModalCreateProduct";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";
import { setSelectedProduct } from "../store/slices/selectedProduct.slice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { setIsLoading } from "../store/slices/isLoading.slice";
import Select from "react-select";

const Products = () => {
    const dispatch = useDispatch();

    const loggedUser = useSelector((state) => state.loggedUser);
    const isAdmin = loggedUser?.role_id === 3;

    const [products, setProducts] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedBranchDetail, setSelectedBranchDetail] = useState(null);
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        getProducts();
        getBranches();
        fiteredBranchxloggedUser();
        getWarehouses();
    }, []);
    //funcion para limpiar el filtrado de sede
    const clearTypeMovementFilter = () => {
        setSelectedBranch(null);
    };
    //funcion para filtrar las sedes si no es un administrador (de ser sede solo podra ver su sede)
    const fiteredBranchxloggedUser = () => {
        if (!isAdmin) {
            return setSelectedBranch(loggedUser?.Branches[0]?.id);
        }
    };
    // console.log(selectedBranch);
    //funcion data seleccionada para editar producto
    const handleShow = (info) => {
        dispatch(setSelectedProduct(info));
        setShowModalCreateProduct(true);
    };
    const getWarehouses = () => {
        dispatch(setIsLoading(true));
        axios
            .get("https://back-end-vivirchevere.onrender.com/api/v1/warehouses")
            .then((response) => {
                // console.log(response?.data?.warehouses);
                if (isAdmin) {
                    selectedBranch
                        ? setWarehouses(
                              response?.data?.warehouses
                                  .filter(
                                      (warehouse) =>
                                          warehouse?.branch_id ===
                                          selectedBranch
                                  )
                                  .reduce(
                                      (subtotal, warehouse) =>
                                          subtotal + warehouse.quantity,
                                      0
                                  )
                          )
                        : setWarehouses(
                              response?.data?.warehouses.reduce(
                                  (subtotal, warehouse) =>
                                      subtotal + warehouse.quantity,
                                  0
                              )
                          );
                } else {
                    setWarehouses(
                        response?.data?.warehouses
                            .filter(
                                (warehouse) =>
                                    warehouse?.branch_id === selectedBranch
                            )
                            .reduce(
                                (subtotal, warehouse) =>
                                    subtotal + warehouse.quantity,
                                0
                            )
                    );
                }
            })
            .catch((error) => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    };
    // console.log(warehouses);
    const getProducts = () => {
        dispatch(setIsLoading(true));
        axios
            .get("https://back-end-vivirchevere.onrender.com/api/v1/products")
            .then((response) => {
                setProducts(
                    response.data.products.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    )
                );
            })
            .catch((error) => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    };
    const getBranches = () => {
        dispatch(setIsLoading(true));
        axios
            .get("https://back-end-vivirchevere.onrender.com/api/v1/branches")
            .then((response) => {
                setBranches(response.data.branches);
            })
            .catch((error) => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    };

    //modal crear producto
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const handleCloseCreateProduct = () => setShowModalCreateProduct(false);
    const handleShowCreateProduct = () => setShowModalCreateProduct(true);

    useEffect(() => {
        getProducts();
        fiteredBranchxloggedUser();
        getWarehouses();
    }, [selectedBranch]);

    const printProduct = () => {
        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.text("Lista de Productos", 90, 10);

        autoTable(doc, {
            theme: "grid",
            head: [
                [
                    "id",
                    "Producto",
                    "Presentacion",
                    "Precio publico",
                    "Precio afiliado",
                    "Promoción",
                ],
            ],
            body: products.map((product) => {
                return [
                    product.id,
                    product?.name,
                    `${product?.measure} ${product?.Specification?.name}`,
                    product?.price_general,
                    product?.price_afiliate,
                    `${
                        product?.promotion_type == 3 ? "5.00" : "Sin descuento"
                    }`,
                ];
            }),
            margin: {
                top: 20,
            },
        });

        doc.save(`lista de precio`);
    };

    //funcion del select para seleccionar una sede (solo administradores)
    // const handleBranchSelection = (e) => {
    //     setSelectedBranch(e.target.value);
    // };
    return (
        <section className="product">
            <div className="sidebarProduct">
                <h6>
                    Bienvenido{" "}
                    {loggedUser?.first_name + " " + loggedUser?.last_name}
                </h6>
                <h6>Tipo de cuenta: {loggedUser?.Role?.name_role}</h6>
                <h6>Sede: {loggedUser?.Branches[0]?.name}</h6>
                {loggedUser?.role_id == 3 ? (
                    <div>
                        <Button
                            type="button"
                            className="btCreateCustomer"
                            onClick={handleShowCreateProduct}
                        >
                            Crear nuevo producto
                        </Button>
                    </div>
                ) : null}
                <div>
                    <Button
                        className="btCreateCustomer"
                        variant="primary"
                        onClick={() => printProduct()}
                    >
                        Imprimir lista de precio
                    </Button>
                </div>

                {isAdmin ? (
                    // <div>
                    //     <label>Seleccione la Sede: </label>
                    //     <select
                    //         value={selectedBranch}
                    //         onChange={handleBranchSelection}
                    //     >
                    //         <option value={null}>Todas las sedes</option>
                    //         {branches.map((branch) => (
                    //             <option key={branch.id} value={branch.id}>
                    //                 {branch.name}
                    //             </option>
                    //         ))}
                    //     </select>
                    // </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Select
                            value={selectedBranch}
                            onChange={(selectedOption) => {
                                // console.log(selectedOption);
                                setSelectedBranch(selectedOption?.value);
                                setSelectedBranchDetail(selectedOption);
                            }}
                            options={branches.map((branch) => ({
                                value: branch?.id,
                                label: branch?.name,
                            }))}
                            placeholder="Todas las sedes"
                            className="selectTypeMovemet"
                        />

                        <div>
                            <Button
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}
                                onClick={clearTypeMovementFilter}
                            >
                                <i className="bx bx-trash"></i>
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="bodyProduct">
                <Card
                    bg="primary" // Cambia a un color válido para el fondo
                    border="primary" // Cambia a un color válido para el borde
                    text="white"
                    style={{ textAlign: "center", width: "15rem" }}
                    className="mb-2"
                >
                    <Card.Header>
                        Stock:{" "}
                        {selectedBranch ? (
                            selectedBranchDetail?.label
                        ) : (
                            <span>Todas las sedes</span>
                        )}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{warehouses} </Card.Title>
                    </Card.Body>
                </Card>
                <div>
                    {loggedUser?.role_id == 3 ? (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Producto</th>
                                    <th>stock</th>
                                    <th>Presentacion</th>
                                    <th>Precio publico</th>
                                    <th>Precio afiliado</th>
                                    <th>Promoción</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product) => (
                                    <tr key={product?.id}>
                                        <td>{product?.id}</td>
                                        <td>{product?.name}</td>
                                        {/* <td>
                                            {product?.Warehouses[0]?.quantity ==
                                            undefined
                                                ? "0"
                                                : product?.Warehouses[0]
                                                      ?.quantity}
                                        </td> */}
                                        <td>
                                            {selectedBranch
                                                ? // Si selectedBranch no es nulo, filtrar y sumar las cantidades específicas
                                                  product?.Warehouses.filter(
                                                      (warehouse) =>
                                                          warehouse.branch_id ==
                                                          selectedBranch
                                                  ).reduce(
                                                      (total, warehouse) =>
                                                          total +
                                                          warehouse.quantity,
                                                      0
                                                  )
                                                : // Si selectedBranch es nulo, sumar todas las cantidades
                                                  product?.Warehouses.reduce(
                                                      (total, warehouse) =>
                                                          total +
                                                          warehouse.quantity,
                                                      0
                                                  )}
                                        </td>
                                        <td>{`${product?.measure} ${product?.Specification?.name}`}</td>
                                        <td>{product?.price_general}</td>
                                        <td>{product?.price_afiliate}</td>
                                        <td>
                                            {product?.promotion_type == 3
                                                ? "5.00"
                                                : "Sin descuento"}
                                        </td>
                                        <td style={{ padding: "0" }}>
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                    border: "none",
                                                }}
                                                variant="primary"
                                                size="sm"
                                                type="button"
                                                onClick={() =>
                                                    handleShow(product)
                                                }
                                            >
                                                <i className="bx bx-edit"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Producto</th>
                                    <th>stock</th>
                                    <th>Presentacion</th>
                                    <th>Precio publico</th>
                                    <th>Precio afiliado</th>
                                    <th>Promoción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product) => (
                                    <tr key={product?.id}>
                                        <td>{product?.id}</td>
                                        <td>{product?.name}</td>
                                        {/* <td>
                                            {product?.Warehouses[0]?.quantity ==
                                            undefined
                                                ? "0"
                                                : product?.Warehouses[0]
                                                      ?.quantity}
                                        </td> */}
                                        <td>
                                            {selectedBranch ? (
                                                // Si selectedBranch no es nulo, filtrar y sumar las cantidades específicas
                                                product?.Warehouses.filter(
                                                    (warehouse) =>
                                                        warehouse.branch_id ==
                                                        selectedBranch
                                                ).reduce(
                                                    (total, warehouse) =>
                                                        total +
                                                        warehouse.quantity,
                                                    0
                                                )
                                            ) : (
                                                // Si selectedBranch es nulo, sumar todas las cantidades
                                                //   product?.Warehouses.reduce(
                                                //       (total, warehouse) =>
                                                //           total +
                                                //           warehouse.quantity,
                                                //       0
                                                //   )}
                                                <p>error</p>
                                            )}
                                        </td>
                                        <td>{`${product?.measure} ${product?.Specification?.name}`}</td>
                                        <td>{product?.price_general}</td>
                                        <td>{product?.price_afiliate}</td>
                                        <td>
                                            {product?.promotion_type == 3
                                                ? "5.00"
                                                : "Sin descuento"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </div>
            <ModalCreateProduct
                showModalCreateProduct={showModalCreateProduct}
                handleCloseCreateProduct={handleCloseCreateProduct}
            />
        </section>
    );
};

export default Products;
