import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {MdDelete} from 'react-icons/md'
function DeleteModal({handleDelete,message,task}) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    
    setShow(false)};
  const handleShow = () => setShow(true);

  return (
    <>
     <MdDelete onClick={handleShow} className="col-2"/>
      <Modal show={show} onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cansel
          </Button>
          <Button variant="primary" onClick={()=>{handleDelete(task.taskId)}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;