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
    const { header, body, action } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={`modal ${isOpen ? '' : 'close'}`}>
        <div className="modal-content">
          <div className="modal-header">{header}</div>
          <div className="modal-body">{body || "Uh oh! Something went wrong."}</div>
          <button
            onClick={this.closeModal}
            type="button"
            className="modal-button"
          >
            {action}
          </button>
        </div>
      </div>
    );
  }
}
