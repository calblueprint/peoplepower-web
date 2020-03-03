import React from 'react';
import Modal from '../../components/Modal';

export default class ModalDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal
          header="Optional Heading"
          body="Uh oh! Something went wrong."
          action="Close"
        />
      </div>
    );
  }
}
