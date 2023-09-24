import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { IoWarningOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
function DeleteModal({ loading, handleDelete, title, id }) {
  const [show, setShow] = useState(false);
  const handleClose = () =>  setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <MdDelete onClick={handleShow} className="col-2" />
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="align-item-center">
            <span className="text-danger mb-0">
              {" "}
              <IoWarningOutline className="mb-2" /> Deleting
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to remove "{title}"?</Modal.Body>
        <Modal.Footer>
          <div className="modal_footer col-12">
            <button
              className="col-5 ms-1 me-1 submit border-n"
              variant="secondary"
              onClick={handleClose}
            >
              No
            </button>
            <button
              variant="primary"
              className="col-5 ms-1 me-1 submit border-n"
              onClick={() => {
                handleDelete(id)
              }}
            >
              {loading && (
                <Spinner animation="border" role="status" size="sm" />
              )}{" "}
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>

        </>
  );
}

export default DeleteModal;
