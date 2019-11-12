import React from 'react';
import '../../styles/AllBills.css';
import { centsToDollars } from '../../lib/subscriberHelper';
import Bill from './Bill';
import { getLoggedInUserId, logOut } from '../../lib/auth';

const ROOT_ROUTE = '/';

export default class AllBills extends React.Component {
  constructor(props) {
    super(props);
    const { bills } = this.props;
    this.state = {
      bills
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
    }
  }

  handleLogout() {
    logOut();
    const { history } = this.props;
    history.push(ROOT_ROUTE);
  }

  render() {
    const { bills } = this.state;
    return (
      <div className="dashboardCont">
        <h3>Billing</h3>
        <p className="subscriber-header">Transactions</p>
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
          {/* <button onClick={() => this.handleLogout()} type="button">
            Logout
          </button> */}
        </div>
      </div>
    );
  }
}
