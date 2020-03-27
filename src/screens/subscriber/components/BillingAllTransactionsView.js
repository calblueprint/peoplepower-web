import React from 'react';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardAllBillsView.css';
import AllTransactionsTable from './SubscriberAllTransactionsTable';
import RightArrow from '../../../assets/right_arrow.png';

export default class BillingAllTransactionsView extends React.PureComponent {
  render() {
    const { seeMain, transactions } = this.props;
    return (
      <div className="all-bills-outer-container">
        <button
          className="subscriber-back-button"
          type="button"
          onClick={seeMain}
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
        <AllTransactionsTable transactions={transactions} />
      </div>
    );
  }
}
