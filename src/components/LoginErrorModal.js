import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

export const LoginErrorModal = (props) => {
  const { open, toggle, className } = props;
  return (
    <Modal isOpen={open} toggle={toggle} className={'modal-info ' + className}>
      <ModalHeader toggle={toggle}>Login Error</ModalHeader>
      <ModalBody>
        <p>로그인 처리 중 오류가 발생하였습니다.</p>
        <p>로그인 정보를 확인하고 다시 시도해주세요.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

LoginErrorModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.any,
  className: PropTypes.any,
};
