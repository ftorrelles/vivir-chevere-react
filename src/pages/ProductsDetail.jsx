//react/router-dom/axios
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addCartThunk } from "../store/slices/cart.slice";
import { getProductsThunk } from "../store/slices/products.slice";
//bootstrap
import { Button, Col, Row, Card, ListGroup } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Cart } from "react-bootstrap-icons";

const ProductsDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [id]);

    const products = useSelector((state) => state.products);

    const detail = products.find((product) => product.id === Number(id));
    const newsRelated = products.filter(
        (relatedProducts) =>
            relatedProducts.category?.name === detail.category.name
    );

    const addToCart = (product) => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(addCartThunk(product, count));
        } else {
            navigate("/login");
        }
    };
    return (
        <div>
            <Row xs={1} md={2} lg={2}>
                <Col lg={6}>
                    <div className="carousel">
                        <Carousel fade variant="dark">
                            <Carousel.Item
                                style={{
                                    padding: "3rem 4rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100% ",
                                }}
                            >
                                <img
                                    style={{
                                        height: "400px",
                                        objectFit: "contain",
                                    }}
                                    // className="carousel_img"
                                    src={detail?.productImgs?.[0]}
                                    alt="First slide"
                                />
                            </Carousel.Item>

                            <Carousel.Item
                                style={{
                                    padding: "3rem 4rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100% ",
                                }}
                            >
                                <img
                                    style={{
                                        height: "400px",
                                        objectFit: "contain",
                                    }}
                                    // className="carousel_img"
                                    src={detail?.productImgs?.[1]}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item
                                style={{
                                    padding: "3rem 4rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100% ",
                                }}
                            >
                                <img
                                    style={{
                                        height: "400px",
                                        objectFit: "contain",
                                    }}
                                    // className="carousel_img"
                                    src={detail?.productImgs?.[2]}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Col>
                <Col
                    lg={6}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Card style={{ border: "none" }}>
                        <Card.Body>
                            <Card.Title>
                                <h3>{detail?.title}</h3>
                            </Card.Title>
                            <Card.Text>{detail?.description}</Card.Text>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div>
                                        <p>
                                            <strong>Price</strong>
                                        </p>
                                        {detail?.price}
                                    </div>
                                    <div>
                                        <i className="bx bx-car"></i>
                                        <spam> Envio gratis</spam>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <Button
                                            onClick={() =>
                                                count === 1
                                                    ? setCount(count)
                                                    : setCount(count - 1)
                                            }
                                            variant="secondary"
                                        >
                                            -
                                        </Button>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "40px",
                                            }}
                                        >
                                            {count}
                                        </div>
                                        <Button
                                            onClick={() => setCount(count + 1)}
                                            variant="secondary"
                                        >
                                            +
                                        </Button>
                                    </div>

                                    <Button
                                        size="lg"
                                        onClick={() => addToCart(detail)}
                                    >
                                        add to cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr />
            <br />
            <h3>Related products</h3>
            <br />
            <Row xs={1} md={2} lg={3}>
                {newsRelated?.map((producItem) => (
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
                                        src={producItem?.productImgs?.[0]}
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
                                        src={producItem?.productImgs?.[1]}
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
                                        src={producItem?.productImgs?.[2]}
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
                                        onClick={() => {
                                            setCount(1);
                                            addToCart(producItem);
                                        }}
                                        variant="primary"
                                    >
                                        <Cart />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductsDetail;
