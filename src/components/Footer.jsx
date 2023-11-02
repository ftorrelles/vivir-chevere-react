import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer_container">
                    <div className="footer-content">
                        <h3 style={{ textAlign: "center" }}>Sobre nosotros</h3>
                        <div style={{ textAlign: "center" }}>
                            <a href="/#">
                                <p>Acerca de nosotros</p>
                            </a>
                        </div>
                    </div>
                    <div className="footer-content">
                        <h3 style={{ textAlign: "center" }}>
                            <a href="/#">
                                <strong>Vivir Chevere</strong>
                            </a>
                        </h3>
                    </div>
                    <div className="footer-content">
                        <h3 style={{ textAlign: "center" }}>
                            Tienda Virtual y Sede
                        </h3>
                        <div style={{ textAlign: "center" }}>
                            <p>
                                <Link to="/searcher">Sede</Link>
                            </p>
                            <p>
                                <Link to="/login">Tienda virtual</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="copy">
                    <p className="footer_copy">
                        ©Vivir chevere. All rigths reserved{" "}
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
