import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import ModalForPay from "../components/ModalForPay";
import Dashboard from "../components/Dashboard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const BalanceBranches = () => {
    const [key, setKey] = useState("acumulado");

    const [cuentaPorPagar, setCuentaPorPagar] = useState([]);
    const [cuentaPorCobrar, setCuentaPorCobrar] = useState([]);

    const [filteredCuentaPorPagar, setFilteredCuentaPorPagar] = useState([]);
    const [filteredCuentaPorCobrar, setFilteredCuentaPorCobrar] = useState([]);

    // const [dataBalances, setDataBalances] = useState([]);
    // const [filteredDataBalance, setFilteredDataBalance] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branches, setBranches] = useState([]);
    // const [filteredBranch, setFilteredBranch] = useState([]);
    // const [totalSaldo, setTotalSaldo] = useState(0);

    const [showModalPay, setShowModalPay] = useState(false);
    const loggedUser = useSelector((state) => state.loggedUser);

    //Obtener datos
    const isAdmin = loggedUser?.role_id == 3;

    // const getCuentaCLiente = () => {
    //     axios
    //         .get(
    //             "https://back-end-vivirchevere.onrender.com/api/v1/cuenta_clientes"
    //         )
    //         .then((response) => {
    //             setDataBalances(
    //                 response.data.cuenta_clientes.filter(
    //                     (dataBalance) => dataBalance?.typemovement_id == 5
    //                 )
    //             );
    //             // console.log(response.data);
    //         })
    //         .catch((error) => console.error(error));
    // };
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
            .catch((error) => console.error(error));
    };
    // console.log(cuentaPorCobrar);
    // console.log(cuentaPorPagar);
    useEffect(() => {
        // getCuentaCLiente();
        getBranches();
        getCuentasClientes();
    }, []);
    // console.log(selectedBranch);
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
    ///////////////////////////////////////////////

    //funcion para filtro si es administrador o no
    // useEffect(() => {
    //     if (!isAdmin) {
    //         const loggedBranch = branches?.branches?.find((branch) => {
    //             return branch?.id == loggedUser?.Branches[0]?.id;
    //         });
    //         setFilteredBranch(loggedBranch ? [loggedBranch] : []);
    //     } else {
    //         setFilteredBranch(branches?.branches);
    //     }
    // }, [branches]);
    // console.log(filteredBranch);
    // console.log(dataBalances);
    //funcion para filtrar por sede seleccionada
    // useEffect(() => {
    //     let filtered = dataBalances;
    //     if (!isAdmin) {
    //         // No es un administrador, filtra por sede actual del usuario
    //         filtered = filtered?.filter((movement) => {
    //             return (
    //                 movement?.Customer?.Branches[0]?.id ==
    //                 loggedUser?.Branches[0]?.id
    //             );
    //         });
    //     } else {
    //         // Es un administrador y ha seleccionado una sede
    //         filtered = filtered?.filter((movement) => {
    //             return (
    //                 movement?.Customer?.Branches[0]?.id == selectedBranch?.value
    //             );
    //         });
    //     }

    //     setFilteredDataBalance(filtered);
    // }, [dataBalances, selectedBranch, loggedUser]);
    //funcion para obtener total de deuda
    // useEffect(() => {
    //     const totalIngreso = filteredDataBalance.reduce(
    //         (total, balance) => total + parseFloat(balance.ingreso),
    //         0
    //     );
    //     const totalEgreso = filteredDataBalance.reduce(
    //         (total, balance) => total + parseFloat(balance.egreso),
    //         0
    //     );
    //     const nuevoSaldoPendiente = totalIngreso - totalEgreso;
    //     setTotalSaldo(nuevoSaldoPendiente.toFixed(2));
    // }, [filteredDataBalance]);
    // console.log(totalSaldo);
    // console.log(loggedUser);
    //modal para pago

    const handleClosePay = () => setShowModalPay(false);
    const handleShowModalPay = () => setShowModalPay(true);

    useEffect(() => {
        // getCuentaCLiente();
        getCuentasClientes();
    }, [showModalPay]);
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
                                    <th>Fecha</th>
                                    <th>
                                        Acumulado a devolver por venta{" "}
                                        <span style={{ color: "red" }}>$</span>
                                        <strong style={{ color: "red" }}>
                                            {!selectedBranch
                                                ? cuentaPorPagar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              total +
                                                              parseFloat(
                                                                  balance?.ingreso
                                                              ),
                                                          0
                                                      )
                                                      .toFixed(2) -
                                                  cuentaPorPagar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              total +
                                                              parseFloat(
                                                                  balance?.egreso
                                                              ),
                                                          0
                                                      )
                                                      .toFixed(2)
                                                : filteredCuentaPorPagar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              total +
                                                              parseFloat(
                                                                  balance?.ingreso
                                                              ),
                                                          0
                                                      )
                                                      .toFixed(2) -
                                                  filteredCuentaPorPagar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              total +
                                                              parseFloat(
                                                                  balance?.egreso
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
                                    ? cuentaPorPagar
                                          .filter(
                                              (dataBalance) =>
                                                  dataBalance.ingreso !== "0.00"
                                          )
                                          .map((dataBalance) => (
                                              <tr key={dataBalance.id}>
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
                                                              total +
                                                              parseFloat(
                                                                  balance?.egreso
                                                              ),
                                                          0
                                                      )
                                                      .toFixed(2)
                                                : filteredCuentaPorPagar
                                                      ?.reduce(
                                                          (total, balance) =>
                                                              total +
                                                              parseFloat(
                                                                  balance?.egreso
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
                                    ? cuentaPorPagar
                                          ?.filter(
                                              (dataBalance) =>
                                                  dataBalance?.egreso !== "0.00"
                                          )
                                          .map((dataBalance) => (
                                              <tr key={dataBalance?.id}>
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
                    <Tab eventKey="ganancias" title="Ganancias">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
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
                </Tabs>

                {/* {selectedBranch ? (
                    <>
                        <br />
                        <p>
                            Saldo Pendiente en{" "}
                            <span style={{ color: "red" }}>
                                {selectedBranch?.label}
                            </span>{" "}
                            : <strong>{totalSaldo}</strong>
                        </p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>fecha</th>
                                    <th>Acumulado por venta</th>
                                    <th>Saldo cancelado</th>
                                    <th>Saldo pendiente</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDataBalance?.map(
                                    (dataBalance, index) => {
                                        const ingreso =
                                            parseFloat(dataBalance.ingreso) ||
                                            0; // Si no se puede convertir, establecer en 0
                                        const egreso =
                                            parseFloat(dataBalance.egreso) || 0; // Si no se puede convertir, establecer en 0

                                        const saldoPendiente =
                                            index === 0
                                                ? ingreso - egreso
                                                : filteredDataBalance[index - 1]
                                                      .saldoPendiente +
                                                  ingreso -
                                                  egreso;

                                        dataBalance.saldoPendiente =
                                            saldoPendiente;
                                        return (
                                            <tr key={dataBalance?.id}>
                                                <td>
                                                    {dataBalance?.created_at.slice(
                                                        0,
                                                        10
                                                    )}
                                                </td>
                                                <td>{ingreso.toFixed(2)}</td>
                                                <td>{egreso.toFixed(2)}</td>
                                                <td>
                                                    {saldoPendiente.toFixed(2)}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <img src="/sedes.jpg" alt="Buscar sedes" />
                )} */}
            </div>
            <ModalForPay
                showModalPay={showModalPay}
                handleClosePay={handleClosePay}
            />
        </section>
    );
};

export default BalanceBranches;
