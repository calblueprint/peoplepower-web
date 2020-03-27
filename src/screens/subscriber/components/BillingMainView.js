import React from 'react';
import ReactTable from 'react-table-v6';
import RightArrow from '../../../assets/right_arrow.png';
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

const renderCondensedBillDisplayHeader = headerText => {
  return () => <div className="billing-bills-display-header">{headerText}</div>;
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

export default class BillingMainView extends React.Component {
  constructor(props) {
    super(props);
    const { bills, payments } = this.props;
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
    const { seeAllBills, bills, payments } = this.props;
    const { data } = this.state;

    const { pendingBills } = this.props;
    const totalBalance = getTotalBalanceFromBills(pendingBills);
    return (
      <div className="billing-dash-outer-container">
        <h1>Billing</h1>
        <div className="billing-dash-inner-container">
          <div className="billing-left-col billing-dash-col">
            <p className="billing-header">My Balance</p>
            <div className="billing-col-card">
              <div className="class-elems billing-balance-section">
                <div className="billing-balance-header-section">
                  <p className="">Current Balance</p>
                  <h3>${centsToDollars(totalBalance)}</h3>
                </div>
                <hr id="billing-divider" />

                <div className="billing-balance-nums-section">
                  {totalBalance === 0 ? (
                    <div>
                      <div className="billing-balance-nums-line">
                        <p className="line-item">
                          Hooray! No charges currently due.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="billing-balance-nums-line">
                        <p className="line-item">Outstanding Balance</p>
                        <p className="line-item line-item-value">
                          ${centsToDollars(totalBalance)}
                        </p>
                      </div>
                      <div className="billing-balance-nums-line">
                        <p className="line-item">Latest Power Bill</p>
                        <p className="line-item line-item-value">$0.00</p>
                      </div>
                    </div>
                  )}
                  <div className="billing-balance-divider-container">
                    <div className="billing-full-width-container" />
                    <hr id="balance-billing-divider" />
                  </div>

                  <div className="billing-balance-nums-line">
                    <p className="line-item-total">
                      <strong>Total</strong>
                    </p>
                    <p className="line-item-total line-item-value">
                      <strong>${totalBalance}</strong>
                    </p>
                  </div>
                  <div className="billing-payment-button-container">
                    <button type="button" className="billing-payment-button">
                      Make Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="billing-right-col billing-dash-col">
            <div className="billing-right-duo-header">
              <p className="billing-header">Transaction History</p>
              <button
                className="billing-all-billls-button"
                type="button"
                onClick={seeAllBills}
              >
                <img
                  className="button right-arrow-button"
                  src={RightArrow}
                  alt="right arrow"
                />
              </button>
            </div>
            <div className="billing-col-card">
              <ReactTable
                data={data}
                columns={[
                  {
                    Header: renderCondensedBillDisplayHeader('DATE'),
                    id: 'statementDate',
                    accessor: d => (
                      <div className="billing-bills-display-row">
                        {d.statementDate}
                      </div>
                    )
                    // width: 100
                  },
                  {
                    Header: renderCondensedBillDisplayHeader('DESCRIPTION'),
                    id: 'description',
                    accessor: d => (
                      <div className="billing-bills-display-row">
                        <b>{d.description}</b>
                      </div>
                    ),
                    width: 200
                  },
                  {
                    Header: renderCondensedBillDisplayHeader('CHARGE'),
                    id: 'amtDue',
                    accessor: d => (
                      <div className="billing-bills-display-row">
                        {d.amtDue}
                      </div>
                    )
                    // width: 150
                  },
                  {
                    Header: renderCondensedBillDisplayHeader('PAYMENT'),
                    id: 'payment',
                    accessor: d => (
                      <div className="billing-bills-display-row">
                        {d.payment}
                      </div>
                    )
                    // width: 150
                  },
                  {
                    Header: renderCondensedBillDisplayHeader('STATUS'),
                    id: 'status',
                    accessor: d => (
                      <div className="billing-bills-display-row">
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
