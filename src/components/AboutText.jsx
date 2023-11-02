import { Button } from "react-bootstrap";
import "../styles/aboutText.css";
import ModalVision from "./ModalVision";
import { useState } from "react";
import ModalMision from "./ModalMision";

import "animate.css/animate.min.css";
//libreria para detectar cuando la seccion este en el vh
import { useInView } from "react-intersection-observer";

const AboutText = () => {
    //logica libreria react-intersection-observer
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });
    //modal Vision
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //modal Mision
    const [showMision, setShowMision] = useState(false);
    const handleCloseMision = () => setShowMision(false);
    const handleShowMision = () => setShowMision(true);

    return (
        <>
            <div className="about-container">
                <h2
                    className={`animate__animated ${
                        inView ? "animate__fadeInDown" : ""
                    }`}
                    ref={ref}
                >
                    ¿Quiénes SOMOS?
                </h2>
                <p>
                    {/* Somos una empresa nacional de productos naturales que cree
                    en la importancia de la salud y el bienestar. Nuestros
                    productos están hechos con ingredientes naturales de alta
                    calidad, y están diseñados para mejorar tu salud y tu
                    calidad de vida. */}
                    En Vivir chevere, somos una empresa nacional dedicada a la
                    promoción y la entrega de productos naturales. Nos apasiona
                    la importancia de la salud y el bienestar en la vida de las
                    personas. Cada uno de nuestros productos es una
                    manifestación de esta pasión. Nuestro compromiso es ofrecer
                    solo ingredientes naturales de la más alta calidad en cada
                    producto que elaboramos. Creemos que la salud es la base de
                    una vida plena y satisfactoria, y nuestro objetivo es ser un
                    apoyo constante en tu búsqueda de una mejor calidad de vida.
                    <br />
                    <br />
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                    }}
                >
                    <div>
                        <Button
                            variant="outline-warning"
                            type="button"
                            onClick={handleShow}
                        >
                            Vision
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="outline-warning"
                            type="button"
                            onClick={handleShowMision}
                        >
                            Mision
                        </Button>
                    </div>
                </div>
            </div>
            <ModalVision show={show} handleClose={handleClose} />
            <ModalMision
                showMision={showMision}
                handleCloseMision={handleCloseMision}
            />
        </>
    );
};

export default AboutText;
