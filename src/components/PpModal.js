import React from 'react';
import Modal from 'react-modal';
import '../styles/Modal.css';

const ROOT_ELEMENT = '#root';
Modal.setAppElement(ROOT_ELEMENT);

export default class PPModal extends React.PureComponent {
  render() {
    const {
      showModal,
      body,
      header,
      actionName,
      action,
      handleCloseModal
    } = this.props;
    return (
      <Modal
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={handleCloseModal}
        className="pp-general-modal-content"
        overlayClassName="pp-general-modal-backdrop"
      >
        <div className="pp-general-modal-header">{header}</div>
        <div className="pp-general-modal-body">
          {body || 'Uh oh! Something went wrong.'}
        </div>
        <button
          onClick={action || handleCloseModal}
          type="button"
          className="pp-general-modal-button"
        >
          {actionName || 'Close'}
        </button>
      </Modal>
    );
  }
}
