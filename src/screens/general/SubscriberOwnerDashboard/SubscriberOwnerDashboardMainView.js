import React from 'react';
import ReactTable from 'react-table-v6';
import { PayPalButton } from 'react-paypal-button-v2';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardMainView.css';
import {
  centsToDollars,
  dateToWord,
  formatStatus
} from '../../../lib/subscriberUtils';
import { recordBillPaymentSuccess } from '../../../lib/paypal';

import constants from '../../../constants';

const { ONLINE_PAYMENT_TYPE } = constants;

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

function generateBillDisplayHeader(headerText) {
  return () => (
    <div className="subscriber-bills-display-header">{headerText}</div>
  );
}

function dateToFullMonth(date) {
  return dateToWord[parseInt(date.split('-')[1], 10)];
}

// expected format of date: YYYY-MM-DD
function formatDate(date) {
  const dateArr = date.split('-');
  return `${parseInt(dateArr[1], 10)}/${dateArr[2]}/${dateArr[0]}`;
}

export default class SubscriberOwnerDashboardMainView extends React.Component {
  constructor(props) {
    super(props);
    const { transactions } = this.props;
    this.state = {
      latestBill: transactions.filter(bill => bill['Is Latest'])[0]
    };
  }

  componentDidMount() {
    const { history, personId } = this.props;
    if (!personId) {
      // They shouldn't be able to access this screen
      history.push('/');
    }
  }

  onPaypalPaymentSuccess = async (details, data) => {
    try {
      const { latestBill } = this.state;
      await recordBillPaymentSuccess(details, data, latestBill);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { transactions, callback } = this.props;
    let { latestBill } = this.state;
    const data = transactions.map(transaction => {
      if (transaction.Type === ONLINE_PAYMENT_TYPE) {
        return {
          startDate: transaction['Start Date'],
          statementDate: formatDate(transaction['Transaction Date']),
          description: transaction.Type,
          status: formatStatus(transaction.Status),
          payment: `$${centsToDollars(transaction.Amount)}`
        };
      }

      return {
        balance: transaction.Balance,
        startDate: transaction['Start Date'],
        statementDate: formatDate(transaction['Transaction Date']),
        description: `${dateToFullMonth(transaction['Start Date'])} Power Bill`,
        status: transaction.Status,
        amtDue: `$${centsToDollars(transaction['Amount Due'])}`
      };
    });
    if (!latestBill) {
      latestBill = { Balance: 0 };
    }
    const { pendingBills } = this.props;
    const totalBalance = pendingBills
      .map(pendingBill => pendingBill.Balance)
      .reduce((a, b) => a + b, 0);
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
                    <p className="line-item">$0.00</p>
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
                  <PayPalButton
                    amount={centsToDollars(totalBalance)}
                    onSuccess={this.onPaypalPaymentSuccess}
                    options={{
                      clientId
                    }}
                  />
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
                    Header: generateBillDisplayHeader('DATE'),
                    id: 'statementDate',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        {d.statementDate}
                      </div>
                    )
                    // width: 100
                  },
                  {
                    Header: generateBillDisplayHeader('DESCRIPTION'),
                    id: 'description',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        <b>{d.description}</b>
                      </div>
                    ),
                    width: 200
                  },
                  {
                    Header: generateBillDisplayHeader('CHARGE'),
                    id: 'amtDue',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        {d.amtDue}
                      </div>
                    )
                    // width: 150
                  },
                  {
                    Header: generateBillDisplayHeader('PAYMENT'),
                    id: 'payment',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        {d.payment}
                      </div>
                    )
                    // width: 150
                  },
                  {
                    Header: generateBillDisplayHeader('STATUS'),
                    id: 'status',
                    accessor: d => (
                      <div className="subscriber-bills-display-row">
                        {d.status}
                      </div>
                    )
                    // width: 100
                  }
                ]}
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
