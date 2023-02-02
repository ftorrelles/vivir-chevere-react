import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import getConfig from "../utils/getConfig";
import Card from 'react-bootstrap/Card';

const SideBar = ({ show, handleClose }) => {
    const [product, setProduct] = useState([]);

    //Obtener productos del carro
    useEffect(() => {
        axios
            .get(
                "https://e-commerce-api.academlo.tech/api/v1/cart",
                getConfig()
            )
            .then((resp) => setProduct(resp.data.data.cart.products))
            .catch((error) => console.error(error));
    }, [show]);

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
            .then((resp) => setProduct([]))
            .catch((error) => console.error(error));
    };
    // console.log(product);
    //Actualizar
    // const updateCart = (info) => {
    //     const id= info.productsInCart.id
    //     let newQuantity = info.productsInCart?.quantity +1
    //     const objUpdate= {
    //         id,
    //         newQuantity
    //     }
    //     axios
    //         .patch(
    //             "https://e-commerce-api.academlo.tech/api/v1/cart",
    //             {
    //                 objUpdate
    //             },
    //             getConfig()
    //         )
    //         .then((resp) => console.log(resp))
    //         .catch((error) => console.error(error));
    // }
    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>shopping cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {product.length !== 0 ? (
                    product.map((item) => (
                        <Card key={item.id} style={{margin:'1rem'}}>
                            <Card.Body>
                                <Card.Title> <h6>{item.title}</h6>  </Card.Title>
                                <Card.Text> <span>Brand: {item.brand} <br />Quantity: {item.productsInCart?.quantity} <br />Price: {item.price}</span> </Card.Text>
                                <div style={{display:'flex', justifyContent:'space-evenly'}}>
                                    <div style={{display:'flex', gap:'5px'}}>
                                        <Button variant="primary">
                                            -
                                        </Button>
                                        <Button /*onClick={()=> updateCart(item)}*/ variant="primary">
                                            +
                                        </Button>
                                    </div>
                                    <Button variant="danger">
                                        <i className='bx bx-trash'></i>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>))
                ) : (
                    <h2>No hay nada en el carrito</h2>
                )}
                <Button style={{display:'flex', justifyContent:'center'}} onClick={checkoutCart} disabled={product.length === 0}>
                    Pay
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default SideBar;