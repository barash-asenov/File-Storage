import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal
} from 'react-bootstrap';


const NoticeModal = ({showModal, onHandleCloseModal, onHandleReject, onHandleAccept, modalTitle, modalBody, rejectText, acceptText}) => {
  return (
    <Modal show={showModal} onHide={onHandleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHandleReject}>
          {rejectText}
        </Button>
        <Button variant="primary" onClick={onHandleAccept}>
          {acceptText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

NoticeModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onHandleCloseModal: PropTypes.func.isRequired,
  onHandleReject: PropTypes.func.isRequired,
  onHandleAccept: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalBody: PropTypes.string.isRequired,
  rejectText: PropTypes.string.isRequired,
  acceptText: PropTypes.string.isRequired,
};

export default NoticeModal;
