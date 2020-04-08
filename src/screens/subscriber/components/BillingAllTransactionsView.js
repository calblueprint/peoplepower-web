import React from 'react';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardAllBillsView.css';
import TransactionsTable from './TransactionsTable';
import RightArrow from '../../../assets/right_arrow.png';

export default class BillingAllTransactionsView extends React.PureComponent {
  render() {
    const { seeMainView, transactions } = this.props;
    return (
      <div className="all-bills-outer-container">
        <button
          className="subscriber-back-button"
          type="button"
          onClick={seeMainView}
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
        <TransactionsTable transactions={transactions} />
      </div>
    );
  }
}
