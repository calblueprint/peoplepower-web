import React from 'react';
import ReactTable from 'react-table-v6';
import { centsToDollars, formatStatus } from '../../../lib/subscriberUtils';
import { dateToDateString, dateToFullMonth } from '../../../lib/dateUtils';
import constants from '../../../constants';

const { ONLINE_PAYMENT_TYPE } = constants;

const renderAllBillsHeader = headerText => {
  return () => (
    <div className="subscriber-all-bills-row subscriber-all-bills-header">
      {headerText}
    </div>
  );
};

const createFullPaymentTransaction = transaction => {
  return {
    balance: '$0.00',
    statementDate: dateToDateString(transaction.transactionDate),
    description: transaction.type,
    status: formatStatus(transaction.status),
    payment: `$${centsToDollars(transaction.amount)}`

    /*
            Commented out data fields potentially useful for dashbaord (future changes)
            */
    // endDate: bill['End Date'],
    // rate_schedule
    // estimatedRebate: centsToDollars(bill['Estimated Rebate']),
    // totalEstimatedRebate: centsToDollars(
    //   bill['Total Estimated Rebate']
    // ),
    // amtDueOnPrev: centsToDollars(bill['Amount Due on Previous']),
    // amtReceivedSincePrev: centsToDollars(
    //   bill['Amount Received Since Previous']
    // ),
  };
};

const createFullBillTransaction = transaction => {
  return {
    balance: `$${centsToDollars(transaction.balance)}`,
    statementDate: dateToDateString(transaction.transactionDate),
    description: `${dateToFullMonth(transaction.startDate)} Power Bill`,
    status: transaction.status,
    amtDue: `$${centsToDollars(transaction.amountDue)}`

    /*
            Commented out data fields potentially useful for dashbaord (future changes)
        */
    // endDate: bill['End Date'],
    // rate_schedule
    // estimatedRebate: centsToDollars(bill['Estimated Rebate']),
    // totalEstimatedRebate: centsToDollars(
    //   bill['Total Estimated Rebate']
    // ),
    // amtDueOnPrev: centsToDollars(bill['Amount Due on Previous']),
    // amtReceivedSincePrev: centsToDollars(
    //   bill['Amount Received Since Previous']
    // ),
  };
};

export default class SubscriberAllBillsTable extends React.Component {
  constructor(props) {
    super(props);
    const { transactions } = this.props;
    const data = transactions.map(t =>
      t.type === ONLINE_PAYMENT_TYPE
        ? createFullPaymentTransaction(t)
        : createFullBillTransaction(t)
    );
    this.state = {
      data
    };
  }

  render() {
    const { data } = this.state;
    return (
      <ReactTable
        data={data}
        columns={[
          {
            Header: renderAllBillsHeader('DATE'),
            id: 'statementDate',
            accessor: d => (
              <div className="subscriber-all-bills-row">{d.statementDate}</div>
            )
          },
          {
            Header: renderAllBillsHeader('DESCRIPTION'),
            id: 'description',
            accessor: d => (
              <div className="subscriber-all-bills-row">
                <b>{d.description}</b>
              </div>
            ),
            width: 250
          },
          {
            Header: renderAllBillsHeader('CHARGE'),
            id: 'amtDue',
            accessor: d => (
              <div className="subscriber-all-bills-row">{d.amtDue}</div>
            )
          },
          {
            Header: renderAllBillsHeader('PAYMENT'),
            id: 'payment',
            accessor: d => (
              <div className="subscriber-all-bills-row">{d.payment}</div>
            )
          },
          {
            Header: renderAllBillsHeader('BALANCE'),
            id: 'balance',
            accessor: d => (
              <div className="subscriber-all-bills-row">{d.balance}</div>
            )
          },
          {
            Header: renderAllBillsHeader('STATUS'),
            id: 'status',
            accessor: d => (
              <div className="subscriber-all-bills-row">{d.status}</div>
            )
          }
        ]}
        getTdProps={() => ({
          style: { border: 'none' }
        })}
        defaultPageSize={10}
        className="-striped -highlight rt-custom-pp-style"
      />
    );
  }
}
