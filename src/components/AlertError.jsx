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
                    oops!!! your username or password is incorrect!
                </Alert.Heading>
                <p>please check and try again.</p>
            </Alert>
        );
    }
}

export default AlertError;
