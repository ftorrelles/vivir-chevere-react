// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//     getProductsThunk,
//     filterCategoriesThunk,
// } from "../store/slices/products.slice";
// import { addCartThunk } from "../store/slices/cart.slice";
// import { Row, Col, Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Carousel from "react-bootstrap/Carousel";
// import { Cart } from "react-bootstrap-icons";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";

const Home = () => {
    // const dispatch = useDispatch();
    // const products = useSelector((state) => state.products);
    // const [categories, setCategories] = useState([]);
    // const [input, setInput] = useState("");
    // const [productsFiltered, setProductsFiltered] = useState([]);

    // useEffect(() => {
    //     dispatch(getProductsThunk());
    //     axios
    //         .get("https://friend-shop-app-back.onrender.com/api/v1/categories")
    //         .then((resp) => setCategories(resp.data))
    //         .catch((error) => console.error(error));
    // }, []);

    // useEffect(() => {
    //     setProductsFiltered(products);
    // }, [products]);

    // const filterByName = () => {
    //     const productsFiltered = products.filter((product) =>
    //         product.title.toLowerCase().includes(input)
    //     );
    //     setProductsFiltered(productsFiltered);
    // };
    // const addToCart = (product) => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         dispatch(addCartThunk(product, 1));
    //     } else {
    //         navigate("/login");
    //     }
    // };

    return (
        <div>
            {/* <Row xs={1} md={2} lg={2}>
                <Col>
                    <h4 style={{ color: "#456268" }}>
                        Your favorite categories!!
                    </h4>
                    {categories?.map((category) => (
                        <Button
                            key={category?.id}
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                                dispatch(filterCategoriesThunk(category?.id))
                            }
                        >
                            {category.name}
                        </Button>
                    ))}
                    <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => dispatch(getProductsThunk())}
                    >
                        see all
                    </Button>
                </Col>
                <Col style={{ marginTop: "1rem" }}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                            id="name"
                            type="text"
                            value={input}
                            placeholder="search product by name"
                            onChange={(event) =>
                                setInput(event.target.value.toLowerCase())
                            }
                        />
                        <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={filterByName}
                        >
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <br />
            <hr />
            <br />

            <Row xs={1} md={2} lg={3}>
                {productsFiltered?.map((producItem) => (
                    <Col key={producItem.id}>
                        <Card style={{ margin: "1rem" }}>
                            <Carousel fade variant="dark" interval={20000}>
                                <Carousel.Item
                                    style={{
                                        padding: "1rem 2rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100% ",
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "200px",
                                            objectFit: "contain",
                                        }}
                                        // className="carousel_img"
                                        src={producItem?.productImgs?.[0]?.url}
                                        alt="First slide"
                                    />
                                </Carousel.Item>

                                <Carousel.Item
                                    style={{
                                        padding: "1rem 2rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100% ",
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "200px",
                                            objectFit: "contain",
                                        }}
                                        // className="carousel_img"
                                        src={producItem?.productImgs?.[1]?.url}
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item
                                    style={{
                                        padding: "1rem 2rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100% ",
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "200px",
                                            objectFit: "contain",
                                        }}
                                        // className="carousel_img"
                                        src={producItem?.productImgs?.[2]?.url}
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                            <Card.Body className="card__body">
                                <Card.Title>{producItem.title}</Card.Title>
                                <Card.Text>${producItem.price}</Card.Text>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <Button
                                        variant="light"
                                        as={Link}
                                        to={`/products/${producItem.id}`}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        onClick={() => addToCart(producItem)}
                                        variant="primary"
                                    >
                                        <Cart />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row> */}
        </div>
    );
};

export default Home;
