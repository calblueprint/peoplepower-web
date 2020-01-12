import React from 'react';
import ReactTable from 'react-table-v6';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardAllBillsView.css';
import { centsToDollars, dateToWord } from '../../../lib/subscriberUtils';

function dateToFullMonth(date) {
  return dateToWord[parseInt(date.split('-')[1], 10)];
}

// expected format of date: YYYY-MM-DD
function dateToDateString(date) {
  const dateArr = date.split('-');
  return `${dateToWord[parseInt(dateArr[1], 10)].substring(0, 3)} ${
    dateArr[2]
  }, ${dateArr[0]}`;
}

function generateAllBillsHeader(headerText) {
  return () => (
    <div className="subscriber-all-bills-row subscriber-all-bills-header">
      {headerText}
    </div>
  );
}

export default class SubscriberOwnerDashboardAllBillsView extends React.Component {
  constructor(props) {
    super(props);
    const { transactions } = this.props;
    this.state = {
      bills: transactions
    };
  }

  componentDidMount() {
    const { history, personId } = this.props;
    if (!personId) {
      // They shouldn't be able to access this screen
      history.push('/');
    }
  }

  render() {
    const { bills } = this.state;
    const { callback } = this.props;
    const data = bills.map(bill => {
      return {
        balance: `$${centsToDollars(bill.Balance)}`,
        statementDate: dateToDateString(bill['Statement Date']),
        description: `${dateToFullMonth(bill['Start Date'])} Power Bill`,
        status: bill.Status,
        amtDue: `$${centsToDollars(bill['Amount Due'])}`

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
    });
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
        <ReactTable
          data={data}
          columns={[
            {
              Header: generateAllBillsHeader('DATE'),
              id: 'statementDate',
              accessor: d => (
                <div className="subscriber-all-bills-row">
                  {d.statementDate}
                </div>
              )
            },
            {
              Header: generateAllBillsHeader('DESCRIPTION'),
              id: 'description',
              accessor: d => (
                <div className="subscriber-all-bills-row">
                  <b>{d.description}</b>
                </div>
              ),
              width: 250
            },
            {
              Header: generateAllBillsHeader('CHARGE'),
              id: 'amtDue',
              accessor: d => (
                <div className="subscriber-all-bills-row">{d.amtDue}</div>
              )
            },
            {
              Header: generateAllBillsHeader('PAYMENT'),
              id: 'payment',
              accessor: d => (
                <div className="subscriber-all-bills-row">
                  <b>{d.payment}</b>
                </div>
              )
            },
            {
              Header: generateAllBillsHeader('BALANCE'),
              id: 'balance',
              accessor: d => (
                <div className="subscriber-all-bills-row">{d.balance}</div>
              )
            },
            {
              Header: generateAllBillsHeader('STATUS'),
              id: 'status',
              accessor: d => (
                <div className="subscriber-all-bills-row">{d.status}</div>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight rt-custom-pp-style"
        />
      </div>
    );
  }
}
