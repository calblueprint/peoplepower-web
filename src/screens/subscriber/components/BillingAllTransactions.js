import React from 'react';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardAllBillsView.css';
import TransactionsTable from './TransactionsTable';
import LeftArrow from '../../../assets/left_arrow.png';

export default class BillingAllTransactions extends React.PureComponent {
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
              className="button left-arrow-button"
              src={LeftArrow}
              alt="left arrow"
            />
          </div>
        </button>
        <p className="all-bills-header">Billing History</p>
        <TransactionsTable transactions={transactions} />
      </div>
    );
  }
}
