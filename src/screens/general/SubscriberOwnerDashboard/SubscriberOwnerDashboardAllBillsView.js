import React from 'react';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardAllBillsView.css';
import SubscriberOwnerDashboardAllBillsTable from './SubscriberOwnerDashboardAllBillsTable';

export default class SubscriberOwnerDashboardAllBillsView extends React.PureComponent {
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
            <div className="subscriber-back-arrow">←</div>
            <div className="subscriber-back-text">Back</div>
          </div>
        </button>
        <p className="all-bills-header">Billing History</p>
        <SubscriberOwnerDashboardAllBillsTable transactions={transactions} />
      </div>
    );
  }
}
