import React from 'react';
import '../../../styles/SubscriberOwnerDashboardMainView.css';
import { centsToDollars } from '../../../lib/subscriberUtils';
import { getLoggedInUserId } from '../../../lib/auth';

export default class SubscriberOwnerDashboardMainView extends React.Component {
  constructor(props) {
    super(props);
    const { bills } = this.props;
    this.state = {
      latestBill: bills.filter(bill => bill['Is Latest'])[0]
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
    }
  }

  render() {
    const { callback } = this.props;
    const { latestBill } = this.state;
    return (
      <div className="subscriber-dash-outer-container">
        <h3>My Finances</h3>
        <div className="subscriber-dash-inner-container">
          <div className="subscriber-left-col subscriber-dash-col">
            <p className="subscriber-header">Billing Summary</p>
            <div className="col-card">
              <div className="class-elems">
                <div className="balance-header-section">
                  <p>Your Balance</p>
                  <h3>${centsToDollars(latestBill['Amount Due'])}</h3>
                </div>
                <hr id="divider" />
                <div className="balance-nums-section">
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Due Now</p>
                    <p className="line-item">
                      ${centsToDollars(latestBill['Amount Due'])}
                    </p>
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
                      <strong>
                        ${centsToDollars(latestBill['Amount Due'])}
                      </strong>
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <button
                  className="subscriber-button payment-button"
                  type="button"
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
          <div className="subscriber-right-col subscriber-dash-col">
            <div className="subscriber-right-duo-header">
              <p className="subscriber-header">Recent Transactions</p>
              <button
                className="subscriber-all-billls-button"
                type="button"
                onClick={callback}
              >
                →
              </button>
            </div>
            <div className="col-card" />
          </div>
        </div>
      </div>
    );
  }
}
