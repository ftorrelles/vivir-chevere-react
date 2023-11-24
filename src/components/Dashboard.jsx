import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const [cuentaPorPagar, setCuentaPorPagar] = useState([]);
    const [cuentaPorCobrar, setCuentaPorCobrar] = useState([]);
    const [stockWarehouses, setStockWarehouses] = useState([]);
    const loggedUser = useSelector((state) => state.loggedUser);
    const isAdmin = loggedUser?.role_id === 3;
    // console.log(loggedUser);
    const getCuentasClientes = () => {
        axios
            .get(
                `https://back-end-vivirchevere.onrender.com/api/v1/cuenta_clientes/${loggedUser?.id}/5`
            )
            .then((resp) => [
                // console.log(resp.data.new_cuenta_cliente),
                setCuentaPorPagar(resp.data.new_cuenta_cliente),
            ])
            .catch((error) => console.error(error));
        axios
            .get(
                `https://back-end-vivirchevere.onrender.com/api/v1/cuenta_clientes/${loggedUser?.id}/6`
            )
            .then((resp) => [
                // console.log(resp.data.new_cuenta_cliente),
                setCuentaPorCobrar(resp.data.new_cuenta_cliente),
            ])
            .catch((error) => console.error(error));
    };
    const getStockOfWarehouses = () => {
        axios
            .get(
                `https://back-end-vivirchevere.onrender.com/api/v1/warehouses/by-branch/${loggedUser?.id}`
            )
            .then((resp) => [
                // console.log(resp.data.warehousesWithTotal),
                setStockWarehouses(resp.data.warehousesWithTotal),
            ])
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        getCuentasClientes();
        getStockOfWarehouses();
    }, []);
    // console.log(cuentaPorPagar);
    // console.log(cuentaPorCobrar);
    // console.log(stockWarehouses);
    return (
        <div className="secctionDashboard">
            <Card
                bg="danger" // Cambia a un color válido para el fondo
                border="danger" // Cambia a un color válido para el borde
                text="white"
                style={{ textAlign: "center" }}
                className="mb-2 cardDashboard"
            >
                <Card.Header>
                    <strong>Saldo:</strong>{" "}
                    {!isAdmin ? (
                        loggedUser?.Branches?.[0]?.name
                    ) : (
                        <span>Todas las sedes</span>
                    )}
                </Card.Header>
                <Card.Body>
                    <Card.Title>${cuentaPorPagar.total} </Card.Title>
                </Card.Body>
            </Card>
            <Card
                bg="success" // Cambia a un color válido para el fondo
                border="success" // Cambia a un color válido para el borde
                text="white"
                style={{ textAlign: "center" }}
                className="mb-2 cardDashboard"
            >
                <Card.Header>
                    <strong>Ganancia:</strong>{" "}
                    {!isAdmin ? (
                        loggedUser?.Branches?.[0]?.name
                    ) : (
                        <span>Todas las sedes</span>
                    )}
                </Card.Header>
                <Card.Body>
                    <Card.Title>${cuentaPorCobrar.total} </Card.Title>
                </Card.Body>
            </Card>
            <Card
                bg="primary" // Cambia a un color válido para el fondo
                border="primary" // Cambia a un color válido para el borde
                text="white"
                style={{ textAlign: "center" }}
                className="mb-2 cardDashboard"
            >
                <Card.Header>
                    <strong>Stock:</strong>{" "}
                    {!isAdmin ? (
                        loggedUser?.Branches?.[0]?.name
                    ) : (
                        <span>Todas las sedes</span>
                    )}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{stockWarehouses.totalStock}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;
