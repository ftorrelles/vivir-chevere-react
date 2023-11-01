import React, { useEffect, useState } from "react";
import ModalCreateProduct from "../components/ModalCreateProduct";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { setSelectedProduct } from "../store/slices/selectedProduct.slice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Products = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const loggedUser = useSelector((state) => state.loggedUser);

    //funcion data seleccionada para editar producto
    const handleShow = (info) => {
        console.log(info);
        dispatch(setSelectedProduct(info));
        setShowModalCreateProduct(true);
    };
    // console.log(productSelected);

    //funcion para obtener porductos
    const getProducts = () => {
        axios
            .get("http://localhost:3000/api/v1/products")
            .then((response) => {
                // console.log(response?.data?.products);
                setProducts(response.data.products);
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        getProducts();
    }, []);
    // console.log(products);
    //modal crear producto
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const handleCloseCreateProduct = () => setShowModalCreateProduct(false);
    const handleShowCreateProduct = () => setShowModalCreateProduct(true);

    const printProduct = () => {
        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.text("Lista de Productos", 90, 10);

        autoTable(doc, {
            theme: "grid",
            head: [
                [
                    "Producto",
                    "Presentacion",
                    "Precio publico",
                    "Precio afiliado",
                ],
            ],
            body: products.map((product) => {
                return [
                    product?.name,
                    `${product?.measure} ${product?.Specification?.name}`,
                    product?.price_general,
                    product?.price_afiliate,
                ];
            }),
            margin: {
                top: 20,
            },
        });

        doc.save(`lista de precio`);
    };

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
            </div>
            <div className="bodyProduct">
                <br />
                {loggedUser?.role_id == 3 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
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
                                    <td>{product?.name}</td>
                                    <td>{`${product?.measure} ${product?.Specification?.name}`}</td>
                                    <td>{product?.price_general}</td>
                                    <td>{product?.price_afiliate}</td>
                                    <td>{product?.promotion_type}</td>
                                    <td style={{ padding: "0" }}>
                                        <Button
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                            }}
                                            variant="primary"
                                            size="sm"
                                            type="button"
                                            onClick={() => handleShow(product)}
                                        >
                                            <i className="bx bx-edit"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Presentacion</th>
                                <th>Precio publico</th>
                                <th>Precio afiliado</th>
                                <th>Promoción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product) => (
                                <tr key={product?.id}>
                                    <td>{product?.name}</td>
                                    <td>{`${product?.measure} ${product?.Specification?.name}`}</td>
                                    <td>{product?.price_general}</td>
                                    <td>{product?.price_afiliate}</td>
                                    <td>{product?.promotion_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
            <ModalCreateProduct
                showModalCreateProduct={showModalCreateProduct}
                handleCloseCreateProduct={handleCloseCreateProduct}
            />
        </section>
    );
};

export default Products;
