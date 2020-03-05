import React from 'react';
import '../styles/Modal.css';

export default class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  closeModal = () => {
    const { isOpen } = this.state;
    if (isOpen === true) {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const { header, body, action, actionName } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={`pp-general-modal ${isOpen ? '' : 'pp-general-close'}`}>
        <div className="pp-general-modal-content">
          <div className="pp-general-modal-header">{header}</div>
          <div className="pp-general-modal-body">
            {body || 'Uh oh! Something went wrong.'}
          </div>
          <button
            onClick={action || this.closeModal}
            type="button"
            className="pp-general-modal-button"
          >
            {actionName || 'Close'}
          </button>
        </div>
      </div>
    );
  }
}
