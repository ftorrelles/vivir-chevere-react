import React from "react";
import "../styles/socialInnovation.css";
import "animate.css/animate.min.css";
//libreria para detectar cuando la seccion este en el vh
import { useInView } from "react-intersection-observer";

const SocialInnovation = () => {
    //logica libreria react-intersection-observer
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });
    return (
        <section className="social-innovation">
            <h2
                className={`section-title animate__animated ${
                    inView ? "animate__fadeInDown" : ""
                }`}
                ref={ref}
            >
                <strong>Innovación social</strong>
            </h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="octagon-wrapper">
                            <div className="octagon octagon-4">
                                <h3 className="octagon-title">
                                    Sistema de afiliados
                                </h3>
                                <p className="octagon-description">
                                    En Vivir chevere, no solo ofrecemos
                                    productos naturales de alta calidad, sino
                                    también la oportunidad de convertirte en un
                                    vendedor afiliado. Esto te permite generar
                                    ingresos compartiendo nuestros productos con
                                    otros, promoviendo un estilo de vida
                                    saludable y sostenible.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="octagon-wrapper">
                            <div className="octagon octagon-4">
                                <h3 className="octagon-title">
                                    Promociones y Sorteos{" "}
                                </h3>
                                <p className="octagon-description">
                                    Porque te valoramos ofrecemos descuentos
                                    exclusivos, acceso anticipado a nuevos
                                    productos y emocionantes sorteos para
                                    premiar tu lealtad y compromiso. Queremos
                                    que te sientas parte de algo especial al
                                    unirte a nuestra comunidad.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="octagon-wrapper">
                            <div className="octagon octagon-4">
                                <h3 className="octagon-title">
                                    Comunidad y Crecimiento
                                </h3>
                                <p className="octagon-description">
                                    Nos esforzamos por construir una comunidad
                                    en la que todos prosperen. Al unirte a
                                    nuestra red, te unes a una comunidad
                                    dedicada al bienestar, donde trabajamos
                                    juntos para promover un estilo de vida más
                                    saludable y sostenible. Tu éxito es nuestro
                                    éxito, y juntos estamos dando forma a un
                                    mundo más saludable y equitativo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialInnovation;
