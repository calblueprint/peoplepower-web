import React from 'react';
import '../../../styles/BillingAllTransactions.css';
import TransactionsTable from './TransactionsTable';
import LeftArrow from '../../../assets/left_arrow.png';

export default class BillingAllTransactions extends React.PureComponent {
  render() {
    const { transactions, seeMainView } = this.props;
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
            <div className="left-arrow-back">Back</div>
          </div>
        </button>
        <h1 className="all-bills-header">Transaction History</h1>
        <TransactionsTable transactions={transactions} />
      </div>
    );
  }
}
