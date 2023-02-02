import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const ModalPurchases = ({ show, handleClose, data }) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <Modal.Title>Electronic bill</Modal.Title>
                    <Modal.Body>
                        <p>friend shop c.a<br />J‑29989842‑2 <br />{data.productsInCart?.createdAt.slice(0,10)}</p> 
                    </Modal.Body>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>product</th>
                                <th>price</th>
                                <th>amount</th>
                                <th>Total to pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.title}</td>
                                <td>{data.price}</td>
                                <td>{data.productsInCart?.quantity}</td>
                            <td>{data.price * data.productsInCart?.quantity}.00</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Body
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <p>
                        <strong>total paid</strong>
                    </p>
                    <p>{data.price * data.productsInCart?.quantity}.00</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalPurchases;