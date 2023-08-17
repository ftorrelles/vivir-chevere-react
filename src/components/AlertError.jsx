import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
// import Button from "react-bootstrap/Button";

function AlertError({ isVisible, dismiss }) {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => dismiss()} dismissible>
                <Alert.Heading>
                    oops!!! hay un problema, Tu correo o contraseña son
                    incorrectos! o no estas autorizado a ingresar
                </Alert.Heading>
                <p>Por favor revisa e intenta de nuevo.</p>
                <p>recuerda si no eres una sede no puedes ingresar.</p>
            </Alert>
        );
    }
}

export default AlertError;
