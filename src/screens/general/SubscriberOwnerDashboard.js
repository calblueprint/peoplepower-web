import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import '../../styles/SubscriberOwnerDashboard.css';
import { getLoggedInUserId } from '../../lib/auth';
import { centsToDollars } from '../../lib/subscriberHelper';
import recordPaymentSuccess from '../../lib/paypal';

import secret from '../../secret';

const { clientId } = secret;

export default class SubscriberOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    const { bills } = this.props;
    this.state = {
      latestBill: bills.filter(bill => bill['Is Latest'])[0]
    };
    this.onPaypalPaymentSuccess = this.onPaypalPaymentSuccess.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
    }
  }

  onPaypalPaymentSuccess(details, data) {
    const { latestBill } = this.state;
    recordPaymentSuccess(details, data, latestBill);
  }

  render() {
    const { callback } = this.props;
    const { latestBill } = this.state;
    const amtDue = centsToDollars(latestBill['Amount Due']);
    return (
      <div className="subscriber-dash-outer-container">
        <h3>My Finances</h3>
        <div className="subscriber-dash-inner-container">
          <div className="left-col subscriber-dash-col">
            <p className="subscriber-header">Billing Summary</p>
            <div className="col-card">
              <div className="class-elems">
                <div className="balance-header-section">
                  <p>Your Balance</p>
                  <h3>${amtDue}</h3>
                </div>
                <hr id="divider" />
                <div className="balance-nums-section">
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Due Now</p>
                    <p className="line-item">${amtDue}</p>
                  </div>
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Upcoming</p>
                    <p className="line-item">$0.00</p>
                  </div>
                  <br />
                  <br />
                  <div className="balance-nums-line">
                    <p className="line-item descrip">
                      <strong>Total</strong>
                    </p>
                    <p className="line-item">
                      <strong>${amtDue}</strong>
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <PayPalButton
                  amount={amtDue}
                  onSuccess={this.onPaypalPaymentSuccess}
                  options={{
                    clientId
                  }}
                />
              </div>
            </div>
          </div>
          <div className="right-col subscriber-dash-col">
            <p className="subscriber-header">Recent Transactions</p>
            <div className="col-card">
              <div className="TEMP">
                <button
                  className="subscriber-button"
                  type="button"
                  onClick={callback}
                >
                  See all bills
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
