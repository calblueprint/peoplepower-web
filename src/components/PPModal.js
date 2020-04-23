import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../styles/PPModal.css';

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
      handleCloseModal,
      returnHome
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
        <div>
          {typeof returnHome !== 'undefined' ? (
            <button
              type="button"
              className="pp-general-modal-button-back"
              onClick={returnHome}
            >
              <Link to="/" className="subscriber-link-text-white">
                Back to homepage
              </Link>
            </button>
          ) : null}
          <button
            onClick={action || handleCloseModal}
            type="button"
            className="pp-general-modal-button"
          >
            {actionName || 'Close'}
          </button>
        </div>
      </Modal>
    );
  }
}
