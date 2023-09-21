
import Modal from "react-bootstrap/Modal";

function ModalCenter({ title, children, show, setShow }) {
  const handleClose = () => setShow(false)
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalCenter;
