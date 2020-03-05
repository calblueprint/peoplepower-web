import React from 'react';
import PpModal from '../../components/PpModal';
import '../../styles/Modal.css';

export default class ModalDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  /* open/close modal logic */
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <PpModal
          // header="Optional Heading"
          body="Hello"
          actionName="Close"
          showModal={showModal}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
