import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";

const ModalCreateProduct = ({
    showModalCreateProduct,
    handleCloseCreateProduct,
}) => {
    //funciones de de react hook form
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const [specifications, setSpecifications] = useState([]);
    const getSpecifications = () => {
        axios
            .get("http://localhost:3000/api/v1/specifications")
            .then((response) => {
                console.log(response.data.specifications);
                setSpecifications(response.data.specifications);
            });
    };
    useEffect(() => {
        getSpecifications();
    }, []);

    const submit = async (data) => {
        const newData = {
            name: data.name,
            measure: data.measure,
            specification_id: Number(data.specification_id),
            price_afiliate: data.price_afiliate,
            price_general: data.price_general,
            status: true,
        };
        const formDataWithDefaults = {
            ...newData,
        };
        axios
            .post("http://localhost:3000/api/v1/products", formDataWithDefaults)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => console.error(error));
        reset(resetForm());
        handleCloseCreateProduct();
    };
    //reseteo del formulario
    const resetForm = () => {
        return {
            name: "",
            measure: "",
            specification_id: "",
            price_afiliate: "",
            price_general: "",
        };
    };
    return (
        <>
            <Modal
                show={showModalCreateProduct}
                onHide={handleCloseCreateProduct}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear nuevo producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                        onSubmit={handleSubmit(submit)}
                    >
                        <Form.Group style={{ display: "flex" }}>
                            <Form.Control
                                placeholder="escribir aquí..."
                                aria-describedby="basic-addon2"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            <InputGroup.Text id="basic-addon2">
                                Nombre producto
                            </InputGroup.Text>
                            {errors.name && (
                                <p className="error-message">
                                    El nombre es requerido.
                                </p>
                            )}
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group style={{ display: "flex" }}>
                                    {/* <Form.Label>Cantidad</Form.Label> */}
                                    <Form.Control
                                        placeholder="120"
                                        aria-describedby="basic-addon2"
                                        {...register("measure", {
                                            required: true,
                                        })}
                                    />
                                    <InputGroup.Text id="basic-addon2">
                                        Cantidad
                                    </InputGroup.Text>
                                    {errors.measure && (
                                        <p className="error-message">
                                            la cantidad es requerida.
                                        </p>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    style={{ display: "flex" }}
                                    controlId="Categoria"
                                >
                                    {/* <Form.Label>Categoria</Form.Label> */}
                                    <Form.Control
                                        as="select"
                                        placeholder="escoge una categoria"
                                        aria-describedby="basic-addon2"
                                        {...register("specification_id", {
                                            required: true,
                                        })}
                                    >
                                        {specifications?.map(
                                            (specification) => (
                                                <option
                                                    key={specification?.id}
                                                    value={specification?.id}
                                                >
                                                    {`${specification?.name}`}
                                                </option>
                                            )
                                        )}
                                    </Form.Control>
                                    <InputGroup.Text id="basic-addon2">
                                        categoria
                                    </InputGroup.Text>
                                    {errors.specification_id && (
                                        <p className="error-message">
                                            La categoria es requerido.
                                        </p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                placeholder="Precio afiliado"
                                {...register("price_afiliate", {
                                    required: true,
                                })}
                            />
                            <InputGroup.Text>ejemplo 12.50</InputGroup.Text>
                            {errors.price_afiliate && (
                                <p className="error-message">
                                    El precio de afiliado es requerido.
                                </p>
                            )}
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                placeholder="Precio publico"
                                {...register("price_general", {
                                    required: true,
                                })}
                            />
                            <InputGroup.Text>ejemplo 12.50</InputGroup.Text>
                            {errors.price_general && (
                                <p className="error-message">
                                    El precio al publico es requerido.
                                </p>
                            )}
                        </InputGroup>
                        <hr />
                        <Row>
                            <Col
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseCreateProduct}
                                >
                                    Cerrar
                                </Button>
                            </Col>
                            <Col
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button type="submit" variant="primary">
                                    Crear
                                </Button>
                                {/* {customerSelected ? (
                                    <Button type="submit" variant="primary">
                                        Actualizar
                                    </Button>
                                ) : (
                                    <Button type="submit" variant="primary">
                                        Crear
                                    </Button>
                                )} */}
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalCreateProduct;
