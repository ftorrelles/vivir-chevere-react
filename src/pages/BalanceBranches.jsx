import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ModalForPay from "../components/ModalForPay";
import Dashboard from "../components/Dashboard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { setIsLoading } from "../store/slices/isLoading.slice";

const BalanceBranches = () => {
    const dispatch = useDispatch();
    const [key, setKey] = useState("acumulado");

    const [cuentaPorPagar, setCuentaPorPagar] = useState([]);
    const [cuentaPorCobrar, setCuentaPorCobrar] = useState([]);

    const [filteredCuentaPorPagar, setFilteredCuentaPorPagar] = useState([]);
    const [filteredCuentaPorCobrar, setFilteredCuentaPorCobrar] = useState([]);

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branches, setBranches] = useState([]);

    const [showModalPay, setShowModalPay] = useState(false);
    const loggedUser = useSelector((state) => state.loggedUser);

    //Obtener datos
    const isAdmin = loggedUser?.role_id == 3;

    const getBranches = () => {
        axios
            .get("https://back-end-vivirchevere.onrender.com/api/v1/branches")
            .then((response) => {
                setBranches(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las sedes:", error);
            });
    };
    ////////////////////////////////////////////////////
    const getCuentasClientes = () => {
        dispatch(setIsLoading(true));
        axios
            .get(
                `https://back-end-vivirchevere.onrender.com/api/v1/cuenta_clientes/customerId/${loggedUser?.id}/typeMovement/5`
            )
            .then((resp) => [
                // console.log(resp.data.new_cuenta_cliente),
                setCuentaPorPagar(
                    resp.data.new_cuenta_cliente.balance.sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateB - dateA;
                    })
                ),
            ])
            .catch((error) => console.error(error));
        axios
            .get(
                `https://back-end-vivirchevere.onrender.com/api/v1/cuenta_clientes/customerId/${loggedUser?.id}/typeMovement/6`
            )
            .then((resp) => [
                // console.log(resp.data.new_cuenta_cliente),
                setCuentaPorCobrar(
                    resp.data.new_cuenta_cliente.balance.sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateB - dateA;
                    })
                ),
            ])
            .catch((error) => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    };
    // console.log(cuentaPorCobrar);
    // console.log(cuentaPorPagar);
    useEffect(() => {
        getBranches();
        getCuentasClientes();
    }, []);
    ///Filtrado de sedes por selector
    useEffect(() => {
        let filteredCuentaPorPagar;
        if (selectedBranch) {
            // se selecciono una sede
            filteredCuentaPorPagar = cuentaPorPagar?.filter((movement) => {
                return (
                    movement?.Customer?.Branches[0]?.id == selectedBranch.value
                );
            });
        }
        setFilteredCuentaPorPagar(filteredCuentaPorPagar);
        ///////////////////
        let filteredCuentaPorCobrar;
        if (selectedBranch) {
            // se selecciono una sede
            filteredCuentaPorCobrar = cuentaPorCobrar?.filter((movement) => {
                return (
                    movement?.Customer?.Branches[0]?.id == selectedBranch.value
                );
            });
        }
        setFilteredCuentaPorCobrar(filteredCuentaPorCobrar);
    }, [selectedBranch]);
    // console.log(filteredCuentaPorCobrar);
    // console.log(filteredCuentaPorPagar);

    const handleClosePay = () => {
        setShowModalPay(false), getCuentasClientes();
    };
    const handleShowModalPay = () => setShowModalPay(true);

    const handleUpdateVerificationPayment = (data) => {
        dispatch(setIsLoading(true));
        const dataForUpdate = {
            typemovement_id: data.typemovement_id,
            customer_id: data.customer_id,
            ingreso: data.ingreso,
            egreso: data.egreso,
            status: data.status,
            verified_payment: true,
        };
        axios
            .patch(
                `https://back-end-vivirchevere.onrender.com/api/v1/cuenta_clientes/${data.id}`,
                dataForUpdate
            )
            .then((resp) => {
                console.log(resp.data), getCuentasClientes();
            })
            .catch((error) => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    };
    return (
        <section className="Balances">
            <div className="sidebarBalances">
                <h6>
                    Bienvenido{" "}
                    {loggedUser?.first_name + " " + loggedUser?.last_name}
                </h6>
                <h6>Tipo de cuenta: {loggedUser?.Role?.name_role}</h6>
                <h6>Sede: {loggedUser?.Branches[0]?.name}</h6>
                {isAdmin ? (
                    <Select
                        defaultValue={selectedBranch}
                        onChange={(selectedOption) => {
                            setSelectedBranch(selectedOption);
                        }}
                        options={branches?.branches?.map((branch) => ({
                            value: branch.id,
                            label: branch.name,
                        }))}
                        placeholder="Selecciona una sede"
                        className="selectBranch"
                    />
                ) : null}

                <div style={{ marginTop: "1rem" }}>
                    <Button
                        type="button"
                        className="btCreateCustomer"
                        onClick={handleShowModalPay}
                    >
                        Pagar saldo
                    </Button>
                </div>
            </div>
            <div className="bodyBalances">
                <Dashboard />
                <br />

                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="acumulado" title="Acumulado">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Factura</th>
                                    <th>A nombre de</th>
                                    <th>Fecha</th>
                                    <th>
                                        Acumulado a devolver por venta{" "}
                                        <span style={{ color: "red" }}>$</span>
                                        <strong style={{ color: "red" }}>
                                            {!selectedBranch
                                                ? (
                                                      cuentaPorPagar
                                                          ?.reduce(
                                                              (
                                                                  total,
                                                                  balance
                                                              ) =>
                                                                  total +
                                                                  parseFloat(
                                                                      balance?.ingreso
                                                                  ),
                                                              0
                                                          )
                                                          .toFixed(2) -
                                                      cuentaPorPagar
                                                          ?.reduce(
                                                              (
                                                                  total,
                                                                  balance
                                                              ) =>
                                                                  balance.verified_payment
                                                                      ? total +
                                                                        parseFloat(
                                                                            balance?.egreso
                                                                        )
                                                                      : total,
                                                              0
                                                          )
                                                          .toFixed(2)
                                                  ).toFixed(2)
                                                : (
                                                      filteredCuentaPorPagar
                                                          ?.reduce(
                                                              (
                                                                  total,
                                                                  balance
                                                              ) =>
                                                                  total +
                                                                  parseFloat(
                                                                      balance?.ingreso
                                                                  ),
                                                              0
                                                          )
                                                          .toFixed(2) -
                                                      filteredCuentaPorPagar
                                                          ?.reduce(
                                                              (
                                                                  total,
                                                                  balance
                                                              ) =>
                                                                  balance.verified_payment
                                                                      ? total +
                                                                        parseFloat(
                                                                            balance?.egreso
                                                                        )
                                                                      : total,
                                                              0
                                                          )
                                                          .toFixed(2)
                                                  ).toFixed(2)}
                                        </strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!selectedBranch
                                    ? cuentaPorPagar
                                          .filter(
                                              (dataBalance) =>
                                                  dataBalance.ingreso !== "0.00"
                                          )
                                          .map((dataBalance) => (
                                              <tr key={dataBalance.id}>
                                                  <td>
                                                      {dataBalance.Movement.id}
                                                  </td>
                                                  <td>
                                                      {`${dataBalance?.Movement?.customer?.first_name} ${dataBalance?.Movement?.customer?.last_name}`}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.createdAt.slice(
                                                          0,
                                                          10
                                                      )}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.ingreso}
                                                  </td>
                                              </tr>
                                          ))
                                    : filteredCuentaPorPagar
                                          ?.filter(
                                              (dataBalance) =>
                                                  dataBalance?.ingreso !==
                                                  "0.00"
                                          )
                                          .map((dataBalance) => (
                                              <tr key={dataBalance?.id}>
                                                  <td>
                                                      {dataBalance.Movement.id}
                                                  </td>
                                                  <td>
                                                      {`${dataBalance?.Movement?.customer?.first_name} ${dataBalance?.Movement?.customer?.last_name}`}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.createdAt.slice(
                                                          0,
                                                          10
                                                      )}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.ingreso}
                                                  </td>
                                              </tr>
                                          ))}
                            </tbody>
                        </Table>
                    </Tab>

                    <Tab eventKey="ganancias" title="Ganancias">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Factura</th>
                                    <th>A nombre de</th>
                                    <th>Fecha</th>
                                    <th>
                                        Ganacia por venta{" "}
                                        <span style={{ color: "green" }}>
                                            $
                                        </span>
                                        <strong style={{ color: "green" }}>
                                            {!selectedBranch
                                                ? cuentaPorCobrar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              total +
                                                              parseFloat(
                                                                  balance?.ingreso
                                                              ),
                                                          0
                                                      )
                                                      .toFixed(2)
                                                : filteredCuentaPorCobrar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              total +
                                                              parseFloat(
                                                                  balance?.ingreso
                                                              ),
                                                          0
                                                      )
                                                      .toFixed(2)}
                                        </strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!selectedBranch
                                    ? cuentaPorCobrar
                                          ?.filter(
                                              (dataBalance) =>
                                                  dataBalance?.ingreso !==
                                                  "0.00"
                                          )
                                          .map((dataBalance) => (
                                              <tr key={dataBalance?.id}>
                                                  <td>
                                                      {dataBalance.Movement.id}
                                                  </td>
                                                  <td>
                                                      {`${dataBalance?.Movement?.customer?.first_name} ${dataBalance?.Movement?.customer?.last_name}`}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.createdAt.slice(
                                                          0,
                                                          10
                                                      )}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.ingreso}
                                                  </td>
                                              </tr>
                                          ))
                                    : filteredCuentaPorCobrar
                                          ?.filter(
                                              (dataBalance) =>
                                                  dataBalance.ingreso !== "0.00"
                                          )
                                          .map((dataBalance) => (
                                              <tr key={dataBalance?.id}>
                                                  <td>
                                                      {dataBalance.Movement.id}
                                                  </td>
                                                  <td>
                                                      {`${dataBalance?.Movement?.customer?.first_name} ${dataBalance?.Movement?.customer?.last_name}`}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.createdAt.slice(
                                                          0,
                                                          10
                                                      )}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.ingreso}
                                                  </td>
                                              </tr>
                                          ))}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="cancelado" title="Cancelado">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Verificación</th>
                                    <th>Fecha</th>
                                    <th>
                                        Montos cancelados{" "}
                                        <span style={{ color: "orange" }}>
                                            $
                                        </span>
                                        <strong style={{ color: "orange" }}>
                                            {!selectedBranch
                                                ? cuentaPorPagar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              balance.verified_payment
                                                                  ? total +
                                                                    parseFloat(
                                                                        balance?.egreso
                                                                    )
                                                                  : total,
                                                          0
                                                      )
                                                      .toFixed(2)
                                                : filteredCuentaPorPagar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              balance.verified_payment
                                                                  ? total +
                                                                    parseFloat(
                                                                        balance?.egreso
                                                                    )
                                                                  : total,
                                                          0
                                                      )
                                                      .toFixed(2)}
                                        </strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!selectedBranch
                                    ? cuentaPorPagar
                                          ?.filter(
                                              (dataBalance) =>
                                                  dataBalance?.egreso !== "0.00"
                                          )
                                          .map((dataBalance) => (
                                              <tr key={dataBalance?.id}>
                                                  <td
                                                      style={{
                                                          display: "flex",
                                                          justifyContent:
                                                              "space-between",
                                                      }}
                                                  >
                                                      {dataBalance?.verified_payment ? (
                                                          <span
                                                              style={{
                                                                  color: "green",
                                                              }}
                                                          >
                                                              Si
                                                          </span>
                                                      ) : (
                                                          <span
                                                              style={{
                                                                  color: "red",
                                                              }}
                                                          >
                                                              No
                                                          </span>
                                                      )}
                                                      {isAdmin ? (
                                                          !dataBalance?.verified_payment ? (
                                                              <button
                                                                  onClick={() =>
                                                                      handleUpdateVerificationPayment(
                                                                          dataBalance
                                                                      )
                                                                  }
                                                                  style={{
                                                                      backgroundColor:
                                                                          "red",
                                                                      borderRadius:
                                                                          "50%",
                                                                  }}
                                                              >
                                                                  <i
                                                                      style={{
                                                                          color: "white",
                                                                          fontWeight:
                                                                              "bold",
                                                                      }}
                                                                      className="bx bx-check-double"
                                                                  ></i>
                                                              </button>
                                                          ) : null
                                                      ) : null}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.createdAt.slice(
                                                          0,
                                                          10
                                                      )}
                                                  </td>
                                                  <td>{dataBalance?.egreso}</td>
                                              </tr>
                                          ))
                                    : filteredCuentaPorPagar
                                          ?.filter(
                                              (dataBalance) =>
                                                  dataBalance?.egreso !== "0.00"
                                          )
                                          .map((dataBalance) => (
                                              <tr key={dataBalance?.id}>
                                                  <td
                                                      style={{
                                                          display: "flex",
                                                          justifyContent:
                                                              "space-between",
                                                      }}
                                                  >
                                                      {dataBalance?.verified_payment ? (
                                                          <span
                                                              style={{
                                                                  color: "green",
                                                              }}
                                                          >
                                                              Si
                                                          </span>
                                                      ) : (
                                                          <span
                                                              style={{
                                                                  color: "red",
                                                              }}
                                                          >
                                                              No
                                                          </span>
                                                      )}
                                                      {isAdmin ? (
                                                          !dataBalance?.verified_payment ? (
                                                              <button
                                                                  onClick={
                                                                      handleUpdateVerificationPayment
                                                                  }
                                                                  style={{
                                                                      backgroundColor:
                                                                          "red",
                                                                      borderRadius:
                                                                          "50%",
                                                                  }}
                                                              >
                                                                  <i
                                                                      style={{
                                                                          color: "white",
                                                                          fontWeight:
                                                                              "bold",
                                                                      }}
                                                                      className="bx bx-check-double"
                                                                  ></i>
                                                              </button>
                                                          ) : null
                                                      ) : null}
                                                  </td>
                                                  <td>
                                                      {dataBalance?.createdAt.slice(
                                                          0,
                                                          10
                                                      )}
                                                  </td>
                                                  <td>{dataBalance?.egreso}</td>
                                              </tr>
                                          ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </div>
            <ModalForPay
                showModalPay={showModalPay}
                handleClosePay={handleClosePay}
            />
        </section>
    );
};

export default BalanceBranches;
