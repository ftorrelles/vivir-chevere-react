import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";
import "animate.css/animate.min.css";
import { Button } from "react-bootstrap";

const ContentHome = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate("vivirchevere.com/virtual_office/admin");
    };
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <Button
                            variant="warning"
                            className="btHome animate__animated animate__bounceIn"
                        >
                            <Link to="/login">Iniciar sesión sede</Link>
                        </Button>
                        <Button onClick={handleButton}>
                            Iniciar sesión oficina virtual
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContentHome;
