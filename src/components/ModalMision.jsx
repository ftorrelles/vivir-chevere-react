import Modal from "react-bootstrap/Modal";

const ModalMision = ({ showMision, handleCloseMision }) => {
    return (
        <>
            <Modal
                className="modal-lg"
                show={showMision}
                onHide={handleCloseMision}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Mision</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ color: "black" }}>
                        Nuestra misión es ofrecer productos naturales de la más
                        alta calidad, elaborados con ingredientes cuidadosamente
                        seleccionados, con el firme propósito de contribuir
                        significativamente al bienestar de las personas. Nos
                        esforzamos por ser una fuente confiable y constante de
                        productos que no solo nutren el cuerpo, sino que también
                        fomentan la conexión entre la salud y la felicidad. Nos
                        enorgullece no solo proporcionar productos, sino ser un
                        aliado en tu búsqueda de un estilo de vida más saludable
                        y equilibrado. Creemos que cada elección que haces puede
                        ser una inversión en tu bienestar, y estamos
                        comprometidos a hacer que esas elecciones sean fáciles y
                        efectivas para ti.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalMision;
