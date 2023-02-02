import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductsThunk,
    filterCategoriesThunk,
} from "../store/slices/products.slice";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        dispatch(getProductsThunk());
        axios
            .get(
                "https://e-commerce-api.academlo.tech/api/v1/products/categories"
            )
            .then((resp) => setCategories(resp.data.data.categories))
            .catch((error) => console.error(error));
    }, []);
    // console.log(products);
    return (
        <div>
            <h1>home</h1>
            {categories?.map((category) => (
                <Button
                    key={category?.id}
                    variant="primary"
                    onClick={() =>
                        dispatch(filterCategoriesThunk(category?.id))
                    }
                >
                    {category.name}
                </Button>
            ))}
            <Button variant="dark" onClick={() => dispatch(getProductsThunk())}>
                Ver todos
            </Button>
            <Row xs={1} md={2} lg={3}>
                {products.map((product, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={product?.productImgs?.[0]}
                                style={{ height: 200, objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Text>{product.category.name}</Card.Text>
                                <Card.Title>{product.title}</Card.Title>
                                <Button
                                    as={Link}
                                    variant="primary"
                                    to={`/products/${product.id}`}
                                >
                                    Ver detalle
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
