import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { Button, Col, Row, Card } from "react-bootstrap";
import { cartThunk } from "../store/slices/cart.slice";
import Carousel from "react-bootstrap/Carousel";
import { Cart } from "react-bootstrap-icons";
//import { getProductsThunk } from "../store/slices/products.slice";

const ProductsDetail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const products = useSelector((state) => state.products);
    const [productsByCategory, setProductsByCategory] = useState([]);

    useEffect(() => {
        //dispatch(getProductsThunk())
        dispatch(setIsLoading(true));
        axios
            .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}/`)
            .then((resp) => {
                setDetail(resp?.data?.data?.product);
                filterClass(resp?.data?.data?.product.category);
            })
            .catch((error) => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    }, [id]);

    const filterClass = (category) => {
        const productsFiltered = products.filter(
            (p) => p.category.name == category
        );
        setProductsByCategory(productsFiltered);
    };

    const addToCart = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const cart = {
                id: detail.id,
                quantity: count,
            };
            dispatch(cartThunk(cart));
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
                    <h2>{detail.title}</h2>
                    <p>{detail.category}</p>

                    <p>{detail.description}</p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            <h5>Price</h5>
                            <p>
                                <strong>{detail.price}</strong>
                            </p>
                        </div>
                        <div>
                            <h5>Quantity</h5>
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
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
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
                        </div>
                    </div>
                    <div>
                        <Button size="lg" onClick={addToCart}>
                            add to cart
                        </Button>
                    </div>
                </Col>
            </Row>
            <hr />
            <br />
            <h3>Related products</h3>
            <br />
            <Row xs={1} md={2} lg={3}>
                {productsByCategory?.map((producItem) => (
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
                                    <Button variant="primary">
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
