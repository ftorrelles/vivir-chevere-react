import { Link } from "react-router-dom";
import "../styles/home.css";
import "animate.css/animate.min.css";
import { Button } from "react-bootstrap";

const ContentHome = () => {
    return (
        <>
            <section className="home">
                <div className="overlay"></div>
                <div className="container_home">
                    <h1 className="title animate__animated animate__fadeInDown">
                        Vivir Chevere
                    </h1>
                    <p className="subtitle animate__animated animate__fadeInUp">
                        Cuidate hoy... Vive chevere mañana!!!
                    </p>
                    <Button
                        variant="warning"
                        className="btHome animate__animated animate__bounceIn"
                    >
                        <Link to="/login">Iniciar sesión</Link>
                    </Button>
                </div>
            </section>
        </>
    );
};

export default ContentHome;
