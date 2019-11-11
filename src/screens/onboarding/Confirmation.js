import React from 'react';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  finishButton = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    onSubmit();
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  render() {
    return (
      <div className="center">
        <div className="header">Confirmation Page</div>
        <div className="flex row">
          <div className="confirmation-card">
            <div className="header">Billing Address</div>
            <div className="body">Billing adress</div>
          </div>
          <div className="confirmation-card">
            <div className="header">Payment Method</div>
            <div className="body">payment info</div>
          </div>
          <div className="confirmation-card">
            <div className="header">Order Summary</div>
            <div className="body">summary</div>
          </div>
        </div>
        <div>
          <button type="button" onClick={this.prevButton}>
            Go back
          </button>
          <button type="button" onClick={this.finishButton}>
            Submit Payment
          </button>
        </div>
      </div>
    );
  }
}

export default Confirmation;
