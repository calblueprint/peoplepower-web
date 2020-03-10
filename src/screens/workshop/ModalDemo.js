import React from 'react';
import PPModal from '../../components/PPModal';
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
        <PPModal
          header="Optional Heading"
          body=""
          actionName="Close"
          showModal={showModal}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
