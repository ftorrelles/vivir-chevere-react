import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import getConfig from "../utils/getConfig";
import Card from "react-bootstrap/Card";
import {
    updateCartThunk,
    getCarThunk,
    removeCartThunk,
} from "../store/slices/cart.slice";
import { useSelector, useDispatch } from "react-redux";

const SideBar = ({ show, handleClose }) => {
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();

    //Obtener productos del carro
    useEffect(() => {
        dispatch(getCarThunk());
    }, [show]);

    const productsCart = useSelector((state) => state.cart);

    // useEffect(() => {
    //     axios
    //         .get(
    //             "https://e-commerce-api.academlo.tech/api/v1/cart",
    //             getConfig()
    //         )
    //         .then((resp) => setProduct(resp.data.data.cart.products))
    //         .catch((error) => console.error(error));
    // }, [show]);

    //mandar a purchases
    const checkoutCart = () => {
        axios
            .post(
                "https://e-commerce-api.academlo.tech/api/v1/purchases",
                {
                    street: "Green St. 1456",
                    colony: "Southwest",
                    zipCode: 12345,
                    city: "USA",
                    references: "Some references",
                },
                getConfig()
            )
            .then((resp) => {
                for (let i of productsCart.cart.products) {
                    dispatch(removeCart(i.productsInCart?.productId));
                }
            });
        // .then((resp) => {
        //     dispatch(removeCartThunk(productsCart.cart.id));
        //     dispatch(getCarThunk());
        // })
        // .catch((error) => console.error(error));
    };

    const addUpdateCart = (product) => {
        dispatch(
            updateCartThunk(product, product.productsInCart?.quantity + 1)
        );
        dispatch(getCarThunk());
    };
    const resUpdateCart = (product) => {
        product.productsInCart?.quantity === 1
            ? alert("no se puede")
            : dispatch(
                  updateCartThunk(product, product.productsInCart?.quantity - 1)
              );
        dispatch(getCarThunk());
    };
    const removeCart = (product) => {
        dispatch(removeCartThunk(product.productsInCart?.productId));
    };
    console.log(productsCart);

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>shopping cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {productsCart?.cart?.products.length !== 0 ? (
                    productsCart?.cart?.products.map((item) => (
                        <Card key={item.id} style={{ margin: "1rem" }}>
                            <Card.Body>
                                <Card.Title>
                                    <h6>{item.title}</h6>
                                </Card.Title>
                                <Card.Text>
                                    <span>
                                        Brand: {item.brand} <br />
                                        Quantity:{" "}
                                        {item.productsInCart?.quantity} <br />
                                        Price: {item.price}
                                    </span>
                                </Card.Text>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                    }}
                                >
                                    <div
                                        style={{ display: "flex", gap: "5px" }}
                                    >
                                        <Button
                                            onClick={() => resUpdateCart(item)}
                                            variant="primary"
                                        >
                                            -
                                        </Button>
                                        <Button
                                            onClick={() => addUpdateCart(item)}
                                            variant="primary"
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Button
                                        onClick={() => removeCart(item)}
                                        variant="danger"
                                    >
                                        <i className="bx bx-trash"></i>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <h2>No hay nada en el carrito</h2>
                )}
                <Button
                    style={{ display: "flex", justifyContent: "center" }}
                    onClick={() => checkoutCart()}
                    disabled={productsCart.length === 0}
                >
                    Pay
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default SideBar;
