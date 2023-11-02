import Modal from "react-bootstrap/Modal";

const ModalVision = ({ show, handleClose }) => {
    return (
        <>
            <Modal className="modal-lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Vision</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ color: "black" }}>
                        Nuestra visión es convertirnos en la empresa líder en
                        productos naturales, desempeñando un papel fundamental
                        en ayudar a las personas a mejorar su salud y bienestar.
                        Deseamos ser un faro de inspiración para la adopción de
                        un estilo de vida más saludable y sostenible en la
                        sociedad. Buscamos liderar el camino en la innovación y
                        la sostenibilidad en la industria de productos
                        naturales, empoderando a las personas para tomar
                        decisiones informadas sobre su salud y la del planeta.
                        Visualizamos un futuro en el que nuestros productos sean
                        reconocidos como sinónimo de calidad, confiabilidad y
                        bienestar.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalVision;
