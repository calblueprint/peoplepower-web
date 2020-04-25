import React from 'react';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardAllBillsView.css';
import TransactionsTable from './TransactionsTable';
import LeftArrow from '../../../assets/left_arrow.png';

export default class BillingAllTransactions extends React.PureComponent {
  render() {
    const { transactions, history } = this.props;
    return (
      <div className="all-bills-outer-container">
        <button
          className="subscriber-back-button"
          type="button"
          onClick={history.goBack}
        >
          <div className="subscriber-back-button-container">
            <img
              className="button left-arrow-button"
              src={LeftArrow}
              alt="left arrow"
            />
          </div>
        </button>
        <h1 className="all-bills-header">Transaction History</h1>
        <TransactionsTable transactions={transactions} />
      </div>
    );
  }
}
