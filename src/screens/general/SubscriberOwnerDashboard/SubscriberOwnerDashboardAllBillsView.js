import React from 'react';
import '../../../styles/SubscriberOwnerDashboardAllBillsView.css';
import { centsToDollars } from '../../../lib/subscriberUtils';
import Bill from './Bill';
import FullBillHeader from './FullBillHeader';
import FullBillFooter from './FullBillFooter';

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
        <div className="all-bills-cards-holder">
          <FullBillHeader />
          {bills.map((bill, i) => {
            return (
              <Bill
                balance={centsToDollars(bill.Balance)}
                index={i}
                statementDate={bill['Statement Date']}
                startDate={bill['Start Date']}
                status={bill.Status}
                endDate={bill['End Date']}
                // rate_schedule
                estimatedRebate={centsToDollars(bill['Estimated Rebate'])}
                totalEstimatedRebate={centsToDollars(
                  bill['Total Estimated Rebate']
                )}
                amtDueOnPrev={centsToDollars(bill['Amount Due on Previous'])}
                amtReceivedSincePrev={centsToDollars(
                  bill['Amount Received Since Previous']
                )}
                amtDue={centsToDollars(bill['Amount Due'])}
              />
            );
          })}
          <FullBillFooter />
        </div>
      </div>
    );
  }
}
