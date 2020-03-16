import React from 'react';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardAllBillsView.css';
import AllBillsTable from './SubscriberAllBillsTable';
import RightArrow from '../../../assets/right_arrow.png';

export default class BillingAllBillsView extends React.PureComponent {
  render() {
    const { callback, transactions } = this.props;
    return (
      <div className="all-bills-outer-container">
        <button
          className="subscriber-back-button"
          type="button"
          onClick={callback}
        >
          <div className="subscriber-back-button-container">
            <img
              className="button right-arrow-button-flipped"
              src={RightArrow}
              alt="right arrow"
            />
          </div>
        </button>
        <p className="all-bills-header">Billing History</p>
        <AllBillsTable transactions={transactions} />
      </div>
    );
  }
}
