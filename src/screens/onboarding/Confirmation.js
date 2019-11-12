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
    const { values } = this.props;
    const {
      ccnumber,
      expmonth,
      expyear,
      ccstreet,
      ccapt,
      cccity,
      ccstate,
      cczipcode,
      numShares
    } = values;
    return (
      <div className="center">
        <div className="header">Confirmation Page</div>
        <div className="flex row">
          <div className="confirmation-card">
            <div className="header">Billing Address</div>
            <div className="body">
              {ccstreet} {ccapt}
              {cccity}, {ccstate} {cczipcode}
            </div>
          </div>
          <div className="confirmation-card">
            <div className="header">Payment Method</div>
            <div className="body">
              Visa **** **** **** {ccnumber.replace(/.(?=.{4})/g, 'x')}
              Expires in {expmonth} {expyear}
            </div>
          </div>
          <div className="confirmation-card">
            <div className="header">Order Summary</div>
            <div className="body">
              <div>Shares</div>
              <div>${numShares * 100}.00</div>
              <div>Qty:{numShares}</div>
              <br />
              <div>Total</div>
              <div>${numShares * 100}.00</div>
            </div>
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
