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
                    oops!!! Tu correo o contraseña son incorrectos!
                </Alert.Heading>
                <p>Por favor revisa e intenta de nuevo.</p>
            </Alert>
        );
    }
}

export default AlertError;
