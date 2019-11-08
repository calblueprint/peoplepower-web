import React from 'react';
import '../../styles/SubscriberOwnerDashboard.css';
import {
  areDiffBills,
  centsToDollars,
  getSubscriberBills
} from '../../lib/subscriberHelper';
import Bill from './Bill';
import { getLoggedInUserId, logOut } from '../../lib/auth';

const ROOT_ROUTE = '/';

export default class SubscriberOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      isReady: false
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.getBills();
  }

  getBills() {
    const loggedInUserId = getLoggedInUserId();
    getSubscriberBills(loggedInUserId, this.updateState);
  }

  updateState(bills) {
    if (bills == null) {
      console.error('bills argument to updateState is null');
      return;
    }

    this.setState(prevState => {
      if (areDiffBills(prevState.bills, bills)) {
        return { bills, isReady: true };
      }
      return { isReady: true };
    });
  }

  handleLogout() {
    logOut();
    const { history } = this.props;
    history.push(ROOT_ROUTE);
  }

  render() {
    const { bills, isReady } = this.state;
    return (
      <div className="dashboardCont">
        <h3>My Finances</h3>
        <h3>{!isReady ? 'Loading...' : 'Bills'}</h3>
        <div className="cards-holder">
          {bills.map(bill => {
            return (
              <Bill
                statementDate={bill['Statement Date']}
                startDate={bill['Start Date']}
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
                isLatest={bill['Is Latest']}
                callback={() => console.log('Pay was pressed!')}
              />
            );
          })}
        </div>
        <div>
          <button onClick={() => this.handleLogout()} type="button">
            Logout
          </button>
        </div>
      </div>
    );
  }
}
