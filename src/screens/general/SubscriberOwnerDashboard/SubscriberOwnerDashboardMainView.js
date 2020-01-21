import React from 'react';
import ReactTable from 'react-table-v6';
import { PayPalButton } from 'react-paypal-button-v2';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardMainView.css';
import { centsToDollars, formatStatus } from '../../../lib/subscriberUtils';
import { dateToFullMonth, formatDate } from '../../../lib/dateUtils';
import {
  getTotalBalanceFromBills,
  recordPendingBillsPaymentSuccess
} from '../../../lib/paypalUtils';

import constants from '../../../constants';

const { ONLINE_PAYMENT_TYPE } = constants;

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

const renderCondensedBillDisplayHeader = headerText => {
  return () => (
    <div className="subscriber-bills-display-header">{headerText}</div>
  );
};

const createCondensedPaymentTransaction = transaction => {
  return {
    startDate: transaction.startDate,
    statementDate: formatDate(transaction.transactionDate),
    description: transaction.type,
    status: formatStatus(transaction.status),
    payment: `$${centsToDollars(transaction.amount)}`
  };
};

const createCondensedBillTransaction = transaction => {
  return {
    balance: transaction.balance,
    startDate: transaction.startDate,
    statementDate: formatDate(transaction.transactionDate),
    description: `${dateToFullMonth(transaction.startDate)} Power Bill`,
    status: transaction.status,
    amtDue: `$${centsToDollars(transaction.amountDue)}`
  };
};

export default class SubscriberOwnerDashboardMainView extends React.Component {
  constructor(props) {
    super(props);
    const { transactions } = this.props;
    this.state = {
      data: transactions.map(t =>
        t.type === ONLINE_PAYMENT_TYPE
          ? createCondensedPaymentTransaction(t)
          : createCondensedBillTransaction(t)
      )
    };
  }

  onPaypalPaymentSuccess = async (details, data) => {
    try {
      const { pendingBills } = this.props;
      await recordPendingBillsPaymentSuccess(details, data, pendingBills);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { callback } = this.props;
    const { data } = this.state;

    const { pendingBills } = this.props;
    const totalBalance = getTotalBalanceFromBills(pendingBills);
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
                  <h3>${centsToDollars(totalBalance)}</h3>
                </div>
                <hr id="divider" />
                <div className="balance-nums-section">
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Due Now</p>
                    <p className="line-item">${centsToDollars(totalBalance)}</p>
                  </div>
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Upcoming</p>
                    <p className="line-item">$0.00</p>{' '}
                    {/* TODO: currently assumes all bills due now */}
                  </div>
                  <br />
                  <br />
                  <div className="balance-nums-line">
                    <p className="line-item descrip">
                      <strong>Total</strong>
                    </p>
                    <p className="line-item">
                      <strong>${centsToDollars(totalBalance)}</strong>
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <div className="subscriber-dashboard-paypal-component">
                  {totalBalance === 0 ? null : (
                    <PayPalButton
                      amount={centsToDollars(totalBalance)}
                      onSuccess={this.onPaypalPaymentSuccess}
                      options={{
                        clientId
                      }}
                      style={{
                        color: 'black'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="subscriber-right-col subscriber-dash-col">
            <div className="subscriber-right-duo-header">
              <p className="subscriber-header">Billing History</p>
              <button
                className="subscriber-all-billls-button"
                type="button"
                onClick={callback}
              >
                →
              </button>
            </div>
            <div className="col-card">
              <ReactTable
                data={data}
                columns={[
                  {
                    Header: renderCondensedBillDisplayHeader('DATE'),
                    id: 'statementDate',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        {d.statementDate}
                      </div>
                    )
                    // width: 100
                  },
                  {
                    Header: renderCondensedBillDisplayHeader('DESCRIPTION'),
                    id: 'description',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        <b>{d.description}</b>
                      </div>
                    ),
                    width: 200
                  },
                  {
                    Header: renderCondensedBillDisplayHeader('CHARGE'),
                    id: 'amtDue',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        {d.amtDue}
                      </div>
                    )
                    // width: 150
                  },
                  {
                    Header: renderCondensedBillDisplayHeader('PAYMENT'),
                    id: 'payment',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        {d.payment}
                      </div>
                    )
                    // width: 150
                  },
                  {
                    Header: renderCondensedBillDisplayHeader('STATUS'),
                    id: 'status',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        {d.status}
                      </div>
                    )
                    // width: 100
                  }
                ]}
                getTdProps={() => ({
                  style: { border: 'none' }
                })}
                defaultPageSize={6}
                className="-highlight rt-custom-pp-style"
                showPagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
