import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-v6';
import '../../styles/SubscriberMakePayment.css';

export default class MakePayment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      payAmount: 0
    };
  }

  render() {
    // const { isLoadingUserData, transactions, pendingBills } = this.props;
    return (
      <div>
        <Link
          to={{
            pathname: '/billing',
            mode2: 0
          }}
        >
          Back
        </Link>
        <div className="make-pay-header">Make Payment</div>
        <div className="make-pay-main">
          <div className="make-pay-description-section">
            <ReactTable />
          </div>
          <div className="make-pay-payment-section" />
        </div>
      </div>
    );
  }
}
