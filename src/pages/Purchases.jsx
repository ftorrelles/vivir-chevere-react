import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import ModalPurchases from "../components/ModalPurchases";
import axios from "axios";
import getConfig from "../utils/getConfig";

const Purchases = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (info) => {
        setShow(true);
        setDataSelected(info);
    };
    const [purchases, setPurchases] = useState([]);
    useEffect(() => {
        axios
            .get(
                "https://friend-shop-app-back.onrender.com/api/v1/purchases",
                getConfig()
            )
            .then((resp) => setPurchases(resp.data))
            .catch((error) => console.error(error));
    }, []);
    const [dataSelected, setDataSelected] = useState({});
    return (
        <div>
            <h2>My purchases</h2>
            <hr />
            {purchases.map((purchase) => (
                <Card key={purchase.id} style={{ margin: "1rem" }}>
                    <Card.Header>
                        {purchase.product?.createdAt.slice(0, 10)}
                    </Card.Header>
                    <Card.Body
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Card.Text>{purchase.product?.title}</Card.Text>
                        <Card.Text
                            style={{
                                width: "30px",
                                height: "30px",
                                border: "1px solid rgb(0, 0, 0)",
                                display: "flex",
                                justifyContent: "center",
                                alignpurchases: "center",
                            }}
                        >
                            {purchase?.quantity}
                        </Card.Text>
                        <Card.Text>{purchase.product?.price}</Card.Text>
                        <Button
                            variant="primary"
                            onClick={() => handleShow(purchase)}
                        >
                            see details
                        </Button>
                    </Card.Body>
                </Card>
            ))}
            <ModalPurchases
                show={show}
                handleClose={handleClose}
                data={dataSelected}
            />
        </div>
    );
};

export default Purchases;
