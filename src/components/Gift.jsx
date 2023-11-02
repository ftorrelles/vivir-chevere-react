import { Container } from "react-bootstrap";
import "../styles/gift.css";

const Gift = () => {
    return (
        <>
            <Container fluid>
                <section className="section_gift">
                    <div>
                        <h2
                            style={{
                                paddingBottom: "2rem",
                                textAlign: "center",
                                color: "#f05a36",
                            }}
                        >
                            <strong>Premio Regalo de Navidad</strong>
                        </h2>
                    </div>
                    <div className="gift">
                        <div className="gift_member">
                            <h3 className="member_name">Premio</h3>
                            <div className="member_image">
                                <img src="/2.png" className="active" alt="" />
                            </div>
                            <div className="member_description">
                                <p>
                                    Podras escoger
                                    <br />
                                    <br />
                                    Smart TV 32p <br />
                                    <br />
                                    Telefono Xiaomi Redmi 12C
                                </p>
                            </div>
                        </div>
                        <div className="gift_member">
                            <h3 className="member_name">Condiciones</h3>
                            <div className="member_image">
                                <img src="/3.png" className="active" alt="" />
                            </div>
                            <div className="member_description">
                                <p>
                                    Vender 30 combos Limpiador
                                    <br />
                                    <br />
                                    Valido hasta el 30 de noviembre <br />
                                    <br />
                                    al mismo tiempo generas ganacias
                                </p>
                            </div>
                        </div>
                        <div className="gift_member">
                            <h3 className="member_name">Producto valido</h3>
                            <div className="member_image">
                                <img src="/4.png" className="active" alt="" />
                            </div>
                            <div className="member_description">
                                <p>
                                    Combo limpiador
                                    <br />
                                    <br />
                                    Desparasitante
                                    <br />
                                    Noni con totumo
                                    <br />
                                    Formula Nogal
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    );
};

export default Gift;
